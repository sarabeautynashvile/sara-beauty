(() => {
  "use strict";

  const PHONE = "+16155781851";
  const EMAIL = "Sarabeauty615@gmail.com";
  const LASHLY = "https://www.lashly.app/booking/sara-beauty";

  const CATS = [
    { id: "all", label: "All Services" },
    { id: "brows", label: "Brows" },
    { id: "threading", label: "Face Threading" },
    { id: "lashes", label: "Lashes" },
    { id: "pmu", label: "Permanent Makeup" },
    { id: "skin", label: "Facials & Skin" },
    { id: "wax", label: "Waxing" },
    { id: "nails", label: "Nails" },
    { id: "hair", label: "Hair & More" }
  ];

  // Prices and durations transcribed from the studio's in-store service list.
  // p: null => price varies (shown as "Ask").
  const SERVICES = [
    // Brows
    ["brows", "Eyebrows Threading", 10, 15.52, null, "Popular"],
    ["brows", "Eyebrows Waxing", 10, 18.63],
    ["brows", "Eyebrows Tinting", 15, 20.70],
    ["brows", "Eyebrows Lamination", 20, 77.63, null, "Trending"],
    ["brows", "Guy Eyebrows", 10, 20.70],
    ["brows", "Eyebrows & Lashes", 25, 51.75, "Brow + lash combo"],

    // Face threading
    ["threading", "Full Face Threading", 15, 46.57],
    ["threading", "Forehead Threading", 10, 10.35],
    ["threading", "Chin Threading", 10, 10.35],
    ["threading", "Side Threading", 10, 18.63],
    ["threading", "Neck Threading", 10, 12.42],
    ["threading", "Upper Lip Threading", 10, 7.24],
    ["threading", "Lower Lip Threading", 10, 6.21],

    // Lashes
    ["lashes", "Lash Lift", 30, 82.79, null, "Popular"],
    ["lashes", "Lash Tint", 10, 31.05],
    ["lashes", "Lashes", 15, 41.40],
    ["lashes", "Classic Lash Extensions", null, null, "Book online via Lashly", null, "lashly"],
    ["lashes", "Hybrid Lash Extensions", null, null, "Book online via Lashly", null, "lashly"],
    ["lashes", "Volume Lash Extensions", null, null, "Book online via Lashly", null, "lashly"],
    ["lashes", "Mega Volume Lash Extensions", null, null, "Book online via Lashly", null, "lashly"],

    // Permanent makeup
    ["pmu", "Microblading", 45, 362.25, null, "Signature"],
    ["pmu", "Microblading Touch Up", 30, 129.38],
    ["pmu", "Lip Blushing", 50, 258.75],
    ["pmu", "Eyeliner Tattoo", 50, 201.82],

    // Facials & skin
    ["skin", "Aqua Facial", 45, 129.38, null, "Signature"],
    ["skin", "H2O Facial", 45, 124.20],
    ["skin", "Acne Facial", 45, 98.32],
    ["skin", "Back Facial", 60, 119.02],
    ["skin", "Derma Planing", 45, 113.85],
    ["skin", "Customized Facial", 30, null, "Tailored to your skin"],
    ["skin", "Scalp Therapy Treatment", 60, 160.42],
    ["skin", "Scalp Therapy & Facial Treatment", 90, 201.82],

    // Waxing
    ["wax", "Full Body Wax", 60, 217.35],
    ["wax", "Brazilian Wax", 20, 61.06, null, "Popular"],
    ["wax", "Bikini Line", 15, 36.22],
    ["wax", "Full Legs", 30, 87.97],
    ["wax", "Half Legs", 15, 46.57],
    ["wax", "Full Arms", 15, 41.40],
    ["wax", "Half Arms", 10, 25.87],
    ["wax", "Under Arms", 10, 20.70],
    ["wax", "Back Wax", 20, 50.71],
    ["wax", "Chest Wax", 20, 46.57],
    ["wax", "Full Face Wax", 15, null],
    ["wax", "Forehead Wax", 10, 15.52],
    ["wax", "Cheeks Wax", 10, 10.35],
    ["wax", "Chin Wax", 10, 10.35],
    ["wax", "Side Burn Wax", 10, 20.70],
    ["wax", "Upper Lip Wax", 10, 8.28],
    ["wax", "Lower Lip Wax", 10, null],
    ["wax", "Neck Wax", 10, 15.52],
    ["wax", "Nose Wax", 10, null],
    ["wax", "Ear Wax", 10, 15.52],
    ["wax", "Fingers Waxing", 10, 15.52],

    // Nails
    ["nails", "Basic Manicure", 30, 25.00],
    ["nails", "Gel Polish Hands", 30, 30.00, "Without another service"],
    ["nails", "Gel Polish Hands (add-on)", 15, 20.00, "With another service"],
    ["nails", "Dip Polish w/ Tip", 30, 60.00],
    ["nails", "Acrylic Full Set", 30, 65.00],
    ["nails", "Acrylic Fill", 45, 55.00],
    ["nails", "Full Set Medium Nails", 45, 70.00],
    ["nails", "Full Set Long Nails", 45, 75.00],
    ["nails", "Full Set Extra Long", 45, 80.00],
    ["nails", "Acrylic Removal", 45, 15.00, "With a service"],
    ["nails", "Nail Fix", 10, 5.00, "Single nail repair"],
    ["nails", "Pedicure", null, null, "Ask Sara for pricing"],

    // Hair & more
    ["hair", "Hair Cut", 20, 39.00],
    ["hair", "Hair Services", 30, 45.00],
    ["hair", "Makeup Application", null, null, "Events, photos & special occasions"],
    ["hair", "Relaxing Massage", null, null, "Ask Sara for pricing"]
  ].map(([cat, name, min, price, note, tag, via], i) => ({
    id: slug(name) + "-" + i, cat, name, min, price, note, tag, via
  }));

  const byId = new Map(SERVICES.map(s => [s.id, s]));

  /* ---------- helpers ---------- */
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const money = n => "$" + n.toFixed(2);
  const fmtMin = m => {
    if (!m) return "";
    const h = Math.floor(m / 60), r = m % 60;
    return h ? `${h}h${r ? " " + r + "m" : ""}` : `${m} min`;
  };
  const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text, q) => {
    const safe = escapeHtml(text);
    if (!q) return safe;
    return safe.replace(new RegExp("(" + escapeRe(escapeHtml(q)) + ")", "ig"), "<mark>$1</mark>");
  };
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  /* ---------- "from" prices on signature cards ---------- */
  $$("[data-from]").forEach(el => {
    const cats = el.dataset.from.split(",");
    const prices = SERVICES.filter(s => cats.includes(s.cat) && s.price).map(s => s.price);
    if (prices.length) el.innerHTML = `From <b>${money(Math.min(...prices))}</b>`;
  });

  /* ---------- Menu ---------- */
  const catsEl = $("#cats");
  const itemsEl = $("#menuItems");
  const searchEl = $("#menuSearch");
  let activeCat = "brows";

  catsEl.innerHTML = CATS.map(c => {
    const count = c.id === "all" ? SERVICES.length : SERVICES.filter(s => s.cat === c.id).length;
    return `<button class="cat${c.id === activeCat ? " is-active" : ""}" data-cat="${c.id}" aria-pressed="${c.id === activeCat}">
      <span>${c.label}</span><small>${count}</small></button>`;
  }).join("");

  const clockSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
  const plusSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;

  function itemHtml(s, q, idx) {
    const inBag = bag.includes(s.id);
    const priceLabel = s.price ? money(s.price) : s.via === "lashly" ? "Online" : "Ask";
    const priceHtml = s.via === "lashly"
      ? `<a class="item__price is-ask" href="${LASHLY}" target="_blank" rel="noopener">${priceLabel} ↗</a>`
      : `<span class="item__price${s.price ? "" : " is-ask"}">${priceLabel}</span>`;
    return `<li class="item" style="animation-delay:${Math.min(idx * 25, 400)}ms">
      <div class="item__main">
        <span class="item__name">${highlight(s.name, q)}${s.tag ? `<span class="item__tag">${s.tag}</span>` : ""}${s.note ? `<small>${escapeHtml(s.note)}</small>` : ""}</span>
        <span class="item__lead" aria-hidden="true"></span>
      </div>
      ${s.min ? `<span class="item__dur">${clockSvg}${fmtMin(s.min)}</span>` : `<span class="item__dur"></span>`}
      <div class="item__right">
        ${priceHtml}
        <button class="add${inBag ? " is-added" : ""}" data-add="${s.id}" aria-pressed="${inBag}" aria-label="${inBag ? "Remove" : "Add"} ${escapeHtml(s.name)} ${inBag ? "from" : "to"} my visit">${plusSvg}</button>
      </div>
    </li>`;
  }

  function renderMenu() {
    const q = searchEl.value.trim();
    const ql = q.toLowerCase();
    let list = SERVICES;
    if (ql) {
      list = SERVICES.filter(s => (s.name + " " + (s.note || "") + " " + CATS.find(c => c.id === s.cat).label).toLowerCase().includes(ql));
    } else if (activeCat !== "all") {
      list = SERVICES.filter(s => s.cat === activeCat);
    }

    const grouped = ql || activeCat === "all";
    let html = "", idx = 0;
    if (grouped) {
      CATS.slice(1).forEach(c => {
        const rows = list.filter(s => s.cat === c.id);
        if (!rows.length) return;
        html += `<li class="items__group">${c.label}</li>`;
        rows.forEach(s => { html += itemHtml(s, q, idx++); });
      });
    } else {
      list.forEach(s => { html += itemHtml(s, q, idx++); });
    }
    itemsEl.innerHTML = html;

    $("#menuEmpty").hidden = list.length > 0;
    $("#menuTitle").textContent = ql ? `Results for “${q}”` : CATS.find(c => c.id === activeCat).label;
    $("#menuCount").textContent = `${list.length} service${list.length === 1 ? "" : "s"}`;
  }

  function setCat(id) {
    activeCat = id;
    searchEl.value = "";
    $$(".cat", catsEl).forEach(b => {
      const on = b.dataset.cat === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
      if (on && window.innerWidth <= 900) b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    });
    renderMenu();
  }

  catsEl.addEventListener("click", e => {
    const b = e.target.closest(".cat");
    if (b) setCat(b.dataset.cat);
  });

  let searchTimer;
  searchEl.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (searchEl.value.trim()) $$(".cat", catsEl).forEach(b => { b.classList.toggle("is-active", b.dataset.cat === "all"); });
      else setCat(activeCat);
      renderMenu();
    }, 120);
  });

  $$("[data-goto]").forEach(b => b.addEventListener("click", () => {
    setCat(b.dataset.goto);
    $("#menu").scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  }));

  /* ---------- Visit bag ---------- */
  const BAG_KEY = "sarabeauty.visit";
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem(BAG_KEY) || "[]").filter(id => byId.has(id)); } catch { bag = []; }

  const bagBtn = $("#bagBtn");
  const drawer = $("#drawer");
  const scrim = $("#scrim");

  function saveBag() {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch { /* storage unavailable */ }
  }

  function renderBag() {
    const items = bag.map(id => byId.get(id));
    $("#bagCount").textContent = items.length;
    bagBtn.classList.toggle("has-items", items.length > 0);
    $("#bagEmpty").hidden = items.length > 0;
    $("#bagList").innerHTML = items.map(s => `
      <li>
        <div><b>${escapeHtml(s.name)}</b><small>${s.min ? fmtMin(s.min) : "Time varies"}</small></div>
        <span class="p">${s.price ? money(s.price) : "Ask"}</span>
        <button data-remove="${s.id}" aria-label="Remove ${escapeHtml(s.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </li>`).join("");

    const total = items.reduce((a, s) => a + (s.price || 0), 0);
    const mins = items.reduce((a, s) => a + (s.min || 0), 0);
    const hasAsk = items.some(s => !s.price);
    $("#bagTotal").textContent = money(total) + (hasAsk ? "+" : "");
    $("#bagTime").textContent = mins ? fmtMin(mins) + (items.some(s => !s.min) ? "+" : "") : "—";
    $("#bagRequest").disabled = !items.length;
    $("#bagRequest").style.opacity = items.length ? 1 : .5;
  }

  function toggleBag(id) {
    const s = byId.get(id);
    if (bag.includes(id)) {
      bag = bag.filter(x => x !== id);
      toast(`Removed ${s.name}`);
    } else {
      bag.push(id);
      toast(`Added ${s.name} to your visit`);
      bagBtn.classList.remove("bump"); void bagBtn.offsetWidth; bagBtn.classList.add("bump");
    }
    saveBag();
    renderBag();
    $$(`[data-add="${id}"]`).forEach(b => {
      const on = bag.includes(id);
      b.classList.toggle("is-added", on);
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", `${on ? "Remove" : "Add"} ${s.name} ${on ? "from" : "to"} my visit`);
    });
  }

  itemsEl.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if (b) toggleBag(b.dataset.add);
  });
  $("#bagList").addEventListener("click", e => {
    const b = e.target.closest("[data-remove]");
    if (b) toggleBag(b.dataset.remove);
  });

  function openDrawer() {
    setMenu(false);
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add("is-on"));
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    $("#drawerClose").focus();
  }
  function closeDrawer() {
    scrim.classList.remove("is-on");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    bagBtn.focus({ preventScroll: true });
    setTimeout(() => { scrim.hidden = true; }, 400);
  }
  bagBtn.addEventListener("click", openDrawer);
  $("#drawerClose").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  $("#bagClear").addEventListener("click", () => {
    bag = []; saveBag(); renderBag(); renderMenu();
  });
  $("#bagRequest").addEventListener("click", () => {
    $("#reqServices").value = bag.map(id => byId.get(id).name).join(", ");
    closeDrawer();
    $("#book").scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    setTimeout(() => $("#reqForm [name=name]").focus({ preventScroll: true }), 700);
  });

  /* ---------- Request form ---------- */
  const form = $("#reqForm");
  const dateEl = $("#reqDate");
  const errEl = $("#reqErr");
  const today = new Date();
  dateEl.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || "sms";
    const data = Object.fromEntries(new FormData(form));
    const errors = [];
    $$(".field", form).forEach(f => f.classList.remove("has-error"));

    if (!data.name.trim()) {
      errors.push("Please add your name.");
      form.elements.name.closest(".field").classList.add("has-error");
    }
    let dayLabel = "";
    if (data.date) {
      const d = new Date(data.date + "T12:00:00");
      if (d.getDay() === 0) {
        errors.push("The studio is closed on Sundays. Please choose Monday–Saturday.");
        dateEl.closest(".field").classList.add("has-error");
      }
      dayLabel = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    }
    if (errors.length) {
      errEl.textContent = errors.join(" ");
      errEl.hidden = false;
      return;
    }
    errEl.hidden = true;

    const lines = [
      "Hi Sara! I'd like to request an appointment.",
      `Name: ${data.name.trim()}`,
      data.phone && `Phone: ${data.phone.trim()}`,
      `Preferred: ${dayLabel || "Any day"}${data.time ? ", " + data.time : ""}`,
      data.services.trim() && `Services: ${data.services.trim()}`,
      data.notes.trim() && `Notes: ${data.notes.trim()}`
    ].filter(Boolean);
    const body = lines.join("\n");

    window.location.href = via === "email"
      ? `mailto:${EMAIL}?subject=${encodeURIComponent("Appointment request – " + data.name.trim())}&body=${encodeURIComponent(body)}`
      : `sms:${PHONE}?body=${encodeURIComponent(body)}`;
    toast(via === "email" ? "Opening your email app…" : "Opening your messages app…");
  });

  /* ---------- Open / closed status (studio time) ---------- */
  function studioNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, h: +get("hour") % 24, m: +get("minute") };
  }
  function updateStatus() {
    const { day, h } = studioNow();
    const open = day >= 1 && day <= 6 && h >= 10 && h < 19;
    const el = $("#openStatus");
    el.classList.toggle("is-open", open);
    let text;
    if (open) text = "Open now · until 7PM";
    else if (day >= 1 && day <= 6 && h < 10) text = "Closed · opens today 10AM";
    else if (day === 6 || day === 0) text = "Closed · opens Monday 10AM";
    else text = "Closed · opens tomorrow 10AM";
    $(".status__text", el).textContent = text;
    $$("#hours tr").forEach(tr => tr.classList.toggle("is-today", +tr.dataset.day === day));
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Lash fan illustrations ---------- */
  $$(".fan").forEach(svg => {
    const n = +svg.dataset.fan;
    const P0 = [8, 16], P1 = [60, 44], P2 = [112, 16];
    const ns = "http://www.w3.org/2000/svg";
    const lid = document.createElementNS(ns, "path");
    lid.setAttribute("d", `M${P0} Q${P1} ${P2}`);
    lid.setAttribute("class", "lid");
    svg.appendChild(lid);
    const count = 13;
    for (let i = 0; i < count; i++) {
      const t = .07 + (i / (count - 1)) * .86;
      const bx = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0];
      const by = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1];
      const tx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
      const ty = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
      const base = Math.atan2(-ty, tx) + (t - .5) * .5;
      const len = 14 + 9 * Math.sin(Math.PI * t);
      for (let k = 0; k < n; k++) {
        const spread = n > 1 ? (k / (n - 1) - .5) * (.14 + n * .05) : 0;
        const a = base + spread;
        const L = len * (1 - Math.abs(spread) * .5);
        const ex = bx + Math.sin(a) * L, ey = by + Math.cos(a) * L;
        const cx = bx + Math.sin(a - .35) * L * .6, cy = by + Math.cos(a - .35) * L * .6;
        const p = document.createElementNS(ns, "path");
        p.setAttribute("d", `M${bx.toFixed(1)} ${by.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
        p.setAttribute("pathLength", "1");
        p.setAttribute("class", "l");
        p.style.transitionDelay = `${(i * 40 + k * 15)}ms`;
        if (n > 3) p.style.opacity = .55 + .45 * (1 - Math.abs(spread) * 1.5);
        svg.appendChild(p);
      }
    }
  });

  /* ---------- Score count-up ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    if (prefersReduced) return;
    const start = performance.now(), dur = 1400;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(1);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      const c = en.target.querySelector("[data-count]");
      if (c) countUp(c);
      io.unobserve(en.target);
    });
  }, { threshold: .14, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal, .reveal-scale").forEach(el => io.observe(el));

  /* ---------- Nav: sticky state, active link, mobile menu ---------- */
  const nav = $("#nav");
  const fab = $("#fab");
  const hero = $(".hero");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-stuck", y > 40);
    fab.classList.toggle("is-on", y > hero.offsetHeight * .7);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = $$(".nav__links a");
  const sectionIo = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); if (s) sectionIo.observe(s); });

  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", !open);
    if (open) $("a", mobileMenu).focus({ preventScroll: true });
    else if (mobileMenu.contains(document.activeElement)) (desktopNav.matches ? links[0] : burger).focus({ preventScroll: true });
  }
  const desktopNav = window.matchMedia("(min-width: 1101px)");
  desktopNav.addEventListener("change", e => { if (e.matches) setMenu(false); });
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("a", mobileMenu).forEach(a => a.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (drawer.classList.contains("is-open")) closeDrawer();
      if (document.body.classList.contains("menu-open")) setMenu(false);
      return;
    }
    if (e.key !== "Tab") return;
    let controls;
    if (drawer.classList.contains("is-open")) {
      controls = $$("button:not([disabled]), a[href]", drawer).filter(el => el.getClientRects().length);
    } else if (document.body.classList.contains("menu-open")) {
      controls = [burger, ...$$("a", mobileMenu)];
    } else return;
    const first = controls[0], last = controls[controls.length - 1];
    if (!controls.includes(document.activeElement) || (e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last)) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderMenu();
  renderBag();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
})();
