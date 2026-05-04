// Realistic UK funeral-director sample data
const TODAY = new Date(2026, 4, 4); // May 4, 2026 (Monday)

window.SAMPLE_FUNERALS = [
  { id: "F-2438", deceased: "Margaret Anne Wilson", age: 87, family: "Wilson", service: "Roselawn Crematorium", time: "10:30", date: "2026-05-04", director: "James Crymble", status: "Today", coffin: "Solid Oak — Westminster", notes: "Family request: 'Abide With Me' as recessional." },
  { id: "F-2439", deceased: "Thomas Edward Hartley", age: 74, family: "Hartley", service: "St. Patrick's, Lisburn", time: "13:00", date: "2026-05-04", director: "David Crymble", status: "Today", coffin: "Veneered Oak — Buckingham", notes: "Reception at Hillsborough Castle Hotel." },
  { id: "F-2440", deceased: "Elsie May Doherty", age: 91, family: "Doherty", service: "Roselawn Crematorium", time: "14:30", date: "2026-05-05", director: "Peter Crymble", status: "Tomorrow", coffin: "Wicker — Natural Willow", notes: "Floral tribute: spray of white lilies." },
  { id: "F-2441", deceased: "Robert John McKee", age: 68, family: "McKee", service: "First Presbyterian Belfast", time: "11:00", date: "2026-05-06", director: "James Crymble", status: "Wed", coffin: "Mahogany — Sandringham", notes: "Piper requested at graveside." },
  { id: "F-2442", deceased: "Brenda Patricia Quinn", age: 79, family: "Quinn", service: "St. Anne's Cathedral", time: "10:00", date: "2026-05-07", director: "David Crymble", status: "Thu", coffin: "Solid Oak — Westminster", notes: "Family flowers only." },
  { id: "F-2443", deceased: "William 'Billy' Connolly", age: 82, family: "Connolly", service: "Carnmoney Cemetery", time: "12:30", date: "2026-05-08", director: "Peter Crymble", status: "Fri", coffin: "Eco — Cardboard", notes: "Eco-burial. Family handling tributes." },
];

window.SAMPLE_NOTES = [
  { id: 1, title: "Wilson family — order of service confirmed", body: "Confirmed 80 OOS booklets with Hartley Print. Ready for collection Monday 8am. Family approved final proof Friday evening.", date: "2026-05-03", staff: "Sarah Crymble", priority: "normal", category: "Funeral", linkedTo: "Wilson — F-2438" },
  { id: 2, title: "Roselawn — slot change for Doherty", body: "Crematorium rang to confirm 14:30 slot is held. Need to update family by Tuesday morning.", date: "2026-05-03", staff: "James Crymble", priority: "high", category: "Crematorium", linkedTo: "Doherty — F-2440" },
  { id: 3, title: "Coffin stock — Westminster running low", body: "Down to 3 in stock. Order placed with Musgrave Coffins, lead time 5 days.", date: "2026-05-02", staff: "Peter Crymble", priority: "high", category: "Stock", linkedTo: "Inventory" },
  { id: 4, title: "Hartley reception — menu confirmed", body: "Hillsborough Castle Hotel confirmed sandwich platters + tea/coffee for 60. Invoice to follow.", date: "2026-05-02", staff: "Sarah Crymble", priority: "normal", category: "Funeral", linkedTo: "Hartley — F-2439" },
  { id: 5, title: "Vehicle 02 — service due", body: "Daimler hearse needs annual service. Booked in with Mallusk Motors for May 12th.", date: "2026-05-01", staff: "David Crymble", priority: "normal", category: "Vehicles", linkedTo: "Vehicle 02" },
  { id: 6, title: "Mrs. Doherty (Elsie) — death certificate received", body: "Original collected from registrar. Filed in deceased records.", date: "2026-05-01", staff: "James Crymble", priority: "low", category: "Documents", linkedTo: "Doherty — F-2440" },
  { id: 7, title: "McKee family — piper booked", body: "Andrew Magill confirmed for graveside, 11:45am Wednesday. £180.", date: "2026-04-30", staff: "Peter Crymble", priority: "normal", category: "Funeral", linkedTo: "McKee — F-2441" },
  { id: 8, title: "Beepmate — rota mismatch", body: "Sarah's Saturday on-call wasn't logged in Beepmate. Resolved with Helen.", date: "2026-04-29", staff: "Sarah Crymble", priority: "low", category: "Staff", linkedTo: "Rota" },
];

window.SAMPLE_STOCK = [
  { id: "C-001", name: "Solid Oak — Westminster", category: "Coffins", qty: 3, reorder: 5, supplier: "Musgrave Coffins", cost: 685, updated: "2026-05-02" },
  { id: "C-002", name: "Veneered Oak — Buckingham", category: "Coffins", qty: 8, reorder: 5, supplier: "Musgrave Coffins", cost: 420, updated: "2026-04-28" },
  { id: "C-003", name: "Mahogany — Sandringham", category: "Coffins", qty: 4, reorder: 3, supplier: "JC Atkinson", cost: 750, updated: "2026-04-30" },
  { id: "C-004", name: "Wicker — Natural Willow", category: "Coffins", qty: 6, reorder: 3, supplier: "Somerset Willow", cost: 540, updated: "2026-04-25" },
  { id: "C-005", name: "Eco — Cardboard", category: "Coffins", qty: 2, reorder: 4, supplier: "Greenfield Coffins", cost: 180, updated: "2026-04-22" },
  { id: "U-001", name: "Brass Urn — Classic", category: "Urns", qty: 12, reorder: 6, supplier: "Cremation Memorials Ltd", cost: 85, updated: "2026-04-20" },
  { id: "U-002", name: "Wooden Casket — Walnut", category: "Urns", qty: 4, reorder: 5, supplier: "Cremation Memorials Ltd", cost: 145, updated: "2026-04-20" },
  { id: "U-003", name: "Biodegradable Urn", category: "Urns", qty: 9, reorder: 4, supplier: "Greenfield Coffins", cost: 65, updated: "2026-04-18" },
  { id: "S-001", name: "Order of Service — A5 booklet stock", category: "Stationery", qty: 240, reorder: 100, supplier: "Hartley Print", cost: 0.45, updated: "2026-05-01" },
  { id: "S-002", name: "Memorial cards — blank", category: "Stationery", qty: 45, reorder: 100, supplier: "Hartley Print", cost: 0.32, updated: "2026-04-29" },
  { id: "S-003", name: "Condolence envelopes — cream", category: "Stationery", qty: 180, reorder: 50, supplier: "Hartley Print", cost: 0.18, updated: "2026-04-29" },
  { id: "N-001", name: "Brass nameplate — engraved blank", category: "Nameplates", qty: 14, reorder: 10, supplier: "Newry Engravers", cost: 28, updated: "2026-04-15" },
  { id: "N-002", name: "Silver-finish nameplate", category: "Nameplates", qty: 7, reorder: 8, supplier: "Newry Engravers", cost: 32, updated: "2026-04-15" },
  { id: "M-001", name: "Memorial book — leather", category: "Memorials", qty: 5, reorder: 3, supplier: "Hartley Print", cost: 78, updated: "2026-04-10" },
  { id: "O-001", name: "Printer toner — black", category: "Office", qty: 2, reorder: 3, supplier: "Office Direct NI", cost: 65, updated: "2026-04-26" },
  { id: "O-002", name: "A4 letterhead", category: "Office", qty: 320, reorder: 200, supplier: "Hartley Print", cost: 0.08, updated: "2026-04-26" },
];

window.SAMPLE_EVENTS = [
  // Week of May 4 2026
  { day: 1, start: 10.5, end: 12, title: "Wilson — Roselawn", type: "funeral", staff: "JC" },
  { day: 1, start: 13, end: 14.5, title: "Hartley — St. Patrick's", type: "funeral", staff: "DC" },
  { day: 1, start: 15.5, end: 16.5, title: "Arrangement: Murphy family", type: "arrangement", staff: "SC" },
  { day: 2, start: 9, end: 10, title: "Coffin delivery — Musgrave", type: "delivery", staff: "PC" },
  { day: 2, start: 11, end: 12, title: "Viewing: Doherty", type: "viewing", staff: "JC" },
  { day: 2, start: 14.5, end: 16, title: "Doherty — Roselawn", type: "funeral", staff: "PC" },
  { day: 3, start: 11, end: 12.5, title: "McKee — First Presbyterian", type: "funeral", staff: "JC" },
  { day: 3, start: 14, end: 15, title: "Arrangement: O'Neill family", type: "arrangement", staff: "DC" },
  { day: 4, start: 10, end: 11.5, title: "Quinn — St. Anne's Cathedral", type: "funeral", staff: "DC" },
  { day: 4, start: 13, end: 14, title: "Staff meeting", type: "internal", staff: "All" },
  { day: 4, start: 16, end: 17, title: "Reminder: Vehicle 02 service", type: "reminder", staff: "DC" },
  { day: 5, start: 12.5, end: 14, title: "Connolly — Carnmoney", type: "funeral", staff: "PC" },
  { day: 5, start: 15, end: 16, title: "Viewing: Walsh", type: "viewing", staff: "SC" },
];

window.SAMPLE_STAFF = [
  { initials: "DC", name: "David Crymble", role: "Director" },
  { initials: "JC", name: "James Crymble", role: "Funeral Director" },
  { initials: "PC", name: "Peter Crymble", role: "Funeral Director" },
  { initials: "SC", name: "Sarah Crymble", role: "Office Manager" },
  { initials: "HM", name: "Helen Magee", role: "Administrator" },
];

window.QUICK_LAUNCH = [
  // Embedded business tools (open inside dashboard)
  { label: "Plans", group: "internal", icon: "rota", url: "https://plans.crymbleandsons.com", embed: true, desc: "Funeral plan tracker" },
  { label: "Tracker", group: "internal", icon: "stock", url: "https://tracker.crymbleandsons.com", embed: true, desc: "Headstone tracker" },

  // Crematorium & Death Registration
  { label: "Antrim Crem Forms", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_a61dce4700e64ad2b6383e11db274631.pdf", desc: "Antrim crematorium forms" },
  { label: "Belfast Crem Forms", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_a5953e38d7e2435fac87bb5b6d9d837a.pdf", desc: "Belfast crematorium forms" },
  { label: "Form A (Blank)", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_56f67f9b05ba4e98a053ff452d0970a7.pdf", desc: "Blank cremation Form A" },
  { label: "Doctor Crem Form", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_45e8e2567fdc48fd99fbd119c82dc1db.pdf", desc: "Doctor cremation form" },
  { label: "Death Reg 73", group: "internal", icon: "edit", url: "https://form.jotform.com/222363380701044", desc: "Death registration" },
  { label: "BCC Crematorium", group: "internal", icon: "edit", url: "https://form.jotform.com/222353612536047", desc: "Belfast City Council crem" },
  { label: "Proof of Residency", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_e29f8ae6bea841de8603ba8394cea678.pdf", desc: "Residency proof PDF" },
  { label: "Residency Forms", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_1e1501daf04c4daf9c4ca283421c9067.pdf", desc: "Residency forms pack" },

  // Funeral Planning
  { label: "Plan Estimator", group: "internal", icon: "edit", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/funeralcostestimator2021", desc: "Cost estimator form" },
  { label: "Plan Info Sheet", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_b0f2c706a46240a3a9926de6752f45ff.pdf", desc: "Plan information PDF" },
  { label: "Plan Info (Online)", group: "internal", icon: "edit", url: "https://form.jotform.com/230323606095046", desc: "Online plan info form" },
  { label: "Plan With Grace", group: "internal", icon: "edit", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/PlanWithGrace", desc: "Plan With Grace intake" },

  // Memorials, Tributes & Flowers
  { label: "Tribute Outline", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/94b87f_91558c29fd6943cfabc0a1e2b0a0a187.pdf", desc: "Tribute outline template" },
  { label: "Memorial Brochure", group: "internal", icon: "memorial", url: "https://www.crymbleandsons.com/_files/ugd/0bd5d0_5b1ac1d6067643258da36d854e1e55a9.pdf", desc: "Memorial catalogue" },
  { label: "Memorial (Posted)", group: "internal", icon: "memorial", url: "https://www.crymbleandsons.com/_files/ugd/0bd5d0_34d44c3f5b0d43afb2943ca44ee97759.docx", desc: "Posted memorial brochure" },
  { label: "Memorial Tracker", group: "internal", icon: "edit", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/MemorialEnquiryAndEstimate", desc: "Memorial enquiry & estimate" },
  { label: "Flower Brochure", group: "internal", icon: "floral", url: "https://www.crymbleandsons.com/_files/ugd/0bd5d0_e7ff028f6e6b4281917053321e7d42cb.pdf", desc: "Floral tributes catalogue" },

  // Invoicing & Payments
  { label: "Sundry Invoice", group: "internal", icon: "card", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/InvoiceForExternalHire", desc: "External hire invoice" },
  { label: "Payment Screen", group: "internal", icon: "card", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/paymentscreen", desc: "Take a payment" },
  { label: "Direct Debit Link", group: "internal", icon: "card", url: "https://pay.gocardless.com/AL0000BKRGP924", desc: "GoCardless DD signup" },
  { label: "Funeral Finance", group: "internal", icon: "card", url: "https://funeral.loans.funeralsafe.co.uk/davidcrymbleandsons/", desc: "FuneralSafe finance" },
  { label: "GC FP Confirmation", group: "internal", icon: "files", url: "https://www.crymbleandsons.com/_files/ugd/0bd5d0_ae2bd879eea644cd99542b135e440468.pdf", desc: "GoCardless FP doc" },

  // Tools & Notices
  { label: "Sundry Paper Notice", group: "internal", icon: "edit", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/papernoticesundryformandsubmissiontobelfasttelegraph", desc: "Belfast Telegraph notice" },
  { label: "Order of Service", group: "internal", icon: "book", url: "https://www.dcfs.co.uk/order-of-service-creator", desc: "OOS creator" },
  { label: "Time Sheets", group: "internal", icon: "rota", url: "https://www.cognitoforms.com/DavidCrymbleAndSons/TimesheetDavidCrymbleAndSons", desc: "Staff timesheets" },
  { label: "Phone App", group: "internal", icon: "wa", url: "https://eu.jotform.com/app/233026510535345", desc: "JotForm mobile portal" },

  // Government & Benefits
  { label: "Child Benefit Form", group: "external", icon: "globe", url: "https://www.nidirect.gov.uk/articles/child-funeral-fund", desc: "NI Direct — child fund" },
  { label: "DHSS Payment", group: "external", icon: "globe", url: "https://www.nidirect.gov.uk/articles/bereavement-support-payment", desc: "NI Direct — bereavement" },

  // External tools & integrations
  { label: "Coffin Stock Sheet", group: "external", icon: "sheets", url: "https://docs.google.com/spreadsheets/d/16Dz47Ejxc6A55VC8XvrEGCZRmHDllNdlalcYJjh5E1E/edit?usp=sharing", desc: "Google Sheets inventory" },
  { label: "Live Feed Camera", group: "external", icon: "globe", url: "https://davidcrymbleandsonslivefeed.webstarts.com/", desc: "Funeral live stream" },
];
