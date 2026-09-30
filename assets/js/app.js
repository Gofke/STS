/* =============================================================================
   STS Demo — app.js
   Shared components (header, footer, drawer, modals, toast), data rendering and
   page initializers. Everything renders from window.STS_DATA (demo-data.js).
   ============================================================================= */
(function () {
  "use strict";

  const D = window.STS_DATA;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => `${D.siteConfig.currency.symbol}${Number(n).toLocaleString("en-US")}`;

  /* ---------------------------------------------------------------------------
     Icon set — one consistent outline style (Feather-like) used everywhere.
     --------------------------------------------------------------------------- */
  const ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM18 18h3v3h-3z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    seat: '<path d="M6 14v4h12v-4"/><path d="M6 14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/><path d="M4 18v3M20 18v3"/>',
    bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="12" x2="21" y2="12"/>',
    car: '<path d="M5 17h14l1-6-2-5H6L4 11z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/><path d="M3 11h18"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
    bus: '<rect x="3" y="3" width="18" height="15" rx="2"/><path d="M3 10h18"/><path d="M7 18v2M17 18v2"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
    hardhat: '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    warehouse: '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect x="6" y="10" width="12" height="12"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    steering: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 15v7M2.5 10.5L9 12M21.5 10.5L15 12"/>',
    headset: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    badge: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    cameraOff: '<line x1="1" y1="1" x2="23" y2="23"/><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    externalLink: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    // Brand marks (filled)
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.52A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    tiktok: '<path fill="currentColor" stroke="none" d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07"/>',
    youtube: '<path fill="currentColor" stroke="none" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>'
  };
  const icon = (name, cls) => `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.info}</svg>`;
  const guyanaFlag = '<svg class="topbar__flag" viewBox="0 0 30 18" aria-hidden="true"><rect width="30" height="18" fill="#009E49"/><polygon points="0,0 30,9 0,18" fill="#fff"/><polygon points="0,1 27,9 0,17" fill="#FCD116"/><polygon points="0,0 15,9 0,18" fill="#000"/><polygon points="0,1.5 13,9 0,16.5" fill="#CE1126"/></svg>';

  /* ---------------------------------------------------------------------------
     Toast
     --------------------------------------------------------------------------- */
  function toast(message, type) {
    let region = $(".toast-region");
    if (!region) { region = document.createElement("div"); region.className = "toast-region"; region.setAttribute("aria-live", "polite"); document.body.appendChild(region); }
    const el = document.createElement("div");
    el.className = `toast ${type ? "toast--" + type : ""}`;
    el.innerHTML = `${icon(type === "success" ? "check" : type === "error" ? "alert" : "info")}<span>${esc(message)}</span>`;
    region.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 320); }, 3800);
  }

  /* ---------------------------------------------------------------------------
     Generic modal manager (ESC, backdrop, focus return, body scroll lock)
     --------------------------------------------------------------------------- */
  const Modal = (() => {
    let lastFocus = null;
    const stack = [];
    function open(id) {
      const m = document.getElementById(id); if (!m) return;
      lastFocus = document.activeElement;
      m.classList.add("is-open"); m.removeAttribute("aria-hidden"); document.body.classList.add("no-scroll");
      stack.push(m);
      const first = m.querySelector("[data-autofocus]") || m.querySelector("button, [href], input, select, textarea");
      if (first) setTimeout(() => first.focus(), 30);
    }
    function close(id) {
      const m = id ? document.getElementById(id) : stack[stack.length - 1]; if (!m) return;
      m.classList.remove("is-open"); m.setAttribute("aria-hidden", "true");
      const i = stack.indexOf(m); if (i > -1) stack.splice(i, 1);
      if (!stack.length) document.body.classList.remove("no-scroll");
      m.dispatchEvent(new CustomEvent("modal:close"));
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && stack.length) close(); });
    document.addEventListener("click", (e) => {
      const closer = e.target.closest("[data-modal-close]"); if (closer) { e.preventDefault(); close(closer.closest(".modal").id); return; }
      if (e.target.classList.contains("modal__backdrop")) close(e.target.closest(".modal").id);
    });
    return { open, close };
  })();

  /** Simple message modal for demo notices (non-broken placeholder behaviour). */
  function showMessage(title, text, opts) {
    opts = opts || {};
    let m = document.getElementById("message-modal");
    if (!m) {
      m = document.createElement("div"); m.id = "message-modal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "message-modal-title"); m.setAttribute("aria-hidden", "true");
      m.innerHTML = `<div class="modal__backdrop"></div><div class="modal__dialog modal__dialog--sm"><button class="modal__close" type="button" data-modal-close aria-label="Close">${icon("x")}</button><div class="mmodal"><div class="mmodal__icon" id="message-modal-icon"></div><h3 id="message-modal-title"></h3><p id="message-modal-text"></p><div class="btn-row" id="message-modal-actions"></div></div></div>`;
      document.body.appendChild(m);
    }
    $("#message-modal-icon").innerHTML = icon(opts.icon || "info");
    $("#message-modal-title").textContent = title;
    $("#message-modal-text").textContent = text;
    const actions = $("#message-modal-actions");
    actions.innerHTML = (opts.actions || []).map((a) => `<a class="btn ${a.cls || "btn--ghost"}" href="${esc(a.href)}">${esc(a.label)}</a>`).join("") + `<button class="btn btn--blue" type="button" data-modal-close data-autofocus>${esc(opts.closeLabel || "Close")}</button>`;
    Modal.open("message-modal");
  }

  /* ---------------------------------------------------------------------------
     Header / drawer / footer
     --------------------------------------------------------------------------- */
  const page = document.body.dataset.page || "";
  const C = D.contactInfo;
  const waLink = (num, text) => `https://wa.me/${num}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  function socialMarkup(wrapTag, cls) {
    return D.socialLinks.map((s) => s.url
      ? `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" class="${cls || ""}">${icon(s.id)}</a>`
      : `<a href="#" data-social="${esc(s.label)}" aria-label="${esc(s.label)}" class="${cls || ""}">${icon(s.id)}</a>`).join("");
  }

  function renderHeader() {
    const mount = $("#site-header"); if (!mount) return;
    const phones = C.topBarPhones.map((p, i) => `${i ? '<span class="topbar__sep">|</span>' : ""}<a href="tel:${esc(p.tel)}">${esc(p.label)}</a>`).join("");
    const navLinks = (cls) => D.navigation.map((n) => `<a href="${n.href}" ${n.page === page ? 'aria-current="page"' : ""} class="${cls || ""}">${esc(n.label)}</a>`).join("");
    mount.innerHTML = `
      <div class="topbar">
        <div class="container topbar__inner">
          <div class="topbar__left">
            <div class="topbar__phones">${icon("phone")}${phones}</div>
            <a class="topbar__email" href="mailto:${esc(C.primary.email)}">${icon("mail")}${esc(C.primary.email)}</a>
          </div>
          <div class="topbar__right">
            <div class="topbar__social">${socialMarkup()}</div>
            <span class="topbar__divider"></span>
            <button class="topbar__select" type="button" data-demo-select="country">${guyanaFlag}<span>${esc(D.siteConfig.country)}</span>${icon("chevron")}</button>
            <span class="topbar__divider"></span>
            <button class="topbar__select topbar__select--lang" type="button" data-demo-select="language">${icon("globe")}<span>${esc(D.siteConfig.language)}</span>${icon("chevron")}</button>
          </div>
        </div>
      </div>
      <header class="header">
        <div class="container header__inner">
          <a class="brand" href="index.html" aria-label="${esc(D.siteConfig.companyName)} — Home"><img src="assets/images/logo/sts-logo.png" alt="STS — Sean's Transportation Service Inc." width="230" height="68"></a>
          <nav class="nav" aria-label="Main">${navLinks()}</nav>
          <div class="header__actions">
            <button class="btn btn-qr" type="button" data-qr-open title="Scan a QR code">${icon("qr")}<span>Scan QR</span></button>
            <a class="btn btn--primary" href="quote.html">Get a Quote ${icon("arrow")}</a>
            <button class="hamburger" type="button" aria-label="Open menu" aria-controls="drawer" aria-expanded="false" data-drawer-open>${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer__backdrop" data-drawer-close></div>
        <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div class="drawer__head"><img src="assets/images/logo/sts-logo.png" alt="STS"><button class="drawer__close" type="button" aria-label="Close menu" data-drawer-close>${icon("x")}</button></div>
          <nav class="drawer__nav" aria-label="Mobile">${navLinks()}</nav>
          <div class="drawer__actions">
            <a class="btn btn--primary btn--block" href="quote.html">Get a Quote ${icon("arrow")}</a>
            <button class="btn btn-qr btn--block" type="button" data-qr-open>${icon("qr")} Scan QR code</button>
          </div>
          <div class="drawer__social">${socialMarkup()}</div>
          <div class="drawer__contact">
            <a href="tel:${esc(C.primary.tel)}">${icon("phone")} ${esc(C.primary.phone)}</a>
            <a href="${waLink(C.primary.whatsapp)}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp us</a>
            <span>${esc(C.officeHours)}</span>
          </div>
        </div>
      </div>`;

    // Drawer behaviour
    const drawer = $("#drawer"); const openBtn = $("[data-drawer-open]");
    const openDrawer = () => { drawer.classList.add("is-open"); drawer.removeAttribute("aria-hidden"); openBtn.setAttribute("aria-expanded", "true"); document.body.classList.add("no-scroll"); setTimeout(() => $(".drawer__close").focus(), 50); };
    const closeDrawer = () => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); openBtn.setAttribute("aria-expanded", "false"); document.body.classList.remove("no-scroll"); openBtn.focus(); };
    openBtn.addEventListener("click", openDrawer);
    $$("[data-drawer-close]").forEach((b) => b.addEventListener("click", closeDrawer));
    $$(".drawer__nav a").forEach((a) => a.addEventListener("click", () => closeDrawer()));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer(); });
    $$("[data-qr-open]", drawer).forEach((b) => b.addEventListener("click", closeDrawer));
  }

  function renderFooter() {
    const mount = $("#site-footer"); if (!mount) return;
    const cert = D.certification;
    mount.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="assets/images/logo/sts-logo.png" alt="STS — Sean's Transportation Service Inc.">
            <p>${esc(D.siteConfig.companyName)} provides corporate, airport, crew and group transportation, vehicle rentals, cargo and moving services across Guyana — with professional drivers and a 24/7 Command Centre.</p>
            <div class="footer__social">${socialMarkup()}</div>
            <div class="footer__cert">${icon("badge")}<span>${esc(cert.issuer)} — ${esc(cert.title)}</span></div>
          </div>
          <div>
            <h3>Company</h3>
            <ul>${D.navigation.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}<li><a href="quote.html">Get a Quote</a></li></ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>${D.services.slice(0, 7).map((s) => `<li><a href="services.html#${s.slug}">${esc(s.name)}</a></li>`).join("")}<li><a href="services.html">All 15 services</a></li></ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul class="footer__contact">
              <li>${icon("pin")}<span>${esc(C.address.line1)}, ${esc(C.address.line2)},<br>${esc(C.address.city)}, ${esc(C.address.country)}</span></li>
              <li>${icon("phone")}<span><a href="tel:${esc(C.primary.tel)}">${esc(C.primary.phone)}</a> (Office)</span></li>
              <li>${icon("headset")}<span><a href="tel:${esc(C.commandCentre.tel)}">${esc(C.commandCentre.phone)}</a> — ${esc(C.commandCentre.label)}</span></li>
              <li>${icon("mail")}<span><a href="mailto:${esc(C.primary.email)}">${esc(C.primary.email)}</a></span></li>
              <li>${icon("clock")}<span>${esc(C.officeHours)}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${D.siteConfig.year} ${esc(D.siteConfig.companyName)} All rights reserved.</span>
          <span>${esc(C.address.city)}, ${esc(C.address.country)}</span>
        </div>
      </div>`;
  }

  function renderWhatsAppFloat() {
    if ($(".wa-float")) return;
    const a = document.createElement("a");
    a.className = "wa-float"; a.href = waLink(C.primary.whatsapp, "Hello STS, I would like to enquire about your transportation services."); a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "Chat with STS on WhatsApp"); a.title = "Chat on WhatsApp";
    a.innerHTML = icon("whatsapp");
    document.body.appendChild(a);
  }

  /* Global click handlers for demo placeholders (social, language/country) */
  document.addEventListener("click", (e) => {
    const social = e.target.closest("[data-social]");
    if (social) { e.preventDefault(); showMessage(`${social.dataset.social} page`, `The ${social.dataset.social} profile link will be connected once the client confirms the account URL. Until then this button is a demo placeholder.`, { icon: "link" }); return; }
    const sel = e.target.closest("[data-demo-select]");
    if (sel) {
      const kind = sel.dataset.demoSelect;
      if (kind === "language") showMessage("Language", "The website is currently presented in English. Additional languages can be enabled here once the client confirms which are required.", { icon: "globe" });
      else showMessage("Service region", "STS operates in Guyana. This selector is reserved for future regions or country-specific contact details.", { icon: "pin" });
    }
  });

  /* ---------------------------------------------------------------------------
     Reusable renderers
     --------------------------------------------------------------------------- */
  function vehicleCard(v) {
    const cover = v.imageFit === "cover";
    return `
      <article class="card vcard" data-vehicle="${esc(v.id)}">
        <div class="vcard__media ${cover ? "vcard__media--cover" : ""}"><img src="${esc(v.image)}" alt="${esc(v.name)} — ${esc(v.category)}" loading="lazy"></div>
        <div class="vcard__body">
          <h3 class="vcard__title">${esc(v.name)}</h3>
          <div class="vcard__meta">
            <span>${icon("seat")}${v.seats} Seats</span>
            ${v.bags != null ? `<span>${icon("bag")}${v.bags} Bags</span>` : `<span>${icon("box")}${esc(v.cargo)}</span>`}
            <span>${icon("car")}${esc(v.category)}</span>
          </div>
          <div class="vcard__foot">
            <div class="vcard__avail">${v.qty != null ? `<span class="avail-badge">${icon("check")}${v.qty} Available</span>` : ""}</div>
            <button class="btn btn--blue" type="button" data-vehicle-open="${esc(v.id)}">View Details ${icon("arrow")}</button>
          </div>
        </div>
      </article>`;
  }

  function serviceCard(s, compact) {
    return `
      <article class="card scard ${compact ? "scard--compact" : ""}" id="${compact ? "" : esc(s.slug)}">
        <div class="scard__icon">${icon(s.icon)}</div>
        <h3 class="scard__title">${esc(s.name)}</h3>
        <p class="scard__text">${esc(compact ? s.short : s.description)}</p>
        ${compact ? "" : `<ul class="scard__list">${s.highlights.map((h) => `<li>${icon("check")}${esc(h)}</li>`).join("")}</ul>`}
        <div class="scard__actions">
          <a class="btn btn--primary btn--sm" href="quote.html?service=${esc(s.slug)}">Get a Quote ${icon("arrow")}</a>
          ${compact ? "" : `<a class="btn btn--ghost btn--sm" href="${waLink(C.commandCentre.whatsapp, `Hello STS, I would like to enquire about ${s.name}.`)}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>`}
        </div>
      </article>`;
  }

  function testimonialCard(t) {
    return `
      <article class="card tcard">
        <div class="tcard__stars" aria-label="${t.rating} out of 5 stars">${Array.from({ length: 5 }, (_, i) => icon(i < t.rating ? "star" : "star", i < t.rating ? "icon--fill" : "")).join("")}</div>
        <p class="tcard__text">${esc(t.text)}</p>
        <div class="tcard__author">${icon("check")}<span>${esc(t.author)}</span></div>
      </article>`;
  }

  function certificateBlock() {
    const c = D.certification;
    return `
      <div class="cert">
        <div class="cert__doc">
          ${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.issuer)} ${esc(c.title)} issued to ${esc(c.holder)}" data-cert-image>` : ""}
          <div class="cert__paper" data-cert-paper ${c.image ? "hidden" : ""}>
            <div class="cert__paper-issuer">${esc(c.issuer)}</div>
            <div class="cert__paper-title">${esc(c.title)}</div>
            <div class="cert__paper-holder">${esc(c.holder)}</div>
            <div class="cert__paper-row"><span>Certificate No.</span><strong>${esc(c.number)}</strong></div>
            <div class="cert__paper-row"><span>Date of issue</span><strong>${esc(c.issued)}</strong></div>
            <div class="cert__paper-row"><span>Valid until</span><strong>${esc(c.expires)}</strong></div>
            <div class="cert__paper-seal">${icon("badge")}</div>
          </div>
        </div>
        <div>
          <span class="cert__badge">${icon("badge")} Registered Local Content supplier</span>
          <h2>${esc(c.title)}</h2>
          <p class="section__lead">${esc(c.summary)}</p>
          <div class="cert__facts">
            <div class="cert__fact"><span>Issued by</span><strong>${esc(c.issuer)}</strong></div>
            <div class="cert__fact"><span>Registered entity</span><strong>${esc(c.holder)}</strong></div>
            <div class="cert__fact"><span>Certificate number</span><strong>${esc(c.number)}</strong></div>
            <div class="cert__fact"><span>Validity</span><strong>${esc(c.issued)} – ${esc(c.expires)}</strong></div>
          </div>
          <div class="btn-row"><a class="btn btn--primary" href="quote.html">Request a corporate quote ${icon("arrow")}</a><a class="btn btn--ghost" href="about.html">About STS</a></div>
        </div>
      </div>`;
  }
  /** If the real certificate scan is not present yet, show the styled credential card instead of a broken image. */
  function wireCertificateFallback(root) {
    const img = $("[data-cert-image]", root); const paper = $("[data-cert-paper]", root); if (!img) return;
    const useFallback = () => { img.remove(); paper.hidden = false; };
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  }

  /* Mission / Vision / Goals — rendered from D.companyStatements. */
  function mvgCards() {
    return D.companyStatements.map((m) => `
      <article class="mvg__item">
        <div class="mvg__icon">${icon(m.icon)}</div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.text)}</p>
      </article>`).join("");
  }
  function faqList(items) {
    return `<div class="faq">${items.map((f, i) => `
      <div class="faq__item">
        <h3><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}"><span>${esc(f.q)}</span>${icon("chevron")}</button></h3>
        <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}" hidden>${esc(f.a)}</div>
      </div>`).join("")}</div>`;
  }
  function wireFaq(root) {
    $$(".faq__q", root).forEach((btn) => btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      document.getElementById(btn.getAttribute("aria-controls")).hidden = open;
    }));
  }

  /* ---------------------------------------------------------------------------
     Vehicle detail modal
     --------------------------------------------------------------------------- */
  function ensureVehicleModal() {
    if ($("#vehicle-modal")) return;
    const m = document.createElement("div");
    m.id = "vehicle-modal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "vehicle-modal-title"); m.setAttribute("aria-hidden", "true");
    m.innerHTML = `<div class="modal__backdrop"></div><div class="modal__dialog"><button class="modal__close" type="button" data-modal-close aria-label="Close vehicle details">${icon("x")}</button><div class="vmodal" id="vehicle-modal-body"></div></div>`;
    document.body.appendChild(m);
  }
  function openVehicle(id) {
    const v = D.vehicles.find((x) => x.id === id); if (!v) return;
    ensureVehicleModal();
    // Detail view always shows the whole vehicle (contain), even for photos that
    // are cropped to fill the smaller card.
    $("#vehicle-modal-body").innerHTML = `
      <div class="vmodal__media"><img src="${esc(v.detailImage || v.image)}" alt="${esc(v.name)}"></div>
      <div class="vmodal__body">
        <span class="vmodal__cat">${esc(v.category)}</span>
        <h3 class="vmodal__title" id="vehicle-modal-title">${esc(v.name)}</h3>
        <div class="spec-grid">
          <div class="spec">${icon("seat")}<div><span>Passengers</span><strong>${v.seats} seats</strong></div></div>
          <div class="spec">${icon(v.bags != null ? "bag" : "box")}<div><span>${v.bags != null ? "Luggage" : "Cargo"}</span><strong>${v.bags != null ? v.bags + " bags" : esc(v.cargo)}</strong></div></div>
          ${v.bags != null && v.cargo ? `<div class="spec">${icon("box")}<div><span>Cargo</span><strong>${esc(v.cargo)}</strong></div></div>` : ""}
          <div class="spec">${icon("gear")}<div><span>Transmission</span><strong>${esc(v.transmission)}</strong></div></div>
          <div class="spec">${icon("check")}<div><span>Air conditioning</span><strong>${v.ac ? "Yes" : "No"}</strong></div></div>
          ${v.qty != null ? `<div class="spec">${icon("check")}<div><span>Availability</span><strong>${v.qty} in fleet</strong></div></div>` : ""}
        </div>
        <div><h4>Suitable for</h4><div class="tags">${v.useCases.map((u) => `<span>${esc(u)}</span>`).join("")}</div></div>
        <div><h4>Features</h4><div class="tags">${v.specs.map((u) => `<span>${esc(u)}</span>`).join("")}</div></div>
        <div class="vmodal__actions">
          <a class="btn btn--primary" href="quote.html?vehicle=${esc(v.id)}" data-autofocus>Get a Quote for this vehicle ${icon("arrow")}</a>
          <a class="btn btn--ghost" href="${waLink(C.commandCentre.whatsapp, `Hello STS, I am interested in the ${v.name} (${v.category}). Is it available?`)}" target="_blank" rel="noopener">${icon("whatsapp")} Ask on WhatsApp</a>
        </div>
      </div>`;
    Modal.open("vehicle-modal");
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-vehicle-open]"); if (b) { openVehicle(b.dataset.vehicleOpen); return; }
    const card = e.target.closest(".vcard"); if (card && !e.target.closest("a, button")) openVehicle(card.dataset.vehicle);
  });

  /* ---------------------------------------------------------------------------
     Form helpers
     --------------------------------------------------------------------------- */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const phoneOk = (v) => /^[+\d][\d\s\-()]{6,}$/.test(v);
  function setError(field, msg) {
    const wrap = field.closest(".field"); const err = wrap && wrap.querySelector(".field__error");
    if (!wrap) return;
    wrap.classList.toggle("is-invalid", !!msg);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.innerHTML = msg ? `${icon("alert")}<span>${esc(msg)}</span>` : "";
  }
  function validateForm(form) {
    let firstBad = null; let count = 0;
    $$("input, select, textarea", form).forEach((f) => {
      let msg = "";
      const v = f.value.trim();
      if (f.required && !v) msg = "This field is required.";
      else if (v && f.type === "email" && !emailOk(v)) msg = "Enter a valid email address.";
      else if (v && f.type === "tel" && !phoneOk(v)) msg = "Enter a valid phone number, e.g. +592 650-7050.";
      else if (v && f.type === "date" && f.min && v < f.min) msg = "Choose today or a future date.";
      setError(f, msg);
      if (msg) { count++; if (!firstBad) firstBad = f; }
    });
    const alert = $(".form-alert", form);
    if (alert) { alert.hidden = !count; if (count) alert.querySelector("span").textContent = `Please correct ${count} highlighted field${count > 1 ? "s" : ""} to continue.`; }
    if (firstBad) firstBad.focus();
    return !count;
  }
  function liveValidation(form) {
    $$("input, select, textarea", form).forEach((f) => {
      f.addEventListener("input", () => { if (f.closest(".field").classList.contains("is-invalid")) setError(f, ""); });
      f.addEventListener("blur", () => { if (f.value.trim() && f.type === "email" && !emailOk(f.value.trim())) setError(f, "Enter a valid email address."); });
    });
  }

  /* ---------------------------------------------------------------------------
     Page initializers
     --------------------------------------------------------------------------- */
  const Pages = {
    home() {
      $("#trust-list").innerHTML = D.trustItems.map((t) => `<div class="trust__item"><div class="trust__icon">${icon(t.icon)}</div><div><div class="trust__title">${esc(t.title)}</div><div class="trust__text">${esc(t.text)}</div></div></div>`).join("");
      $("#fleet-preview").innerHTML = D.vehicles.filter((v) => v.featured).slice(0, 8).map(vehicleCard).join("");
      $("#services-preview").innerHTML = D.services.slice(0, 6).map((s) => serviceCard(s, true)).join("");
      $("#why-list").innerHTML = D.whyChoose.map((w) => `<div class="feature"><div class="feature__icon">${icon(w.icon)}</div><div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div></div>`).join("");
      $("#coverage-list").innerHTML = D.coverageAreas.map((c) => `<div class="coverage__item">${icon("pin")}<div><strong>${esc(c.name)}</strong><span>${esc(c.note)}</span></div></div>`).join("");
      $("#testimonial-list").innerHTML = D.testimonials.map(testimonialCard).join("");
      $("#certification").innerHTML = certificateBlock(); wireCertificateFallback($("#certification"));
      $("#faq-preview").innerHTML = faqList(D.faqs.slice(0, 4)); wireFaq($("#faq-preview"));
    },

    about() {
      $("#why-list").innerHTML = D.whyChoose.map((w) => `<div class="feature"><div class="feature__icon">${icon(w.icon)}</div><div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div></div>`).join("");
      $("#certification").innerHTML = certificateBlock(); wireCertificateFallback($("#certification"));
      $("#info-tiles").innerHTML = `
        <div class="card info-tile"><div class="info-tile__icon">${icon("pin")}</div><div><h3>Registered office</h3><p>${esc(C.address.line1)}, ${esc(C.address.line2)}, ${esc(C.address.city)}, ${esc(C.address.country)}</p></div></div>
        <div class="card info-tile"><div class="info-tile__icon">${icon("clock")}</div><div><h3>Office hours</h3><p>${esc(C.officeHours)}</p></div></div>
        <div class="card info-tile"><div class="info-tile__icon">${icon("headset")}</div><div><h3>${esc(C.commandCentre.label)}</h3><p>${esc(C.commandCentre.note)} <a href="tel:${esc(C.commandCentre.tel)}">${esc(C.commandCentre.phone)}</a></p></div></div>`;
      $("#testimonial-list").innerHTML = D.testimonials.map(testimonialCard).join("");
    },

    services() {
      const groups = D.serviceGroups.map((g) => {
        const items = D.services.filter((s) => s.group === g.id);
        return `<section class="section section--tight" id="group-${g.id}"><div class="container"><div class="section__head"><div><h2>${esc(g.label)}</h2></div><span class="note">${items.length} service${items.length > 1 ? "s" : ""}</span></div><div class="grid grid--3">${items.map((s) => serviceCard(s, false)).join("")}</div></div></section>`;
      }).join("");
      $("#service-groups").innerHTML = groups;
      $("#group-nav").innerHTML = D.serviceGroups.map((g) => `<a class="chip" href="#group-${g.id}">${esc(g.label)}</a>`).join("");
      $("#faq-list").innerHTML = faqList(D.faqs); wireFaq($("#faq-list"));
    },

    fleet() {
      const params = new URLSearchParams(location.search);
      const state = { category: params.get("category") && D.vehicleCategories.includes(params.get("category")) ? params.get("category") : "All", q: "", sort: "featured" };
      const chips = $("#fleet-chips"), grid = $("#fleet-grid"), count = $("#fleet-count"), search = $("#fleet-search"), sort = $("#fleet-sort");
      const counts = D.vehicleCategories.reduce((acc, c) => (acc[c] = D.vehicles.filter((v) => v.category === c).length, acc), {});
      function renderChips() {
        chips.innerHTML = [`<button class="chip" type="button" data-cat="All" aria-pressed="${state.category === "All"}">All <small>${D.vehicles.length}</small></button>`]
          .concat(D.vehicleCategories.filter((c) => counts[c]).map((c) => `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${state.category === c}">${esc(c)} <small>${counts[c]}</small></button>`)).join("");
      }
      function apply() {
        let list = D.vehicles.filter((v) => state.category === "All" || v.category === state.category);
        if (state.q) { const q = state.q.toLowerCase(); list = list.filter((v) => [v.name, v.category, v.useCases.join(" "), v.specs.join(" ")].join(" ").toLowerCase().includes(q)); }
        if (state.sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
        else if (state.sort === "availability") list.sort((a, b) => (b.qty || 0) - (a.qty || 0));
        else if (state.sort === "seats") list.sort((a, b) => b.seats - a.seats);
        count.textContent = `${list.length} vehicle${list.length === 1 ? "" : "s"}${state.category !== "All" ? " in " + state.category : ""}${state.q ? ` matching “${state.q}”` : ""}`;
        grid.innerHTML = list.length ? list.map(vehicleCard).join("") : `<div class="empty" style="grid-column:1/-1">${icon("search")}<h3>No vehicles match</h3><p>Try a different category or search term, or ask us — we can usually source the vehicle you need.</p><div class="btn-row" style="justify-content:center"><button class="btn btn--blue" type="button" id="fleet-reset">Clear filters</button><a class="btn btn--primary" href="quote.html">Request a vehicle</a></div></div>`;
        const reset = $("#fleet-reset"); if (reset) reset.addEventListener("click", () => { state.category = "All"; state.q = ""; search.value = ""; renderChips(); apply(); });
        const url = new URL(location.href); if (state.category === "All") url.searchParams.delete("category"); else url.searchParams.set("category", state.category); history.replaceState(null, "", url);
      }
      chips.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (!b) return; state.category = b.dataset.cat; renderChips(); apply(); });
      search.addEventListener("input", () => { state.q = search.value.trim(); apply(); });
      sort.addEventListener("change", () => { state.sort = sort.value; apply(); });
      renderChips(); apply();
      $("#faq-list").innerHTML = faqList(D.faqs.filter((f) => /rent|rate|payment/i.test(f.q))); wireFaq($("#faq-list"));
    },

    catalog() {
      $("#catalog-grid").innerHTML = D.catalogCategories.map((c) => {
        const svc = c.services.map((slug) => D.services.find((s) => s.slug === slug)).filter(Boolean);
        const fleetLink = c.categories.length ? `fleet.html?category=${encodeURIComponent(c.categories[0])}` : "fleet.html";
        return `<article class="card ccard" id="cat-${esc(c.id)}">
          <div class="ccard__top"><div class="ccard__icon">${icon(c.icon)}</div><h3>${esc(c.title)}</h3></div>
          <p>${esc(c.text)}</p>
          <ul class="scard__list">${c.includes.map((i) => `<li>${icon("check")}${esc(i)}</li>`).join("")}</ul>
          <div class="ccard__tags">${svc.map((s) => `<span>${esc(s.name)}</span>`).join("")}</div>
          <div class="ccard__actions">
            <a class="btn btn--primary btn--sm" href="quote.html?service=${esc(svc[0] ? svc[0].slug : "")}">Get a Quote ${icon("arrow")}</a>
            <a class="btn btn--ghost btn--sm" href="${fleetLink}">${icon("car")} View vehicles</a>
            <a class="btn btn--ghost btn--sm" href="services.html#${esc(svc[0] ? svc[0].slug : "")}">Service details</a>
          </div>
        </article>`;
      }).join("");
      $("#fleet-table").innerHTML = `<table class="data"><thead><tr><th>Vehicle</th><th>Category</th><th>Seats</th><th>Luggage / cargo</th><th>Transmission</th><th>Available</th><th></th></tr></thead><tbody>
        ${D.vehicles.map((v) => `<tr><td><strong>${esc(v.name)}</strong></td><td>${esc(v.category)}</td><td>${v.seats}</td><td>${v.bags != null ? v.bags + " bags" : esc(v.cargo)}</td><td>${esc(v.transmission)}</td><td class="num">${v.qty != null ? v.qty : "—"}</td><td><button class="btn btn--ghost btn--sm" type="button" data-vehicle-open="${esc(v.id)}">Details</button></td></tr>`).join("")}
      </tbody></table>`;
      $$("[data-catalog-download]").forEach((b) => b.addEventListener("click", () => showMessage(
        "Company catalog (PDF)",
        "The downloadable STS catalog is being finalized with the client's approved fleet, services and rates. This button will deliver the PDF as soon as the final file is supplied.",
        { icon: "file", actions: [{ label: "Request the catalog by email", href: "contact.html?subject=catalog", cls: "btn--primary" }] }
      )));
    },

    contact() {
      $("#people-list").innerHTML = C.people.map((p) => `
        <article class="card pcard">
          ${p.primary ? '<span class="pcard__badge">Main line</span>' : ""}
          <div class="pcard__avatar ${p.id === "chris" ? "pcard__avatar--orange" : ""}">${esc(p.name.split(" ").map((n) => n[0]).join("").slice(0, 2))}</div>
          <div>
            <h3>${esc(p.name)}</h3>
            <p class="pcard__role">${esc(p.role)}</p>
            <div class="pcard__links">
              <a class="btn btn--blue" href="tel:${esc(p.tel)}">${icon("phone")} ${esc(p.phone)}</a>
              <a class="btn btn--ghost" href="${waLink(p.whatsapp, `Hello ${p.name.split(" ")[0]}, I would like to enquire about STS transportation services.`)}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
            </div>
            <div class="pcard__hours">${icon("clock")}${esc(p.hours)}</div>
          </div>
        </article>`).join("");
      $("#social-row").innerHTML = D.socialLinks.map((s) => s.url
        ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.id)}${esc(s.label)}</a>`
        : `<button type="button" data-social="${esc(s.label)}">${icon(s.id)}${esc(s.label)}</button>`).join("");
      const mapQ = encodeURIComponent(C.address.mapQuery);
      $("#map").innerHTML = `<div class="map__fallback">${icon("pin")}<strong>${esc(C.address.line1)}, ${esc(C.address.line2)}</strong><span>${esc(C.address.city)}, ${esc(C.address.country)}</span></div><iframe title="Map showing the STS office location" src="https://www.google.com/maps?q=${mapQ}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
      $("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;

      const form = $("#contact-form"); liveValidation(form);
      const params = new URLSearchParams(location.search);
      if (params.get("subject") === "catalog") { form.subject.value = "Catalog request"; form.message.value = "Please send me the STS company catalog when it is available."; }
      form.addEventListener("submit", (e) => {
        e.preventDefault(); if (!validateForm(form)) return;
        const data = Object.fromEntries(new FormData(form).entries());
        $("#contact-form-wrap").innerHTML = `<div class="success"><div class="success__icon">${icon("check")}</div><h3>Message prepared</h3><p>Thank you, ${esc(data.name)}. Your message has been prepared successfully. <strong>Demo submission only</strong> — in the live website this will be delivered to the STS team.</p>
          <div class="btn-row" style="justify-content:center"><a class="btn btn--primary" href="${waLink(C.primary.whatsapp, `Hello STS,\n${data.subject ? data.subject + "\n" : ""}${data.message}\n— ${data.name} (${data.email}${data.phone ? ", " + data.phone : ""})`)}" target="_blank" rel="noopener">${icon("whatsapp")} Send it on WhatsApp instead</a><a class="btn btn--ghost" href="contact.html">Write another message</a></div><p class="mt-2"><span class="demo-tag">${icon("info")} Demo — no email was sent</span></p></div>`;
        $("#contact-form-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },

    quote() {
      const form = $("#quote-form"); const params = new URLSearchParams(location.search);
      const svcSel = form.service, vehSel = form.vehicle;
      svcSel.innerHTML = `<option value="">Select a service…</option>` + D.serviceGroups.map((g) => `<optgroup label="${esc(g.label)}">${D.services.filter((s) => s.group === g.id).map((s) => `<option value="${esc(s.slug)}">${esc(s.name)}</option>`).join("")}</optgroup>`).join("");
      vehSel.innerHTML = `<option value="">Select a vehicle or service type…</option><optgroup label="Vehicles">${D.vehicles.map((v) => `<option value="${esc(v.id)}">${esc(v.name)} — ${esc(v.category)} (${v.seats} seats)</option>`).join("")}</optgroup><optgroup label="Service type"><option value="with-driver">With driver (chauffeur)</option><option value="self-drive">Self-drive rental</option><option value="cargo">Cargo / truck</option><option value="moving-crew">Moving crew &amp; vehicle</option><option value="not-sure">Not sure — please advise</option></optgroup>`;
      form.hear.innerHTML = `<option value="">Select an option…</option>` + D.hearAboutOptions.map((o) => `<option>${esc(o)}</option>`).join("");
      const today = new Date(); const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10); form.date.min = iso;

      // Preselection from service/vehicle CTAs
      const aside = $("#quote-aside-selected");
      if (params.get("service") && D.services.some((s) => s.slug === params.get("service"))) {
        svcSel.value = params.get("service");
        const s = D.services.find((x) => x.slug === params.get("service"));
        aside.innerHTML = `<div class="selected-item"><div class="scard__icon" style="width:44px;height:44px">${icon(s.icon)}</div><div><strong>${esc(s.name)}</strong><span>Service preselected</span></div></div>`;
      }
      if (params.get("vehicle") && D.vehicles.some((v) => v.id === params.get("vehicle"))) {
        vehSel.value = params.get("vehicle");
        const v = D.vehicles.find((x) => x.id === params.get("vehicle"));
        if (!svcSel.value) svcSel.value = v.category === "Truck" || v.category === "Cargo Van" ? "cargo-transportation" : "vehicle-rental";
        aside.innerHTML = `<div class="selected-item"><img src="${esc(v.image)}" alt=""><div><strong>${esc(v.name)}</strong><span>${esc(v.category)}${v.qty != null ? ` · ${v.qty} available` : ""}</span></div></div>`;
      }
      if (aside.innerHTML) aside.hidden = false;

      liveValidation(form);
      form.addEventListener("submit", (e) => {
        e.preventDefault(); if (!validateForm(form)) return;
        const d = Object.fromEntries(new FormData(form).entries());
        const svc = D.services.find((s) => s.slug === d.service); const veh = D.vehicles.find((v) => v.id === d.vehicle);
        const vehLabel = veh ? veh.name : (vehSel.selectedOptions[0] && vehSel.value ? vehSel.selectedOptions[0].textContent : "—");
        const rows = [["Name", d.name], ["Company", d.company || "—"], ["Phone", d.phone], ["Email", d.email], ["Service", svc ? svc.name : d.service], ["Pick-up", d.pickup], ["Drop-off", d.dropoff || "—"], ["Date & time", `${d.date}${d.time ? " at " + d.time : ""}`], ["Passengers / cargo", d.passengers], ["Vehicle / service type", vehLabel], ["Special requirements", d.details || "—"], ["Heard about us via", d.hear || "—"]];
        const waText = `QUOTATION REQUEST — STS website\n` + rows.map(([k, v]) => `${k}: ${v}`).join("\n");
        $("#quote-form-wrap").innerHTML = `<div class="success"><div class="success__icon">${icon("check")}</div><h3>Quotation request prepared</h3><p>Thank you, ${esc(d.name)}. Your quotation request has been prepared successfully. <strong>Demo submission only</strong> — in the live website this request will be sent to the STS team, who will reply with a quotation.</p>
          <dl class="success__summary">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          <div class="btn-row" style="justify-content:center"><a class="btn btn--primary" href="${waLink(C.quoteWhatsapp, waText)}" target="_blank" rel="noopener">${icon("whatsapp")} Send this request on WhatsApp</a><a class="btn btn--ghost" href="quote.html">Prepare another request</a><a class="btn btn--ghost" href="index.html">Back to home</a></div>
          <p class="mt-2"><span class="demo-tag">${icon("info")} Demo — no email was sent</span></p></div>`;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  /* ---------------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader(); renderFooter(); renderWhatsAppFloat(); ensureVehicleModal();
    $$("[data-mvg]").forEach((el) => (el.innerHTML = mvgCards()));
    if (Pages[page]) Pages[page]();
    // Smooth-scroll to hash targets rendered by JS (services.html#slug)
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }
    if (window.STSQR) window.STSQR.init({ icon, toast, Modal });
  });

  window.STS = { icon, toast, Modal, showMessage, openVehicle };
})();
