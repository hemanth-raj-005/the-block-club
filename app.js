/**
 * THE BLOCK — Athletic Club & Streetwear Collective
 * Interactive Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initRouteCanvas();
  initCapsuleSection();
  initScheduleAndRsvp();
  initPassStudio();
  initLiveClock();
  initMobileNav();
});

/* ==========================================================================
   1. LIVE UTC CLOCK & STATUS
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('liveUtcClock');
  function update() {
    const now = new Date();
    const hrs = String(now.getUTCHours()).padStart(2, '0');
    const mins = String(now.getUTCMinutes()).padStart(2, '0');
    const secs = String(now.getUTCSeconds()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hrs}:${mins}:${secs} UTC`;
    }
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. AUDIO CADENCE SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;
let audioStep = 0;
const CADENCE_BPM = 168; // Runner step cadence

function initAudioEngine() {
  const toggleBtn = document.getElementById('audioToggleBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) {
      toggleBtn.classList.add('playing');
      const textSpan = toggleBtn.querySelector('.audio-text');
      if (textSpan) textSpan.textContent = 'CADENCE: 168 BPM';
      startCadencePulse();
      showToast('♫ Cadence Audio Online (168 BPM Pulse)');
    } else {
      toggleBtn.classList.remove('playing');
      const textSpan = toggleBtn.querySelector('.audio-text');
      if (textSpan) textSpan.textContent = 'CADENCE: OFF';
      stopCadencePulse();
      showToast('Cadence Audio Muted');
    }
  });

  // Sound effects on interactive buttons
  document.querySelectorAll('.btn, .route-tab-btn, .filter-btn, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => playTickSound(800, 0.02, 0.03));
    el.addEventListener('click', () => playTickSound(1200, 0.05, 0.06));
  });
}

function playTickSound(freq, duration, gainVal) {
  if (!audioCtx || !isAudioPlaying) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio safe fallback
  }
}

function startCadencePulse() {
  if (audioTimer) clearInterval(audioTimer);
  const intervalMs = (60 / CADENCE_BPM) * 1000;
  audioStep = 0;

  audioTimer = setInterval(() => {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (audioStep % 4 === 0) {
      // Sub kick on the 1 beat
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } else {
      // High-frequency subtle hi-hat stride tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    }
    audioStep++;
  }, intervalMs);
}

function stopCadencePulse() {
  if (audioTimer) {
    clearInterval(audioTimer);
    audioTimer = null;
  }
}

/* ==========================================================================
   3. RUN DIVISION: CANVAS ROUTE VISUALIZER & PACE ENGINE
   ========================================================================== */
const ROUTE_DATA = {
  riverside: {
    name: "RIVERSIDE DRIFT",
    distance: 8.2,
    elevation: "+310 FT",
    terrain: "Waterfront Asphalt & Piers",
    description: "Our hallmark Sunday route along the western piers. Crisp river breeze, completely flat straightaways for negative-split pacing, finishing at The Table kitchen.",
    points: [
      { x: 0.1, y: 0.8 }, { x: 0.18, y: 0.65 }, { x: 0.25, y: 0.5 },
      { x: 0.32, y: 0.38 }, { x: 0.44, y: 0.3 }, { x: 0.58, y: 0.28 },
      { x: 0.72, y: 0.35 }, { x: 0.82, y: 0.52 }, { x: 0.88, y: 0.72 },
      { x: 0.76, y: 0.82 }, { x: 0.58, y: 0.78 }, { x: 0.38, y: 0.82 },
      { x: 0.22, y: 0.85 }, { x: 0.1, y: 0.8 }
    ]
  },
  crit: {
    name: "MIDNIGHT CRIT",
    distance: 5.0,
    elevation: "+120 FT",
    terrain: "Downtown Concrete Grid",
    description: "Fast, sharp, adrenaline-filled city circuit under neon billboards and tunnel underpasses. 90-degree cornering and high turnover cadence.",
    points: [
      { x: 0.2, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.75 },
      { x: 0.45, y: 0.75 }, { x: 0.45, y: 0.5 }, { x: 0.3, y: 0.5 },
      { x: 0.3, y: 0.75 }, { x: 0.2, y: 0.75 }, { x: 0.2, y: 0.25 }
    ]
  },
  bridge: {
    name: "EAST BRIDGE REPEATS",
    distance: 6.5,
    elevation: "+740 FT",
    terrain: "Suspension Incline & Deck",
    description: "Pure power development. 4x continuous sustained climbs over the suspension span with unmatched views of the dawn skyline.",
    points: [
      { x: 0.08, y: 0.8 }, { x: 0.22, y: 0.65 }, { x: 0.35, y: 0.4 },
      { x: 0.5, y: 0.2 }, { x: 0.65, y: 0.4 }, { x: 0.78, y: 0.65 },
      { x: 0.92, y: 0.8 }, { x: 0.78, y: 0.65 }, { x: 0.65, y: 0.4 },
      { x: 0.5, y: 0.2 }, { x: 0.35, y: 0.4 }, { x: 0.22, y: 0.65 },
      { x: 0.08, y: 0.8 }
    ]
  }
};

let currentRouteKey = 'riverside';
let runnerProgress = 0;
let animationFrameId = null;

function initRouteCanvas() {
  const canvas = document.getElementById('routeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
  }
  resize();
  window.addEventListener('resize', resize);

  // Tab switcher
  document.querySelectorAll('.route-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.route-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRouteKey = btn.dataset.route;
      runnerProgress = 0;
      updateRouteInfo();
      calculatePace();
    });
  });

  // Pace slider
  const paceSlider = document.getElementById('paceSlider');
  if (paceSlider) {
    paceSlider.addEventListener('input', calculatePace);
  }

  // Animation render loop
  function render() {
    drawCanvasRoute(ctx, canvas);
    animationFrameId = requestAnimationFrame(render);
  }
  render();
  updateRouteInfo();
  calculatePace();
}

function drawCanvasRoute(ctx, canvas) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // 1. Tech grid lines
  ctx.strokeStyle = 'rgba(237, 234, 226, 0.05)';
  ctx.lineWidth = 1;
  const gridSize = 40 * window.devicePixelRatio;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 2. Draw active route polyline
  const route = ROUTE_DATA[currentRouteKey];
  if (!route || !route.points.length) return;

  const pts = route.points.map(p => ({
    x: p.x * w,
    y: p.y * h
  }));

  // Route glow halo
  ctx.strokeStyle = 'rgba(47, 73, 255, 0.25)';
  ctx.lineWidth = 10 * window.devicePixelRatio;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.stroke();

  // Core sharp route line
  ctx.strokeStyle = '#2F49FF';
  ctx.lineWidth = 3.5 * window.devicePixelRatio;
  ctx.stroke();

  // Waypoints
  pts.forEach((pt, idx) => {
    if (idx === 0) {
      // Start node
      ctx.fillStyle = '#D4FF3D';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    } else if (idx % 3 === 0) {
      ctx.fillStyle = 'rgba(237, 234, 226, 0.6)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Animated Runner Marker
  runnerProgress += 0.003;
  if (runnerProgress > 1) runnerProgress = 0;

  const currentPos = getPointOnPath(pts, runnerProgress);
  if (currentPos) {
    // Pulse ring
    ctx.strokeStyle = 'rgba(212, 255, 61, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, 14 * window.devicePixelRatio, 0, Math.PI * 2);
    ctx.stroke();

    // Runner core
    ctx.fillStyle = '#D4FF3D';
    ctx.shadowColor = '#D4FF3D';
    ctx.shadowBlur = 12 * window.devicePixelRatio;
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, 5 * window.devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  }
}

function getPointOnPath(pts, t) {
  const totalSegments = pts.length - 1;
  const scaledT = t * totalSegments;
  const index = Math.floor(scaledT);
  const frac = scaledT - index;

  if (index >= totalSegments) return pts[pts.length - 1];
  const p1 = pts[index];
  const p2 = pts[index + 1];

  return {
    x: p1.x + (p2.x - p1.x) * frac,
    y: p1.y + (p2.y - p1.y) * frac
  };
}

function updateRouteInfo() {
  const route = ROUTE_DATA[currentRouteKey];
  document.getElementById('routeDisplayTitle').textContent = route.name;
  document.getElementById('routeDisplayDesc').textContent = route.description;
  document.getElementById('routeDisplayDist').textContent = `${route.distance} MI`;
  document.getElementById('routeDisplayElev').textContent = route.elevation;
  document.getElementById('routeDisplayTerrain').textContent = route.terrain;
}

function calculatePace() {
  const slider = document.getElementById('paceSlider');
  if (!slider) return;
  const paceSecondsPerMile = parseInt(slider.value, 10); // e.g. 420 = 7:00/mi

  const mins = Math.floor(paceSecondsPerMile / 60);
  const secs = String(paceSecondsPerMile % 60).padStart(2, '0');
  document.getElementById('currPaceDisplay').textContent = `${mins}:${secs} /mi`;

  const route = ROUTE_DATA[currentRouteKey];
  const totalSeconds = route.distance * paceSecondsPerMile;
  const estHours = Math.floor(totalSeconds / 3600);
  const estMins = Math.floor((totalSeconds % 3600) / 60);
  const estSecs = Math.floor(totalSeconds % 60);

  const timeString = estHours > 0 
    ? `${estHours}h ${estMins}m`
    : `${estMins}m ${String(estSecs).padStart(2, '0')}s`;

  document.getElementById('estTimeDisplay').textContent = timeString;

  // Approximate calories (dist * 105 avg)
  const calories = Math.round(route.distance * 108);
  document.getElementById('estCalDisplay').textContent = `${calories} kcal`;

  // Heat assignment
  const heatBadge = document.getElementById('heatBadgeDisplay');
  const heatName = document.getElementById('heatNameDisplay');
  if (paceSecondsPerMile <= 400) {
    heatBadge.textContent = "HEAT 1";
    heatBadge.className = "badge badge-lime";
    heatName.textContent = "Sub-6:40 Speedpack (Pacesetter Alpha)";
  } else if (paceSecondsPerMile <= 480) {
    heatBadge.textContent = "HEAT 2";
    heatBadge.className = "badge badge-cobalt";
    heatName.textContent = "7:00–8:00 Tempo Collective";
  } else {
    heatBadge.textContent = "HEAT 3";
    heatBadge.className = "badge";
    heatName.textContent = "8:30+ Social Strides & Vibes";
  }
}

/* ==========================================================================
   4. CAPSULE STREETWEAR & LOOKBOOK MODAL
   ========================================================================== */
const CAPSULE_PRODUCTS = {
  p1: {
    title: "AEROGRID 3M REFLECTIVE SHELL",
    price: "$145.00",
    color: "Iridescent Slate / Black",
    specs: ["Schoeller 3XDRY® nanotech finish", "3M™ Scotchlite reflective line grid", "Ultralight 88g Japanese ripstop nylon", "Magnetic storm flap & hidden gel pocket"],
    desc: "Engineered specifically for midnight street tempos. Completely windproof and water-shedding while bouncing streetlight rays back at full illumination."
  },
  p2: {
    title: "INTERVAL 5\" SPLIT RACE SHORT",
    price: "$78.00",
    color: "Stealth Black / Acid Lime",
    specs: ["Bonded zero-chafe laser seams", "Dual rear bounce-free phone/flask pouch", "Antimicrobial internal brief liner", "High-vis drawcord cinch"],
    desc: "Stripped down to absolute essentials. Clean split hem enables non-restrictive stride turnover without flapping."
  },
  p3: {
    title: "UNSANCTIONED RUNNER CAP",
    price: "$42.00",
    color: "Matte Carbon / Dark Grey",
    specs: ["Pliable EVA packable soft visor", "Laser-cut ventilation micro-apertures", "CoolMax moisture-wicking inner headband", "Reflective rear lock strap"],
    desc: "Crumple it into your waistband or back pocket. Springs right back to shape when rain breaks or sun crests."
  },
  p4: {
    title: "RECOVERY 480GSM CREWNECK",
    price: "$95.00",
    color: "Chalk Heather / Off-White",
    specs: ["Heavyweight 480gsm organic French terry", "Vintage boxy drop-shoulder cut", "Studio hand-printed waterbased inks", "Pre-shrunk for post-run recovery"],
    desc: "The uniform for The Table. Warm, heavyweight tactile cotton built to slip on the minute you cool down over fresh pasta."
  }
};

function initCapsuleSection() {
  // Live countdown timer to drop
  const dropDate = new Date();
  dropDate.setDate(dropDate.getDate() + 4);
  dropDate.setHours(dropDate.getHours() + 18);

  function updateDropTimer() {
    const diff = dropDate - new Date();
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById('timerDays');
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMins');
    const sEl = document.getElementById('timerSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hrs).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }
  updateDropTimer();
  setInterval(updateDropTimer, 1000);

  // Product cards modal trigger
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('closeProductModal');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.dataset.product;
      const data = CAPSULE_PRODUCTS[pid];
      if (!data) return;

      document.getElementById('modalProductTitle').textContent = data.title;
      document.getElementById('modalProductPrice').textContent = data.price;
      document.getElementById('modalProductDesc').textContent = data.desc;
      document.getElementById('modalProductColor').textContent = `Colorway: ${data.color}`;

      const specsList = document.getElementById('modalProductSpecs');
      specsList.innerHTML = '';
      data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
      });

      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // Reserve button inside modal
  const reserveBtn = document.getElementById('reserveProductBtn');
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      const activeSize = document.querySelector('.size-btn.active')?.textContent || 'M';
      modal.classList.remove('open');
      showToast(`✓ Reserved in size ${activeSize} — Allocation locked for Drop 02!`);
    });
  }

  // Size buttons toggle
  document.querySelectorAll('.size-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. SCHEDULE, FILTERING & RSVP (WITH ICS EXPORT)
   ========================================================================== */
const EVENTS_DATA = [
  {
    id: 1,
    date: "SEP 14",
    title: "Sunday Long Run",
    desc: "8.2 miles, riverside route, easy pace crew welcome. Ends at The Table kitchen.",
    cat: "RUN",
    location: "Piers Hudson Trailway // 5:45 AM",
    time: "20260914T054500Z"
  },
  {
    id: 2,
    date: "SEP 19",
    title: "FW26 Capsule Drop 02",
    desc: "Second run of the reflective windbreaker & race splits. Members get first hour allocation.",
    cat: "DROP",
    location: "Atelier Studio & Online // 10:00 AM",
    time: "20260919T100000Z"
  },
  {
    id: 3,
    date: "SEP 24",
    title: "Makers Studio Night",
    desc: "Screen-print your own singlets and team patches. Inks and blank kits provided.",
    cat: "GATHER",
    location: "Block Workshop 4B // 7:00 PM",
    time: "20260924T190000Z"
  },
  {
    id: 4,
    date: "SEP 27",
    title: "Track Night: 400m Repeats",
    desc: "Coached interval session under floodlights. Heats grouped from sub-5:00 to 8:30 pace.",
    cat: "RUN",
    location: "East River Oval Track // 6:15 PM",
    time: "20260927T181500Z"
  },
  {
    id: 5,
    date: "OCT 04",
    title: "The Table: Block 2-Year Anniversary",
    desc: "Two years in. Homemade tagliatelle, natural orange wine, and custom crew trophies.",
    cat: "GATHER",
    location: "Urban Loft Courtyard // 6:30 PM",
    time: "20261004T183000Z"
  },
  {
    id: 6,
    date: "OCT 10",
    title: "Midnight Crit Run",
    desc: "5.0-mile lightning street circuit under city lights. High cadence, 3M kits strongly encouraged.",
    cat: "RUN",
    location: "City Hall Plaza // 11:30 PM",
    time: "20261010T233000Z"
  }
];

let selectedRsvpEvent = null;

function initScheduleAndRsvp() {
  const container = document.getElementById('schedListContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderRows(filter = 'ALL') {
    container.innerHTML = '';
    const filtered = filter === 'ALL' 
      ? EVENTS_DATA 
      : EVENTS_DATA.filter(ev => ev.cat === filter);

    filtered.forEach(ev => {
      const row = document.createElement('div');
      row.className = 'sched-row';
      row.innerHTML = `
        <div class="sched-date">${ev.date}</div>
        <div class="sched-details">
          <h4>${ev.title}</h4>
          <p>${ev.desc}</p>
        </div>
        <div class="sched-location">${ev.location}</div>
        <div><span class="badge ${ev.cat === 'RUN' ? 'badge-lime' : ev.cat === 'DROP' ? 'badge-cobalt' : ''}">${ev.cat}</span></div>
        <div class="sched-action">
          <button type="button" data-event-id="${ev.id}">RSVP →</button>
        </div>
      `;
      container.appendChild(row);
    });

    // Re-bind RSVP buttons
    container.querySelectorAll('button[data-event-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const evId = parseInt(btn.dataset.eventId, 10);
        selectedRsvpEvent = EVENTS_DATA.find(e => e.id === evId);
        openRsvpModal(selectedRsvpEvent);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRows(btn.dataset.filter);
    });
  });

  renderRows('ALL');

  // RSVP Modal
  const rsvpModal = document.getElementById('rsvpModal');
  const closeRsvpBtn = document.getElementById('closeRsvpModal');
  const rsvpForm = document.getElementById('rsvpForm');

  function openRsvpModal(ev) {
    if (!ev) return;
    document.getElementById('rsvpModalTitle').textContent = `RSVP: ${ev.title}`;
    document.getElementById('rsvpModalMeta').textContent = `${ev.date} // ${ev.location}`;
    rsvpModal.classList.add('open');
  }

  if (closeRsvpBtn) {
    closeRsvpBtn.addEventListener('click', () => rsvpModal.classList.remove('open'));
  }
  if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
      if (e.target === rsvpModal) rsvpModal.classList.remove('open');
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpInputName').value || 'Crew Athlete';
      rsvpModal.classList.remove('open');
      showToast(`✓ Confirmed! See you there, ${name}.`);

      // Automatically trigger real .ics download
      if (selectedRsvpEvent) {
        downloadCalendarFile(selectedRsvpEvent);
      }
      rsvpForm.reset();
    });
  }
}

function downloadCalendarFile(ev) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//THE BLOCK ATHLETIC CLUB//EN',
    'BEGIN:VEVENT',
    `SUMMARY:THE BLOCK: ${ev.title}`,
    `DESCRIPTION:${ev.desc}`,
    `LOCATION:${ev.location}`,
    `DTSTART:${ev.time}`,
    `DTEND:${ev.time}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `THE-BLOCK-${ev.title.replace(/\s+/g, '-')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   6. ATHLETE PASS STUDIO (PERSONALIZED DIGITAL CARD GENERATOR)
   ========================================================================== */
function initPassStudio() {
  const nameInput = document.getElementById('passInputName');
  const handleInput = document.getElementById('passInputHandle');
  const heatSelect = document.getElementById('passSelectHeat');
  const focusSelect = document.getElementById('passSelectFocus');

  const cardName = document.getElementById('cardUserName');
  const cardHandle = document.getElementById('cardUserHandle');
  const cardHeat = document.getElementById('cardUserHeat');
  const cardFocus = document.getElementById('cardUserFocus');
  const cardId = document.getElementById('cardIdDisplay');

  function updatePass() {
    const rawName = nameInput.value.trim() || 'MAYA LIN';
    const rawHandle = handleInput.value.trim() || '@mayasprints';
    const heatVal = heatSelect.value;
    const focusVal = focusSelect.value;

    cardName.textContent = rawName.toUpperCase();
    cardHandle.textContent = rawHandle.startsWith('@') ? rawHandle : `@${rawHandle}`;
    cardHeat.textContent = heatVal;
    cardFocus.textContent = focusVal;

    // Generate unique member hash
    const initials = rawName.split(' ').map(s => s[0]).join('').toUpperCase() || 'BK';
    const hash = Math.floor(1000 + Math.random() * 8999);
    cardId.textContent = `#BLK-23-${initials}${hash}`;
  }

  nameInput.addEventListener('input', updatePass);
  handleInput.addEventListener('input', updatePass);
  heatSelect.addEventListener('change', updatePass);
  focusSelect.addEventListener('change', updatePass);

  // Download Card as PNG via Canvas
  const downloadBtn = document.getElementById('downloadPassBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      exportCardAsImage();
    });
  }
}

function exportCardAsImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 880;
  canvas.height = 540;

  // Background
  ctx.fillStyle = '#0f0e15';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gradient Top Bar
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, '#D4FF3D');
  grad.addColorStop(1, '#2F49FF');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, 10);

  // Card Outline
  ctx.strokeStyle = 'rgba(237, 234, 226, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

  // Header Title
  ctx.fillStyle = '#FAF8F5';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('THE BLOCK ATHLETIC CLUB', 48, 80);

  // Member ID
  const passId = document.getElementById('cardIdDisplay').textContent;
  ctx.fillStyle = '#D4FF3D';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(passId, 620, 80);

  // Divider
  ctx.strokeStyle = 'rgba(237, 234, 226, 0.15)';
  ctx.beginPath();
  ctx.moveTo(48, 110);
  ctx.lineTo(832, 110);
  ctx.stroke();

  // Name & Handle
  const name = document.getElementById('cardUserName').textContent;
  const handle = document.getElementById('cardUserHandle').textContent;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px sans-serif';
  ctx.fillText(name, 48, 200);

  ctx.fillStyle = '#4b63ff';
  ctx.font = '28px monospace';
  ctx.fillText(handle, 48, 245);

  // Heat & Focus Details
  const heat = document.getElementById('cardUserHeat').textContent;
  const focus = document.getElementById('cardUserFocus').textContent;

  ctx.fillStyle = '#8e8b83';
  ctx.font = '16px monospace';
  ctx.fillText('PACE HEAT', 48, 320);
  ctx.fillText('CLUB FOCUS', 400, 320);

  ctx.fillStyle = '#EDEAE2';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(heat, 48, 355);
  ctx.fillText(focus, 400, 355);

  // Barcode lines
  ctx.fillStyle = '#FFFFFF';
  for (let i = 48; i < 480; i += 7) {
    const w = (i % 3 === 0) ? 4 : 2;
    ctx.fillRect(i, 430, w, 50);
  }

  // Stamp / Watermark
  ctx.fillStyle = '#6e6b63';
  ctx.font = '16px monospace';
  ctx.fillText('COHORT 23 // OFFICIAL CREDENTIAL', 500, 455);
  ctx.fillText('ATHLETE-CORE // COMMUNITY FIRST', 500, 480);

  // Trigger download
  const imageURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = `THE-BLOCK-PASS-${name.replace(/\s+/g, '_')}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('✓ Athlete Pass Downloaded (.PNG)');
}

/* ==========================================================================
   7. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

/* ==========================================================================
   8. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }
  if (drawer) {
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }
}
