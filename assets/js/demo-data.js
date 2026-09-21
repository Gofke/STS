/* =============================================================================
   STS DEMO DATA  —  Sean's Transportation Service Inc.
   -----------------------------------------------------------------------------
   This is the SINGLE place where business content lives. Every page renders from
   these objects, so replacing demo content after client approval means editing
   this file only (or, later, replacing each constant with an API call, e.g.
   `const vehicles = await fetch('/api/vehicles')`).

   STATUS TAGS used in comments below:
     [CONFIRMED]  — taken from the SRS v2.0 / client-supplied material
     [DESIGN]     — appears in the approved design image; not separately confirmed
     [DEMO]       — professional placeholder, replace after client review
     [VERIFY]     — recorded in the SRS but looks like it needs checking
   ============================================================================= */

/* ---------------------------------------------------------------------------
   Site / company
   --------------------------------------------------------------------------- */
const siteConfig = {
  companyName: "Sean's Transportation Service Inc.",      // [CONFIRMED]
  shortName: "STS",
  tagline: "Your Transportation, Our Priority",            // [DESIGN]
  country: "Guyana",                                       // [CONFIRMED]
  currency: { code: "USD", symbol: "$" },                  // [DEMO] final currency to be confirmed
  language: "EN",                                          // [DESIGN] language selector content is demo
  year: 2026
};

/* ---------------------------------------------------------------------------
   Contact information
   --------------------------------------------------------------------------- */
const contactInfo = {
  address: {
    line1: "Lot 34 First Street",                           // [CONFIRMED]
    line2: "Alexander Village",
    city: "Georgetown",
    country: "Guyana",
    mapQuery: "Lot 34 First Street, Alexander Village, Georgetown, Guyana"
  },
  officeHours: "Monday – Friday, 8:00 AM – 4:00 PM",        // [CONFIRMED]
  commandCentre: {
    label: "24/7 Command Centre",                           // [CONFIRMED] exact public wording TBD
    note: "Operations support around the clock for active trips and urgent requests.",
    contactName: "Chris Da Luz",
    phone: "+592 639 5377",
    tel: "+5926395377",
    whatsapp: "5926395377"
  },
  // Primary public contact shown in the top bar / footer.  [DEMO] client will select the final primary.
  primary: {
    phone: "+592 650-7050",
    tel: "+5926507050",
    whatsapp: "5926507050",
    email: "seanstransportationservices@gmail.com"          // [DESIGN] shown in approved design
  },
  // Every contact person/line shown on the Contact page.
  people: [
    {
      id: "office",
      name: "Nazim Baksh",                                  // [CONFIRMED]
      role: "Office",
      phone: "+592 650-7050",
      tel: "+5926507050",
      whatsapp: "5926507050",
      hours: "Mon – Fri, 8:00 AM – 4:00 PM",
      primary: true                                         // [DEMO] demo primary
    },
    {
      id: "sean",
      name: "Sean Yassin",                                  // [CONFIRMED]
      role: "Management",                                   // [DEMO] title to be confirmed by client
      phone: "+592 621 6534",
      tel: "+5926216534",
      whatsapp: "5926216534",
      hours: "Mon – Fri, 8:00 AM – 4:00 PM"
    },
    {
      id: "chris",
      name: "Chris Da Luz",                                 // [CONFIRMED]
      role: "Transportation Coordinator",                   // [CONFIRMED]
      phone: "+592 639 5377",
      tel: "+5926395377",
      whatsapp: "5926395377",
      hours: "24/7 Command Centre"
    }
  ],
  // Numbers shown in the header top bar (desktop). Keep to three for layout.
  topBarPhones: [
    { label: "+592 650-7050", tel: "+5926507050" },         // [CONFIRMED] office
    { label: "+592 621 6534", tel: "+5926216534" },         // [CONFIRMED] Sean
    { label: "+592 639 5377", tel: "+5926395377" }          // [CONFIRMED] Chris
  ],
  // Where quotation requests are sent via the "Send on WhatsApp" demo option.
  quoteWhatsapp: "5926395377"                               // [DEMO] final recipient TBD
};

/* ---------------------------------------------------------------------------
   Social links.  Set `url` to the real profile to make the icon a live link.
   An empty url shows a polite "link being confirmed" message instead of a dead
   link.  Facebook was supplied by the client — paste the URL here. [VERIFY]
   --------------------------------------------------------------------------- */
const socialLinks = [
  { id: "facebook",  label: "Facebook",  url: "" },        // [CONFIRMED channel] URL to be pasted
  { id: "instagram", label: "Instagram", url: "" },        // [DEMO]
  { id: "tiktok",    label: "TikTok",    url: "" },        // [DEMO]
  { id: "youtube",   label: "YouTube",   url: "" }         // [DEMO]
];

/* ---------------------------------------------------------------------------
   Navigation (six confirmed pages)  [CONFIRMED]
   --------------------------------------------------------------------------- */
const navigation = [
  { label: "Home",     href: "index.html",    page: "home" },
  { label: "About Us", href: "about.html",    page: "about" },
  { label: "Services", href: "services.html", page: "services" },
  { label: "Fleet",    href: "fleet.html",    page: "fleet" },
  { label: "Catalog",  href: "catalog.html",  page: "catalog" },
  { label: "Contact",  href: "contact.html",  page: "contact" }
];

/* ---------------------------------------------------------------------------
   Trust indicators shown under the hero  [DESIGN]
   --------------------------------------------------------------------------- */
const trustItems = [
  { icon: "shield", title: "Safe & Reliable",      text: "Your safety first" },
  { icon: "users",  title: "Professional Drivers", text: "Experienced & certified" },
  { icon: "clock",  title: "On Time Service",      text: "We value your time" },
  { icon: "pin",    title: "Nationwide Service",   text: "Across Guyana" }
];

/* ---------------------------------------------------------------------------
   Services — 15 confirmed service names  [CONFIRMED]
   Descriptions are professional demo copy  [DEMO]
   --------------------------------------------------------------------------- */
const serviceGroups = [
  { id: "passenger", label: "Passenger Transportation" },
  { id: "rental",    label: "Rentals & Drivers" },
  { id: "cargo",     label: "Cargo & Logistics" },
  { id: "moving",    label: "Moving Services" }
];

const services = [
  {
    slug: "corporate-transportation", name: "Corporate Transportation", group: "passenger", icon: "briefcase",
    short: "Scheduled and on-demand transport for companies, teams and visiting executives.",
    description: "Reliable daily, weekly or contract-based transportation for businesses operating in Guyana. We handle staff shuttles, client pick-ups and executive movements with professional drivers and clean, well-maintained vehicles.",
    highlights: ["Contract and ad-hoc scheduling", "Professional, uniformed drivers", "Monthly invoicing available"]
  },
  {
    slug: "airport-transfers", name: "Airport Transfers", group: "passenger", icon: "plane",
    short: "Meet-and-greet pick-ups and drop-offs at CJIA and Eugene F. Correia airports.",
    description: "Punctual transfers to and from Cheddi Jagan International Airport and Eugene F. Correia International Airport. Flights are tracked so your driver is waiting when you land, day or night.",
    highlights: ["Flight monitoring", "Meet and greet in arrivals", "Sedans, SUVs and vans available"]
  },
  {
    slug: "executive-vip-transportation", name: "Executive & VIP Transportation", group: "passenger", icon: "star",
    short: "Discreet, premium vehicles and drivers for executives and distinguished guests.",
    description: "Executive sedans and SUVs with experienced chauffeurs for board members, delegations and VIP guests. Discretion, comfort and punctuality are standard.",
    highlights: ["Executive sedans and SUVs", "Experienced chauffeurs", "Flexible itineraries"]
  },
  {
    slug: "staff-transportation", name: "Staff Transportation", group: "passenger", icon: "users",
    short: "Daily shuttle routes that get your workforce to site safely and on time.",
    description: "Fixed-route and shift-based staff transportation for offices, industrial sites and project locations. Vans, minibuses and coasters sized to your headcount.",
    highlights: ["Shift-aligned schedules", "Route planning", "Vans to coasters"]
  },
  {
    slug: "vehicle-rental", name: "Vehicle Rental", group: "rental", icon: "key",
    short: "Daily and weekly rentals across sedans, SUVs, vans, pickups and trucks.",
    description: "Self-drive and chauffeur-driven rental options with transparent daily and weekly rates. Choose from our fleet of sedans, SUVs, vans, pickups and cargo vehicles.",
    highlights: ["Daily and weekly rates", "Self-drive or with driver", "Air-conditioned fleet"]
  },
  {
    slug: "bus-coaster-transportation", name: "Bus & Coaster Transportation", group: "passenger", icon: "bus",
    short: "Group movements for tours, staff, schools and events in coasters and minibuses.",
    description: "Comfortable coaster and minibus transportation for larger groups — from site crews and school outings to conference delegates and tour groups.",
    highlights: ["15 to 29 seats", "Experienced drivers", "Multi-day charters"]
  },
  {
    slug: "crew-transportation", name: "Crew Transportation", group: "passenger", icon: "hardhat",
    short: "Crew change and rotation transport for oil & gas, marine and industrial teams.",
    description: "Dependable crew change transportation between airports, hotels, shore bases and project sites. Coordinated by our 24/7 Command Centre for early departures and late arrivals.",
    highlights: ["24/7 coordination", "Airport and shore-base runs", "Manifest tracking"]
  },
  {
    slug: "cargo-transportation", name: "Cargo Transportation", group: "cargo", icon: "box",
    short: "Trucks and cargo vans for general freight, equipment and supplies.",
    description: "Secure cargo movement using cargo vans, pickups and trucks. Suitable for equipment, building materials, supplies and palletised goods across Guyana.",
    highlights: ["Up to 3,500 kg per truck", "Secured loads", "Same-day options"]
  },
  {
    slug: "office-moving", name: "Office Moving", group: "moving", icon: "building",
    short: "Planned office relocations with minimal disruption to your business.",
    description: "End-to-end office relocation — furniture, files, IT equipment — planned around your working hours so your team is up and running quickly at the new location.",
    highlights: ["After-hours moves", "Furniture and IT handling", "Move coordinator"]
  },
  {
    slug: "residential-home-moving", name: "Residential / Home Moving", group: "moving", icon: "home",
    short: "Careful household moves with trained crews and the right vehicles.",
    description: "Local household relocations handled by careful crews. We supply the vehicle, the hands and the planning so moving day is calm and predictable.",
    highlights: ["Loading and unloading", "Careful handling", "Flexible dates"]
  },
  {
    slug: "commercial-moving", name: "Commercial Moving", group: "moving", icon: "warehouse",
    short: "Relocation of shops, warehouses, stock and commercial equipment.",
    description: "Relocation services for retail, warehouse and commercial premises, including stock, shelving and heavy equipment, with appropriate vehicles and manpower.",
    highlights: ["Stock and equipment", "Heavy items", "Scheduled phases"]
  },
  {
    slug: "delivery-logistics-services", name: "Delivery & Logistics Services", group: "cargo", icon: "truck",
    short: "Scheduled and on-demand deliveries for businesses and projects.",
    description: "Dependable delivery runs for documents, parts, supplies and stock — one-off or recurring — with clear coordination from pickup to drop-off.",
    highlights: ["Recurring routes", "Urgent dispatch", "Proof of delivery"]
  },
  {
    slug: "point-to-point-transportation", name: "Point-to-Point Transportation", group: "passenger", icon: "route",
    short: "Direct transfers anywhere in Guyana — one address to another, on time.",
    description: "Simple, direct transportation from A to B for individuals and small groups. Book by the trip with a fixed quotation up front.",
    highlights: ["Fixed quotations", "Sedans, SUVs and vans", "Georgetown and beyond"]
  },
  {
    slug: "event-group-transportation", name: "Event & Group Transportation", group: "passenger", icon: "calendar",
    short: "Coordinated transport for conferences, weddings, tours and corporate events.",
    description: "Multi-vehicle coordination for events of any size — guest shuttles, delegate transfers and group tours — with a single point of contact throughout.",
    highlights: ["Multi-vehicle coordination", "Guest shuttles", "Single point of contact"]
  },
  {
    slug: "dedicated-driver-services", name: "Dedicated Driver Services", group: "rental", icon: "steering",
    short: "A professional driver assigned to you or your vehicle by the day, week or month.",
    description: "Experienced drivers provided with an STS vehicle or your own company vehicle, available on daily, weekly or longer-term arrangements.",
    highlights: ["Your vehicle or ours", "Daily to long-term", "Vetted, professional drivers"]
  }
];

/* ---------------------------------------------------------------------------
   Fleet — demo vehicles  [DEMO]
   Names, capacities and prices are realistic placeholders based on the
   approved design. Images cropped from the approved design where available.
   `image` paths are relative to the site root.
   --------------------------------------------------------------------------- */
const vehicleCategories = [
  "Sedan", "Executive Sedan", "SUV", "Executive SUV", "Van",
  "Minibus", "Coaster", "Pickup", "Cargo Van", "Truck"
];

const vehicles = [
  /* ---- Cars & SUVs ---- */
  {
    id: "allion", name: "2015 Toyota Allion", category: "Sedan", image: "assets/images/fleet/allion.jpg", imageFit: "cover",
    seats: 5, bags: 2, cargo: null, transmission: "Automatic", ac: true,
    qty: 1, featured: true,                                                         // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Airport transfers", "Point-to-point trips", "Daily rental"],
    specs: ["4-door sedan", "1.5L VVT-i petrol", "CVT automatic", "Reclining, split-folding rear seats"]
  },
  {
    id: "fielder", name: "Toyota Fielder", category: "Sedan", image: "assets/images/fleet/fielder.jpg", imageFit: "cover",
    seats: 5, bags: 2, cargo: null, transmission: "Automatic", ac: true,
    qty: 5, featured: true,                                                         // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Airport transfers", "Point-to-point trips", "Daily rental"],
    specs: ["Station wagon body", "1.5L VVT-i petrol", "CVT automatic", "Split-folding rear seats"]
  },
  {
    id: "honda-crv", name: "Honda CR-V", category: "SUV", image: "assets/images/fleet/honda-crv.jpg", imageFit: "cover",
    seats: 5, bags: 3, cargo: null, transmission: "Automatic", ac: true,
    qty: 1, featured: true,                                                         // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Corporate transport", "Airport transfers", "Family and group trips"],
    specs: ["Mid-size SUV", "CVT automatic", "Rear climate vents"]
  },
  {
    id: "byd", name: "BYD", category: "Sedan", image: "assets/images/fleet/byd.jpg", imageFit: "cover",
    seats: 5, bags: 3, cargo: null, transmission: "Automatic", ac: true,
    qty: 2, featured: true,                                                         // [CONFIRMED vehicle] [CONFIRMED] fleet count; model/trim to be confirmed
    useCases: ["Corporate transport", "Point-to-point trips", "Daily rental"],
    specs: ["Electric / hybrid drivetrain", "Automatic transmission", "Modern interior"]
  },
  {
    id: "camry", name: "Toyota Camry", category: "Executive Sedan", image: "assets/images/fleet/camry.jpg",
    seats: 4, bags: 3, cargo: null, transmission: "Automatic", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["Executive & VIP transport", "Corporate travel", "Airport meet-and-greet"],
    specs: ["Leather interior", "Rear climate vents", "Chauffeur available"]
  },
  {
    id: "ford-territory", name: "Ford Territory", category: "SUV", image: "assets/images/fleet/ford-territory.jpg", imageFit: "cover",
    seats: 5, bags: 3, cargo: null, transmission: "Automatic", ac: true,
    qty: 1, featured: true,                                                        // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Corporate transport", "Airport transfers", "Out-of-town trips"],
    specs: ["1.8L EcoBoost turbo petrol", "7-speed automatic", "448 L luggage space", "Reverse camera"]
  },
  {
    id: "x-trail", name: "2014 Nissan X-Trail", category: "SUV", image: "assets/images/fleet/x-trail.jpg", imageFit: "cover",
    seats: 5, bags: 3, cargo: null, transmission: "Automatic", ac: true,
    qty: 5, featured: true,                                                        // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Airport transfers", "Family and group trips", "Weekly rental"],
    specs: ["Mid-size SUV", "Xtronic CVT automatic", "Split-folding rear seats", "550 L luggage space"]
  },
  {
    id: "prado", name: "Toyota Prado", category: "SUV", image: "assets/images/fleet/prado.jpg",
    seats: 7, bags: 4, cargo: null, transmission: "Automatic", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["Executive transport", "Family and group trips", "Interior travel"],
    specs: ["7-seat 4x4", "Third-row seating", "Roof rails"]
  },
  {
    id: "land-cruiser", name: "Toyota Land Cruiser", category: "Executive SUV", image: "assets/images/fleet/land-cruiser.jpg", imageFit: "cover",
    seats: 7, bags: 4, cargo: null, transmission: "Automatic", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["VIP & delegation transport", "Executive airport transfers", "Long-distance interior trips"],
    specs: ["Full-size 4x4", "Premium interior", "Chauffeur available"]
  },

  /* ---- Pickups ---- */
  {
    id: "ford-raptor", name: "Ford Raptor", category: "Pickup", image: "assets/images/fleet/ford-raptor.jpg", imageFit: "cover",
    seats: 5, bags: 4, cargo: "635 kg tray", transmission: "Automatic", ac: true,
    qty: 1, featured: true,                                                        // [CONFIRMED vehicle] [CONFIRMED] fleet count
    useCases: ["Executive site visits", "Project and interior travel", "Light cargo"],
    specs: ["SuperCrew double cab 4x4", "3.5L EcoBoost V6", "10-speed automatic", "Off-road suspension, 5.5 ft bed"]
  },
  {
    id: "hilux", name: "Toyota Hilux (4x4)", category: "Pickup", image: "assets/images/fleet/hilux.jpg",
    seats: 5, bags: 4, cargo: "1,000 kg", transmission: "Automatic", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["Project and site transport", "Interior travel", "Light cargo"],
    specs: ["Double-cab 4x4", "Tray liner", "Tow bar"]
  },

  /* ---- Buses & vans ---- */
  {
    id: "hiace-bus", name: "Toyota HiAce Bus", category: "Minibus", image: "assets/images/fleet/hiace-bus.jpg", imageFit: "cover",
    seats: 15, bags: 10, cargo: null, transmission: "Manual", ac: true,
    featured: true,                                                                // [CONFIRMED vehicle]
    useCases: ["Crew transportation", "Staff shuttles", "Event and group transfers"],
    specs: ["High-roof passenger bus", "Standing headroom", "Sliding side door", "Rear luggage area"]
  },
  {
    id: "coaster", name: "29-Seater Toyota Coaster Bus", category: "Coaster", image: "assets/images/fleet/coaster.jpg", imageFit: "cover",
    seats: 29, bags: 20, cargo: null, transmission: "Manual", ac: true,
    featured: true,                                                                // [CONFIRMED vehicle]
    useCases: ["Bus & coaster transportation", "Staff and crew shuttles", "Tours and group charters"],
    specs: ["29-seat long-body coaster", "Diesel engine", "Air conditioning throughout", "High roof, walk-through aisle"]
  },
  {
    id: "hiace-standard", name: "Toyota HiAce (Standard)", category: "Van", image: "assets/images/fleet/hiace-standard.jpg",
    seats: 12, bags: 8, cargo: null, transmission: "Manual", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["Staff transport", "Crew change", "Group airport transfers"],
    specs: ["12-seat van", "Sliding side door", "Luggage space at rear"]
  },
  {
    id: "hiace-cargo", name: "Toyota HiAce Cargo", category: "Cargo Van", image: "assets/images/fleet/hiace-cargo.jpg",
    seats: 3, bags: null, cargo: "1,200 kg \u00b7 6 m\u00b3", transmission: "Manual", ac: true,
    featured: false,                                                               // [DEMO] vehicle — confirm STS operates this
    useCases: ["Deliveries", "Small office moves", "Supplies and parts"],
    specs: ["Panel van", "Tie-down points", "Rear and side access"]
  },

  /* ---- Trucks & commercial ---- */
  {
    id: "box-canter", name: "Box Canter", category: "Truck", image: "assets/images/fleet/box-canter.jpg", imageFit: "cover",
    seats: 3, bags: null, cargo: "2,000 kg enclosed box", transmission: "Manual", ac: true,
    featured: true,                                                                // [CONFIRMED vehicle] [DEMO] payload
    useCases: ["Cargo transportation", "Office and home moving", "Scheduled deliveries"],
    specs: ["Enclosed aluminium box body", "Turbo-diesel engine", "Rear roller door", "Weather-protected load space"]
  },
  {
    id: "hiab-canter", name: "Hiab Canter", category: "Truck", image: "assets/images/fleet/hiab-canter.jpg", imageFit: "cover",
    seats: 3, bags: null, cargo: "Crane flatbed", transmission: "Manual", ac: true,
    featured: true,                                                                // [CONFIRMED vehicle]; lifting capacity to be confirmed
    useCases: ["Heavy and awkward loads", "Equipment and machinery moves", "Construction site deliveries"],
    specs: ["Truck-mounted hydraulic knuckle-boom (Hiab) crane", "Hydraulic stabiliser legs", "Drop-side flatbed tray", "Lifting capacity confirmed per job"]
  }
];

/* ---------------------------------------------------------------------------
   Testimonials — the three supplied reviews  [CONFIRMED text]
   Attribution is not yet approved, so no names are shown.  [VERIFY]
   --------------------------------------------------------------------------- */
const testimonials = [
  {
    text: "So far Sean's Transportation Service Inc. has been very efficient and most importantly have professional drivers. Keep up the good job!",
    author: "Client review",
    rating: 5
  },
  {
    text: "Chris always responded promptly and efficient. Rates are reasonable but will be good if you can accept also MasterCard.",
    author: "Client review",
    rating: 5
  },
  {
    text: "Excellent",
    author: "Client review",
    rating: 5
  }
];

/* ---------------------------------------------------------------------------
   Certification  [CONFIRMED per SRS — certificate number flagged VERIFY]
   Place the scanned certificate at the `image` path to show the real document.
   --------------------------------------------------------------------------- */
const certification = {
  title: "Local Content Certificate of Registration",
  issuer: "Government of Guyana",
  holder: "Sean's Transportation Service Inc.",
  number: "123456",                                        // [VERIFY] appears to be a placeholder in the SRS
  issued: "14 July 2026",
  expires: "14 July 2027",
  image: "",   // set to e.g. "assets/images/certificates/local-content-certificate.jpg" once the scan is supplied; empty shows the styled credential card
  summary: "STS is registered under Guyana's Local Content framework, confirming the company as a Guyanese supplier of transportation services."
};

/* ---------------------------------------------------------------------------
   Coverage areas  [DEMO] — illustrative list of locations served
   --------------------------------------------------------------------------- */
const coverageAreas = [
  { name: "Georgetown & East Bank", note: "Head office, city transfers, corporate routes" },
  { name: "Cheddi Jagan Int'l Airport", note: "Timehri — arrivals and departures" },
  { name: "Eugene F. Correia Int'l Airport", note: "Ogle — domestic and regional flights" },
  { name: "East Coast & West Demerara", note: "Staff shuttles and deliveries" },
  { name: "Berbice", note: "Long-distance transfers and cargo" },
  { name: "Linden & the Interior", note: "4x4 vehicles and project support" }
];

/* ---------------------------------------------------------------------------
   Why choose STS  [DEMO copy, grounded in confirmed positioning]
   --------------------------------------------------------------------------- */
const whyChoose = [
  { icon: "shield",  title: "Safety first",          text: "Well-maintained vehicles and drivers who follow safe-driving standards on every trip." },
  { icon: "users",   title: "Professional drivers",  text: "Experienced, courteous and presentable — the people your guests and staff will remember." },
  { icon: "clock",   title: "On-time, every time",   text: "Trips are planned and monitored so pick-ups happen when they should." },
  { icon: "headset", title: "24/7 Command Centre",   text: "A real person available around the clock for active trips and urgent requests." },
  { icon: "badge",   title: "Locally registered",    text: "Registered under Guyana's Local Content framework as a Guyanese supplier." },
  { icon: "layers",  title: "One provider, many needs", text: "Passenger transport, rentals, cargo and moving — coordinated by one team." }
];

/* ---------------------------------------------------------------------------
   FAQ  [DEMO]
   --------------------------------------------------------------------------- */
const faqs = [
  { q: "How do I request a quotation?", a: "Use the Get a Quote button on any page and complete the form with your trip or service details. You can also call or WhatsApp our office directly." },
  { q: "Do you provide airport pick-ups late at night?", a: "Yes. Airport transfers are available at any hour. Our 24/7 Command Centre coordinates late arrivals and early departures." },
  { q: "Can I rent a vehicle without a driver?", a: "Vehicle rental is available with or without a driver, subject to vehicle type and standard rental conditions. Tell us your preference in the quote form." },
  { q: "Do you travel outside Georgetown?", a: "Yes. We operate across Guyana, including Berbice, Linden and interior locations, with 4x4 vehicles available where needed." },
  { q: "How are rates calculated?", a: "Rental vehicles are priced by the day or week. Transportation services are quoted per trip or per contract depending on route, vehicle and duration." },
  { q: "What payment methods do you accept?", a: "Payment options are confirmed with your quotation. Contact our office for current accepted methods." }
];

/* ---------------------------------------------------------------------------
   Catalog categories  [DEMO] — final catalog purpose/content to be confirmed
   --------------------------------------------------------------------------- */
const catalogCategories = [
  { id: "corporate", icon: "briefcase", title: "Corporate Transportation", text: "Staff shuttles, client transfers and executive movements on contract or on demand.",
    includes: ["Scheduled routes", "Executive vehicles", "Monthly invoicing"], services: ["corporate-transportation", "staff-transportation"], categories: ["Sedan", "SUV", "Van"] },
  { id: "executive", icon: "star", title: "Executive & VIP", text: "Premium sedans and SUVs with experienced chauffeurs for executives and guests.",
    includes: ["Executive sedans", "Executive SUVs", "Chauffeur service"], services: ["executive-vip-transportation"], categories: ["Executive Sedan", "Executive SUV"] },
  { id: "airport", icon: "plane", title: "Airport Transportation", text: "Meet-and-greet transfers to and from CJIA and Eugene F. Correia airports.",
    includes: ["Flight monitoring", "Meet and greet", "24/7 availability"], services: ["airport-transfers"], categories: ["Sedan", "SUV", "Van"] },
  { id: "crew", icon: "hardhat", title: "Staff & Crew Transport", text: "Shift-based shuttles and crew change runs coordinated around the clock.",
    includes: ["Crew change", "Shift schedules", "Manifest tracking"], services: ["crew-transportation", "staff-transportation"], categories: ["Van", "Minibus", "Coaster"] },
  { id: "rental", icon: "key", title: "Vehicle Rentals", text: "Daily and weekly rentals from sedans to trucks, with or without a driver.",
    includes: ["Daily / weekly rates", "Self-drive option", "Dedicated drivers"], services: ["vehicle-rental", "dedicated-driver-services"], categories: [] },
  { id: "bus", icon: "bus", title: "Bus & Coaster", text: "Minibuses and coasters for tours, events, schools and large teams.",
    includes: ["15 – 29 seats", "Multi-day charters", "Event shuttles"], services: ["bus-coaster-transportation", "event-group-transportation"], categories: ["Minibus", "Coaster"] },
  { id: "cargo", icon: "box", title: "Cargo & Logistics", text: "Cargo vans, pickups and trucks for freight, supplies and scheduled deliveries.",
    includes: ["Up to 3,500 kg", "Recurring deliveries", "Urgent dispatch"], services: ["cargo-transportation", "delivery-logistics-services"], categories: ["Pickup", "Cargo Van", "Truck"] },
  { id: "moving", icon: "home", title: "Moving Services", text: "Office, residential and commercial relocations with trained crews.",
    includes: ["Office moves", "Home moves", "Commercial moves"], services: ["office-moving", "residential-home-moving", "commercial-moving"], categories: ["Cargo Van", "Truck"] }
];

/* ---------------------------------------------------------------------------
   Quote form options
   --------------------------------------------------------------------------- */
const hearAboutOptions = [
  "Google search", "Facebook", "Instagram", "TikTok", "YouTube",
  "Referral from a friend or colleague", "Existing client", "Saw an STS vehicle", "Other"
];

/* Expose on window for use by app.js */
window.STS_DATA = {
  siteConfig, contactInfo, socialLinks, navigation, trustItems, serviceGroups, services,
  vehicleCategories, vehicles, testimonials, certification, coverageAreas, whyChoose, faqs,
  catalogCategories, hearAboutOptions
};
