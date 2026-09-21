/* =============================================================================
   STS Demo — qr-scanner.js
   Generic in-browser QR scanner (extra feature). Uses getUserMedia + jsQR.
   - Camera is requested only when the user presses "Start scanning".
   - Prefers the rear camera on mobile (facingMode: environment).
   - Decodes standard QR codes, shows the raw result, offers "Open link" for
     http/https results (never auto-redirects).
   - Stops every MediaStream track when the scanner closes or the page hides.
   - Handles: insecure context, unsupported browser, permission denied,
     no camera, camera busy, no code detected, image-upload fallback.
   NOTE: No STS-specific workflow is implemented — decode only, by design.
   ============================================================================= */
(function () {
  "use strict";

  let icon, toast, Modal;
  let video, canvas, ctx, stream = null, rafId = null, scanning = false, startedAt = 0, hintShown = false;
  let els = {};

  const STATES = { idle: "idle", loading: "loading", scanning: "scanning", result: "result", error: "error" };

  function build() {
    if (document.getElementById("qr-modal")) return;
    const m = document.createElement("div");
    m.id = "qr-modal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "qr-title"); m.setAttribute("aria-hidden", "true");
    m.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__dialog modal__dialog--sm">
        <button class="modal__close" type="button" data-modal-close aria-label="Close scanner">${icon("x")}</button>
        <div class="qr">
          <div class="qr__head"><h3 id="qr-title">Scan a QR code</h3><p>Point your camera at a QR code. The result is shown here — nothing opens automatically.</p></div>
          <div class="qr__stage" id="qr-stage" data-state="idle">
            <video id="qr-video" playsinline muted aria-label="Camera preview"></video>
            <canvas id="qr-canvas" aria-hidden="true"></canvas>
            <div class="qr__frame" aria-hidden="true"></div>
            <div class="qr__placeholder" id="qr-placeholder">${icon("qr")}<p>Your camera stays off until you press <strong>Start scanning</strong>.</p></div>
          </div>
          <div class="qr__status" id="qr-status" aria-live="polite"></div>
          <div class="qr__result" id="qr-result" hidden>
            <h4>Scanned content</h4>
            <span class="qr__type" id="qr-type"></span>
            <p class="qr__result-text" id="qr-text"></p>
            <div class="btn-row">
              <a class="btn btn--primary btn--sm" id="qr-open" target="_blank" rel="noopener" hidden>${icon("externalLink")} Open link</a>
              <button class="btn btn--ghost btn--sm" type="button" id="qr-copy">${icon("copy")} Copy</button>
            </div>
          </div>
          <div class="qr__actions">
            <button class="btn btn--primary" type="button" id="qr-start" data-autofocus>${icon("camera")} Start scanning</button>
            <button class="btn btn--blue" type="button" id="qr-again" hidden>${icon("refresh")} Scan again</button>
            <button class="btn btn--ghost" type="button" id="qr-stop" hidden>${icon("cameraOff")} Stop camera</button>
            <button class="btn btn--ghost" type="button" id="qr-upload-btn">${icon("upload")} Scan from an image</button>
            <input class="qr__upload" type="file" id="qr-upload" accept="image/*" aria-label="Choose an image containing a QR code">
          </div>
        </div>
      </div>`;
    document.body.appendChild(m);

    video = m.querySelector("#qr-video"); canvas = m.querySelector("#qr-canvas"); ctx = canvas.getContext("2d", { willReadFrequently: true });
    els = { stage: m.querySelector("#qr-stage"), status: m.querySelector("#qr-status"), result: m.querySelector("#qr-result"), type: m.querySelector("#qr-type"), text: m.querySelector("#qr-text"), open: m.querySelector("#qr-open"), copy: m.querySelector("#qr-copy"), start: m.querySelector("#qr-start"), again: m.querySelector("#qr-again"), stop: m.querySelector("#qr-stop"), placeholder: m.querySelector("#qr-placeholder"), upload: m.querySelector("#qr-upload"), uploadBtn: m.querySelector("#qr-upload-btn") };

    els.start.addEventListener("click", start);
    els.again.addEventListener("click", start);
    els.stop.addEventListener("click", () => { stop(); setState(STATES.idle); status("Camera stopped.", "info"); });
    els.uploadBtn.addEventListener("click", () => els.upload.click());
    els.upload.addEventListener("change", onUpload);
    els.copy.addEventListener("click", () => {
      const t = els.text.textContent;
      const done = () => toast("Copied to clipboard", "success");
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done));
      else fallbackCopy(t, done);
    });
    m.addEventListener("modal:close", () => { stop(); reset(); });
    document.addEventListener("visibilitychange", () => { if (document.hidden && stream) { stop(); setState(STATES.idle); status("Camera paused while the page was hidden. Press Start scanning to continue.", "info"); } });
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Copy is not available in this browser", "error"); }
    ta.remove();
  }

  function setState(s) {
    els.stage.dataset.state = s;
    els.placeholder.hidden = s === STATES.scanning;
    els.start.hidden = s !== STATES.idle && s !== STATES.error;
    els.again.hidden = s !== STATES.result;
    els.stop.hidden = s !== STATES.scanning;
    if (s === STATES.loading) els.placeholder.innerHTML = `<div class="qr__spinner" role="status" aria-label="Starting camera"></div><p>Starting camera…</p>`;
    else if (s === STATES.idle) els.placeholder.innerHTML = `${icon("qr")}<p>Your camera stays off until you press <strong>Start scanning</strong>.</p>`;
    else if (s === STATES.result) els.placeholder.innerHTML = `${icon("check")}<p>QR code detected. Review the result below.</p>`;
    if (s !== STATES.result) els.result.hidden = true;
  }
  function status(msg, kind) {
    els.status.className = `qr__status ${kind === "error" ? "is-error" : kind === "ok" ? "is-ok" : ""}`;
    els.status.innerHTML = msg ? `${icon(kind === "error" ? "alert" : kind === "ok" ? "check" : "info")}<span>${msg}</span>` : "";
  }
  function reset() { setState(STATES.idle); status("", ""); els.result.hidden = true; els.upload.value = ""; }

  /* ---- Camera ---------------------------------------------------------------- */
  async function start() {
    els.result.hidden = true; hintShown = false;
    if (!window.isSecureContext) { setState(STATES.error); status("Camera access needs a secure page. Open this demo over HTTPS or from http://localhost.", "error"); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { setState(STATES.error); status("This browser does not support camera access. Try a current version of Chrome, Edge, Safari or Firefox, or use “Scan from an image”.", "error"); return; }
    if (typeof window.jsQR !== "function") { setState(STATES.error); status("The QR decoder failed to load (assets/js/vendor/jsQR.min.js). Check the file path.", "error"); return; }
    setState(STATES.loading); status("Requesting camera permission…", "info");
    const constraintsList = [
      { video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false },
      { video: { facingMode: "environment" }, audio: false },
      { video: true, audio: false }
    ];
    let lastErr = null;
    for (const c of constraintsList) {
      try { stream = await navigator.mediaDevices.getUserMedia(c); lastErr = null; break; }
      catch (err) { lastErr = err; if (err && (err.name === "NotAllowedError" || err.name === "SecurityError")) break; }
    }
    if (!stream) { setState(STATES.error); status(explain(lastErr), "error"); return; }
    video.srcObject = stream;
    try { await video.play(); } catch (e) { /* autoplay policies — muted video should play */ }
    scanning = true; startedAt = Date.now();
    setState(STATES.scanning); status("Scanning… hold the QR code inside the frame.", "info");
    rafId = requestAnimationFrame(tick);
  }

  function explain(err) {
    const n = err && err.name;
    if (n === "NotAllowedError" || n === "SecurityError") return "Camera permission was denied. Allow camera access for this site in your browser settings, then press Start scanning again. You can also use “Scan from an image”.";
    if (n === "NotFoundError" || n === "DevicesNotFoundError" || n === "OverconstrainedError") return "No camera was found on this device. Use “Scan from an image” to decode a saved QR code instead.";
    if (n === "NotReadableError" || n === "TrackStartError") return "The camera is in use by another application. Close it and try again.";
    return "The camera could not be started. Please try again or use “Scan from an image”.";
  }

  function tick() {
    if (!scanning) return;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const w = video.videoWidth, h = video.videoHeight;
      if (w && h) {
        const scale = Math.min(1, 640 / w); canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
        if (code && code.data) { onResult(code.data); return; }
      }
      if (!hintShown && Date.now() - startedAt > 12000) { hintShown = true; status("No QR code detected yet — move closer, improve the lighting and keep the code flat inside the frame.", "info"); }
    }
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    scanning = false;
    if (rafId) cancelAnimationFrame(rafId); rafId = null;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) { video.pause(); video.srcObject = null; }
  }

  /* ---- Result ---------------------------------------------------------------- */
  function onResult(data) {
    stop();
    setState(STATES.result);
    status("QR code decoded successfully.", "ok");
    const trimmed = data.trim();
    const isUrl = /^https?:\/\/\S+$/i.test(trimmed);
    els.text.textContent = trimmed;
    els.type.textContent = isUrl ? "Web link" : /^mailto:/i.test(trimmed) ? "Email address" : /^tel:/i.test(trimmed) ? "Phone number" : /^WIFI:/i.test(trimmed) ? "Wi-Fi details" : "Text";
    els.open.hidden = !isUrl; if (isUrl) els.open.href = trimmed; else els.open.removeAttribute("href");
    els.result.hidden = false;
    if (navigator.vibrate) { try { navigator.vibrate(60); } catch (e) { /* ignore */ } }
    setTimeout(() => (isUrl ? els.open : els.again).focus(), 50);
  }

  /* ---- Image upload fallback ------------------------------------------------- */
  function onUpload() {
    const file = els.upload.files && els.upload.files[0]; if (!file) return;
    stop();
    setState(STATES.loading); status("Reading image…", "info");
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1000; const scale = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = window.jsQR ? window.jsQR(d.data, d.width, d.height, { inversionAttempts: "attemptBoth" }) : null;
      URL.revokeObjectURL(url); els.upload.value = "";
      if (code && code.data) onResult(code.data);
      else { setState(STATES.error); status("No QR code could be read from that image. Try a clearer or larger image.", "error"); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); els.upload.value = ""; setState(STATES.error); status("That file could not be opened as an image.", "error"); };
    img.src = url;
  }

  /* ---- Public --------------------------------------------------------------- */
  window.STSQR = {
    init(deps) {
      icon = deps.icon; toast = deps.toast; Modal = deps.Modal;
      build();
      document.addEventListener("click", (e) => { const b = e.target.closest("[data-qr-open]"); if (b) { reset(); Modal.open("qr-modal"); } });
      window.addEventListener("pagehide", stop);
    }
  };
})();
