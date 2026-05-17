"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Snowflake, Wind, ThermometerSun, Zap, Battery, Volume2,
  Shield, Truck, RotateCcw, CheckCircle, ArrowRight, ArrowUpRight,
  ChevronLeft, ChevronRight, ChevronDown,
  Menu, X, Instagram, Facebook, Mail, Phone, MapPin, Clock as ClockIcon,
  Plus, Minus, Send, Cpu, Layers, Award, Wrench,
  Maximize, Hash, Sun, Cloud, Compass, Sparkles,
  Gauge, Activity, Calculator, TrendingUp, Sliders, AlertCircle,
  ArrowDown, Info, Power
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE PATHS
   ═══════════════════════════════════════════════════════════════════════════ */

const IMG = (key, i) => `/images/cryonex/${key}-${i}.webp`;
const imgs = (key, count) => Array.from({ length: count }, (_, i) => IMG(key, i + 1));

const HERO_IMAGE = '/images/c3.png';
// Background image used behind the green-tinted sections.
// Reuses the hero image you already have so no new asset is required.
const SECTION_BG_IMAGE = '/images/c3.png';

/* ═══════════════════════════════════════════════════════════════════════════
   LINKS — Van Parts Outlet
   ═══════════════════════════════════════════════════════════════════════════ */

const SHOP_BASE = 'https://vanpartsoutlet.com';
const VENTILATION_PAGE = `${SHOP_BASE}/pages/ventilation`;
const productUrl = (handle) => `${SHOP_BASE}/products/${handle}`;

const LINKS = {
  shopAll: VENTILATION_PAGE,
  ventilation: VENTILATION_PAGE,
  contact: `${SHOP_BASE}/pages/contact`,
  about: `${SHOP_BASE}/pages/about-us`,
  faq: `${SHOP_BASE}/pages/faqs`,
  warranty: `${SHOP_BASE}/pages/warranty`,
  terms: `${SHOP_BASE}/pages/terms-of-service`,
  privacy: `${SHOP_BASE}/pages/privacy-policy`,
  returns: `${SHOP_BASE}/pages/return-policy`,
  email: 'mailto:Vanpartsoutlet@gmail.com',
  facebook: 'https://www.facebook.com/VanPartsOutlet',
  instagram: 'https://www.instagram.com/vanpartsoutlet/',
};

const BUSINESS = {
  address: '413 West Big Bear Blvd, Big Bear City, CA 92314 US',
  hours: 'Mon–Fri: 9am–5pm · Sat–Sun: Closed',
  phone: '+1 (951) 441-9719',
  email: 'Vanpartsoutlet@gmail.com',
};

/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP — Cryonex X700 Rooftop AC
   ═══════════════════════════════════════════════════════════════════════════ */

const FLAGSHIP = {
  id: 'ac-x700',
  name: 'Cryonex X700 Rooftop AC',
  tagline: 'Off-grid 12V cooling. 8,200 BTU. Ultra-low 5.8" profile.',
  description:
    'A stealth-profile, inverter-free rooftop air conditioner engineered for Sprinter, Transit, and ProMaster conversions. Native 12V DC connects directly to your battery bank — no inverter, no waste, no compromise on summer comfort.',
  price: 1679,
  handle: 'cryonex-x700-roof-top-ac-unit-12v',
  inventory: 9,
  badge: 'Flagship',
  images: imgs('ac-x700', 10),
  metrics: [
    { k: 'BTU Output',  v: '8,200' },
    { k: 'Profile',     v: '5.8"' },
    { k: 'Voltage',     v: '12V DC' },
    { k: 'Noise Floor', v: '≤45 dB' },
  ],
  highlights: [
    'Flush-mount interior plenum — preserves headroom in your build',
    '5.8" ultra-low exterior — clears low garages and parking structures',
    'Native 12V DC — no inverter required, no 15–20% energy loss',
    'LiFePO4-optimized for 200Ah+ lithium battery banks',
    'Three 360° adjustable airflow vents for cabin distribution',
    'Ultra-quiet ≤45 dB sleep mode for stealth camping',
    'Integrated low-voltage cut-off protects your battery bank',
    'Wireless remote + optional interior trim bezel included',
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT LINEUP
   ═══════════════════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 'fridge-bc83a',
    name: 'Cryonex BC83A Compressor Fridge',
    tagline: '83 L · Dual-zone · 5" shallower than residential.',
    blurb:
      'A native 12V/24V DC compressor refrigerator built for vehicle layouts. Shallow-mount design preserves aisle width, R600a refrigerant chills rapidly, and the integrated locking latch keeps food secure on rough roads. 50W draw makes it solar-friendly without an inverter.',
    price: 680,
    handle: 'cyonex-bc83a-83l-12-24v-compressor-fridge',
    inventory: 6,
    badge: 'Best Seller',
    images: imgs('fridge-bc83a', 8),
    keyMetric: { k: 'Capacity', v: '83 L · 2.9 cu ft' },
    metrics: [
      { k: 'Voltage', v: '12V / 24V DC' },
      { k: 'Power',   v: '50W' },
      { k: 'Refrigerant', v: 'R600a' },
    ],
    highlights: [
      'Native DC — eliminates 15–20% inverter conversion loss',
      'Engineered for narrow van aisles — 5" shallower than residential',
      'Integrated locking door latch — secure on rough trails',
      'Separate fridge and freezer compartments',
      'Adjustable interior shelving + deep-pocket door bins',
      'Whisper-quiet compressor tuned for sleep-zone proximity',
    ],
  },
  {
    id: 'vent-fan',
    name: 'Cryonex Roof Ventilation Fan',
    tagline: '14" × 14" · 10-speed reversible · ~3,000 m³/h.',
    blurb:
      'High-output reversible airflow with thermostat automation, an integrated blackout curtain, and a wireless remote — every accessory you would normally buy separately is already included. Drop-in replacement for any standard 14" × 14" roof cutout.',
    price: 360,
    handle: 'cryonex-roof-ventilation-fan-14-x-14-rv-van-roof-vent',
    inventory: 5,
    badge: 'Essential',
    images: imgs('vent-fan', 11),
    keyMetric: { k: 'Airflow', v: '~3,000 m³/h' },
    metrics: [
      { k: 'Cutout', v: '14" × 14"' },
      { k: 'Voltage', v: '12V DC' },
      { k: 'Speeds', v: '10 reversible' },
    ],
    highlights: [
      '10-speed brushless motor — silent on low, powerful on high',
      'Reversible airflow — intake fresh air or exhaust steam/heat',
      'Smart thermostat automation maintains your set temperature',
      'Integrated blackout curtain — privacy + 100% morning sun block',
      'Wireless infrared remote included from the bed or galley',
      'Stainless steel insect mesh + UV-resistant lid for all-weather use',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ENGINEERING PILLARS
   ═══════════════════════════════════════════════════════════════════════════ */

const PILLARS = [
  {
    n: '01',
    icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Native DC',
    desc: 'Every system runs directly off 12V or 24V batteries. No inverter, no 15–20% conversion loss, no extra failure points.',
  },
  {
    n: '02',
    icon: <Battery className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Solar-First',
    desc: 'Low draw figures tuned for 200Ah+ lithium banks. Off-grid stays measured in days, not hours.',
  },
  {
    n: '03',
    icon: <Volume2 className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Sleep-Quiet',
    desc: 'Compressors and motors damped, isolated, and tuned for proximity. Stealth camping with the windows up.',
  },
  {
    n: '04',
    icon: <Shield className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Road-Hardened',
    desc: 'Vibration-tested for full-time travel. Low-voltage cut-off and thermal protection built in from the factory.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   USE CASES
   ═══════════════════════════════════════════════════════════════════════════ */

const USE_CASES = [
  { label: 'Sprinter conversions', icon: <Compass className="w-4 h-4" strokeWidth={1.5} /> },
  { label: 'Ford Transit builds',  icon: <Compass className="w-4 h-4" strokeWidth={1.5} /> },
  { label: 'Ram ProMaster vans',   icon: <Compass className="w-4 h-4" strokeWidth={1.5} /> },
  { label: 'Off-grid RVs',         icon: <Sun className="w-4 h-4" strokeWidth={1.5} /> },
  { label: 'Mobile workshops',     icon: <Wrench className="w-4 h-4" strokeWidth={1.5} /> },
  { label: 'Tiny homes',           icon: <Cpu className="w-4 h-4" strokeWidth={1.5} /> },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SPECS TABLE
   ═══════════════════════════════════════════════════════════════════════════ */

const SPECS_TABLE = [
  { label: 'Power architecture',  v1: 'Native 12V DC',        v2: '12V / 24V DC',         v3: '12V DC' },
  { label: 'System category',     v1: 'Rooftop air-cond.',    v2: 'Compressor fridge',    v3: 'Reversible vent fan' },
  { label: 'Capacity / output',   v1: '8,200 BTU',            v2: '83 L · 2.9 cu ft',     v3: '~3,000 m³/h' },
  { label: 'Profile / footprint', v1: '27.5" × 27.5" × 5.8"', v2: '5" shallower',         v3: '14" × 14" cutout' },
  { label: 'Refrigerant / motor', v1: 'R134a (pre-charged)',  v2: 'R600a',                v3: '10-speed brushless' },
  { label: 'Power draw',          v1: '70A rated max',        v2: '50W continuous',       v3: 'Low draw, variable' },
  { label: 'Noise floor',         v1: '≤45 dB sleep mode',    v2: 'Stealth-tuned',        v3: 'Ultra-quiet motor' },
  { label: 'Warranty',            v1: '1 year',               v2: '1 year',               v3: '1 year' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PERFORMANCE METRICS for the live counter widget
   ═══════════════════════════════════════════════════════════════════════════ */

const LIVE_METRICS = [
  { value: 8200, suffix: '', label: 'BTU at peak load', icon: <Gauge className="w-4 h-4" /> },
  { value: 45,   suffix: ' dB', label: 'Sleep-mode quiet', icon: <Volume2 className="w-4 h-4" /> },
  { value: 12,   suffix: 'V',  label: 'Native architecture', icon: <Zap className="w-4 h-4" /> },
  { value: 200,  suffix: 'Ah+', label: 'Battery-bank ready', icon: <Battery className="w-4 h-4" /> },
];

/* ═══════════════════════════════════════════════════════════════════════════
   POWER BUDGET CALCULATOR DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const SYSTEMS = [
  {
    id: 'ac-x700',
    name: 'X700 Rooftop AC',
    sub: '8,200 BTU · 12V DC',
    watts: 420,
    peakWatts: 840,
    icon: <Snowflake className="w-4 h-4" strokeWidth={1.6} />,
    color: '#0d5a4f',
    handle: 'cryonex-x700-roof-top-ac-unit-12v',
  },
  {
    id: 'fridge-bc83a',
    name: 'BC83A Fridge',
    sub: '83 L · 50W cont.',
    watts: 20,
    peakWatts: 50,
    icon: <Wind className="w-4 h-4" strokeWidth={1.6} />,
    color: '#0d5a4f',
    handle: 'cyonex-bc83a-83l-12-24v-compressor-fridge',
  },
  {
    id: 'vent-fan',
    name: 'Roof Vent Fan',
    sub: '10-speed · variable',
    watts: 12,
    peakWatts: 30,
    icon: <Wind className="w-4 h-4" strokeWidth={1.6} />,
    color: '#0d5a4f',
    handle: 'cryonex-roof-ventilation-fan-14-x-14-rv-van-roof-vent',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THEME — Light editorial palette + extended green tones for tinted sections
   ═══════════════════════════════════════════════════════════════════════════ */

const COLORS = {
  bg:         '#fafaf9',
  bgSoft:     '#f5f5f4',
  bgPaper:    '#ffffff',
  ink:        '#0c0a09',
  inkSoft:    '#44403c',
  inkMuted:   '#78716c',
  rule:       '#e7e5e4',
  accent:     '#0d5a4f',
  accentSoft: '#d1ddd9',
  copper:     '#9a4d2e',
  warn:       '#b45309',

  // ── Extended greenish palette for the tinted sections ──
  greenLight:   '#eef4f1',   // soft sage wash — barely-there pale green
  greenMid:     '#c9d9d2',   // mid-tone sage — used for borders/rules on green sections
  greenDeep:    '#0a4a40',   // a hair darker than accent — for deep section backgrounds
  greenDeeper:  '#073830',   // even darker green for high-contrast areas
  greenInk:     '#e8f1ed',   // text colour on dark green backgrounds (high contrast)
  greenMuted:   '#9ab5ab',   // muted text on dark green
};

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Counter({ to, suffix = '', duration = 1.8 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStart(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */

function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: COLORS.accent }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════════════════════ */

function Gallery({ images, name }) {
  const [i, setI] = useState(0);
  const safe = images.length > 0 ? images : ['/images/c3.png'];
  const next = () => setI((p) => (p + 1) % safe.length);
  const prev = () => setI((p) => (p - 1 + safe.length) % safe.length);

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100 group"
        style={{ border: `1px solid ${COLORS.rule}` }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={i}
            src={safe[i]}
            alt={`${name} — view ${i + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        {safe.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-white text-stone-900 transition-all backdrop-blur opacity-0 group-hover:opacity-100"
              style={{ border: `1px solid ${COLORS.rule}` }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-white text-stone-900 transition-all backdrop-blur opacity-0 group-hover:opacity-100"
              style={{ border: `1px solid ${COLORS.rule}` }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div
              className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 text-[10px] tracking-[0.2em] text-stone-700"
              style={{ border: `1px solid ${COLORS.rule}`, fontFamily: 'var(--font-mono)' }}
            >
              {String(i + 1).padStart(2, '0')} / {String(safe.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {safe.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {safe.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all ${
                idx === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
              style={{
                border: `1px solid ${idx === i ? COLORS.ink : COLORS.rule}`,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   POWER BUDGET CALCULATOR — interactive section
   This now renders ON the dark-green section, so all internal surfaces have
   been re-skinned to keep the legibility high on a deep green background.
   ═══════════════════════════════════════════════════════════════════════════ */

function PowerCalculator() {
  const [selected, setSelected] = useState({
    'ac-x700': true,
    'fridge-bc83a': true,
    'vent-fan': true,
  });
  const [batteryAh, setBatteryAh] = useState(300);
  const [solarW, setSolarW] = useState(400);
  const [acHoursPerDay, setAcHoursPerDay] = useState(6);

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const result = useMemo(() => {
    let dailyWh = 0;
    let peakW = 0;
    const breakdown = [];

    SYSTEMS.forEach((s) => {
      if (!selected[s.id]) return;
      let hours;
      if (s.id === 'ac-x700') hours = acHoursPerDay;
      else if (s.id === 'fridge-bc83a') hours = 24;
      else hours = 8;
      const wh = s.watts * hours;
      dailyWh += wh;
      peakW += s.peakWatts;
      breakdown.push({ id: s.id, name: s.name, wh, hours });
    });

    const usableWh = batteryAh * 12 * 0.8;
    const solarWhPerDay = solarW * 4.5 * 0.75;
    const netDailyWh = dailyWh - solarWhPerDay;

    let daysOffGrid;
    if (netDailyWh <= 0) {
      daysOffGrid = Infinity;
    } else {
      daysOffGrid = usableWh / netDailyWh;
    }

    const runtimeHrsNoSolar = dailyWh > 0 ? (usableWh / (dailyWh / 24)) : Infinity;

    return {
      dailyWh: Math.round(dailyWh),
      peakW: Math.round(peakW),
      usableWh: Math.round(usableWh),
      solarWhPerDay: Math.round(solarWhPerDay),
      netDailyWh: Math.round(netDailyWh),
      daysOffGrid,
      runtimeHrsNoSolar,
      breakdown,
    };
  }, [selected, batteryAh, solarW, acHoursPerDay]);

  const surplus = result.netDailyWh <= 0;
  const anySelected = Object.values(selected).some(Boolean);

  const drawBarWidth = Math.min(100, (result.dailyWh / Math.max(result.usableWh, 1)) * 100);
  const solarBarWidth = Math.min(100, (result.solarWhPerDay / Math.max(result.usableWh, 1)) * 100);

  // Tints used inside the calculator (this whole component lives on a deep green section)
  const cardBg = 'rgba(255,255,255,0.06)';
  const cardBgActive = 'rgba(255,255,255,0.12)';
  const greenRule = 'rgba(255,255,255,0.14)';
  const greenRuleSoft = 'rgba(255,255,255,0.08)';
  const greenText = COLORS.greenInk;
  const greenTextMuted = COLORS.greenMuted;
  const greenTextSoft = 'rgba(232,241,237,0.78)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* LEFT — Inputs */}
      <div className="lg:col-span-5 space-y-8">
        {/* System selector */}
        <div>
          <div className="ed-label mb-4 flex items-center gap-2" style={{ color: greenTextMuted }}>
            <Sliders className="w-3.5 h-3.5" />
            Step 01 — Select systems
          </div>
          <div className="space-y-2">
            {SYSTEMS.map((s) => {
              const on = selected[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className="w-full flex items-center gap-4 p-4 text-left transition-all"
                  style={{
                    background: on ? cardBgActive : cardBg,
                    border: `1px solid ${on ? '#7dd3c0' : greenRule}`,
                  }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background: on ? '#7dd3c0' : 'rgba(255,255,255,0.08)',
                      color: on ? COLORS.greenDeeper : greenText,
                      border: `1px solid ${on ? '#7dd3c0' : greenRule}`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="ed-display text-[14px]" style={{ color: greenText, fontWeight: 600 }}>
                      {s.name}
                    </div>
                    <div className="ed-mono text-[10px] mt-0.5" style={{ color: greenTextMuted }}>
                      {s.sub.toUpperCase()} · AVG {s.watts}W
                    </div>
                  </div>
                  <div
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: on ? '#7dd3c0' : 'transparent',
                      border: `1.5px solid ${on ? '#7dd3c0' : greenRule}`,
                    }}
                  >
                    {on && <CheckCircle className="w-3 h-3" style={{ color: COLORS.greenDeeper }} strokeWidth={2.5} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AC runtime slider */}
        {selected['ac-x700'] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="ed-label flex items-center gap-2" style={{ color: greenTextMuted }}>
                <ClockIcon className="w-3.5 h-3.5" />
                AC runtime per day
              </div>
              <div className="ed-mono text-[13px]" style={{ color: greenText, fontWeight: 600 }}>
                {acHoursPerDay}h
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              step={1}
              value={acHoursPerDay}
              onChange={(e) => setAcHoursPerDay(Number(e.target.value))}
              className="cryo-slider cryo-slider-dark w-full"
            />
            <div className="flex justify-between mt-1.5 ed-mono text-[10px]" style={{ color: greenTextMuted }}>
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </motion.div>
        )}

        {/* Battery slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="ed-label flex items-center gap-2" style={{ color: greenTextMuted }}>
              <Battery className="w-3.5 h-3.5" />
              Step 02 — Battery bank size
            </div>
            <div className="ed-mono text-[13px]" style={{ color: greenText, fontWeight: 600 }}>
              {batteryAh}Ah
            </div>
          </div>
          <input
            type="range"
            min={100}
            max={800}
            step={50}
            value={batteryAh}
            onChange={(e) => setBatteryAh(Number(e.target.value))}
            className="cryo-slider cryo-slider-dark w-full"
          />
          <div className="flex justify-between mt-1.5 ed-mono text-[10px]" style={{ color: greenTextMuted }}>
            <span>100Ah</span>
            <span>400Ah</span>
            <span>800Ah</span>
          </div>
        </div>

        {/* Solar slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="ed-label flex items-center gap-2" style={{ color: greenTextMuted }}>
              <Sun className="w-3.5 h-3.5" />
              Step 03 — Solar input
            </div>
            <div className="ed-mono text-[13px]" style={{ color: greenText, fontWeight: 600 }}>
              {solarW}W
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={1200}
            step={50}
            value={solarW}
            onChange={(e) => setSolarW(Number(e.target.value))}
            className="cryo-slider cryo-slider-dark w-full"
          />
          <div className="flex justify-between mt-1.5 ed-mono text-[10px]" style={{ color: greenTextMuted }}>
            <span>0W</span>
            <span>600W</span>
            <span>1200W</span>
          </div>
        </div>
      </div>

      {/* RIGHT — Results */}
      <div className="lg:col-span-7">
        <div
          className="p-6 lg:p-8 h-full backdrop-blur-sm"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${greenRule}`,
          }}
        >
          {!anySelected ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <AlertCircle className="w-8 h-8 mb-4" style={{ color: greenTextMuted }} strokeWidth={1.5} />
              <div className="ed-display text-[18px] mb-2" style={{ color: greenText, fontWeight: 600 }}>
                Select at least one system
              </div>
              <div className="text-[13px]" style={{ color: greenTextMuted }}>
                Toggle the systems on the left to see your power budget.
              </div>
            </div>
          ) : (
            <>
              <div className="ed-label mb-4 flex items-center gap-2" style={{ color: '#7dd3c0' }}>
                <Activity className="w-3.5 h-3.5" />
                Live result
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 pb-8" style={{ borderBottom: `1px solid ${greenRule}` }}>
                <div>
                  <div className="ed-mono text-[10px] mb-2" style={{ color: greenTextMuted }}>
                    DAILY DRAW
                  </div>
                  <motion.div
                    key={result.dailyWh}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="ed-display text-[clamp(2rem,4vw,2.75rem)] leading-none"
                    style={{ color: greenText, fontWeight: 700 }}
                  >
                    {result.dailyWh.toLocaleString()}
                    <span className="text-[18px] ml-1.5" style={{ color: greenTextMuted, fontWeight: 400 }}>Wh</span>
                  </motion.div>
                </div>
                <div>
                  <div className="ed-mono text-[10px] mb-2" style={{ color: greenTextMuted }}>
                    SOLAR HARVEST
                  </div>
                  <motion.div
                    key={result.solarWhPerDay}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="ed-display text-[clamp(2rem,4vw,2.75rem)] leading-none"
                    style={{ color: '#7dd3c0', fontWeight: 700 }}
                  >
                    {result.solarWhPerDay.toLocaleString()}
                    <span className="text-[18px] ml-1.5" style={{ color: greenTextMuted, fontWeight: 400 }}>Wh</span>
                  </motion.div>
                </div>
              </div>

              {/* Visual bars */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between mb-1.5 text-[11px]" style={{ color: greenTextSoft }}>
                    <span className="ed-mono">DAILY CONSUMPTION</span>
                    <span className="ed-mono">{Math.round(drawBarWidth)}% of bank</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <motion.div
                      animate={{ width: `${drawBarWidth}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full"
                      style={{ background: greenText }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5 text-[11px]" style={{ color: greenTextSoft }}>
                    <span className="ed-mono">SOLAR REPLENISHMENT</span>
                    <span className="ed-mono">{Math.round(solarBarWidth)}% of bank</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <motion.div
                      animate={{ width: `${solarBarWidth}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full"
                      style={{ background: '#7dd3c0' }}
                    />
                  </div>
                </div>
              </div>

              {/* Verdict card */}
              <div
                className="p-5 mb-6"
                style={{
                  background: surplus ? 'rgba(125,211,192,0.12)' : 'rgba(254,243,199,0.12)',
                  border: `1px solid ${surplus ? '#7dd3c0' : '#fde68a'}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: surplus ? '#7dd3c0' : '#fde68a',
                      color: surplus ? COLORS.greenDeeper : '#78350f',
                    }}
                  >
                    {surplus ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="ed-display text-[16px] mb-1" style={{ color: greenText, fontWeight: 700 }}>
                      {surplus
                        ? 'Indefinite off-grid runtime'
                        : isFinite(result.daysOffGrid)
                          ? `~${result.daysOffGrid.toFixed(1)} days off-grid`
                          : 'Battery-only mode'}
                    </div>
                    <div className="text-[13px] leading-[1.6]" style={{ color: greenTextSoft }}>
                      {surplus
                        ? `Your ${solarW}W solar harvests more than this build consumes — your bank stays topped up day after day.`
                        : isFinite(result.daysOffGrid)
                          ? `Net daily shortfall of ${Math.abs(result.netDailyWh)}Wh. Your ${batteryAh}Ah LiFePO4 bank covers it for about ${result.daysOffGrid.toFixed(1)} days before solar or shore-power top-up is needed.`
                          : `With no consumption you have unlimited runtime. Select a system above to see the math.`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail row */}
              <div className="grid grid-cols-3 gap-px" style={{ background: greenRule, border: `1px solid ${greenRule}` }}>
                <div className="p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="ed-mono text-[10px] mb-1.5" style={{ color: greenTextMuted }}>
                    PEAK DRAW
                  </div>
                  <div className="ed-display text-[18px] leading-none" style={{ color: greenText, fontWeight: 700 }}>
                    {result.peakW}W
                  </div>
                </div>
                <div className="p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="ed-mono text-[10px] mb-1.5" style={{ color: greenTextMuted }}>
                    USABLE Wh
                  </div>
                  <div className="ed-display text-[18px] leading-none" style={{ color: greenText, fontWeight: 700 }}>
                    {result.usableWh.toLocaleString()}
                  </div>
                </div>
                <div className="p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="ed-mono text-[10px] mb-1.5" style={{ color: greenTextMuted }}>
                    NO-SOLAR RUN
                  </div>
                  <div className="ed-display text-[18px] leading-none" style={{ color: greenText, fontWeight: 700 }}>
                    {isFinite(result.runtimeHrsNoSolar) ? `${result.runtimeHrsNoSolar.toFixed(1)}h` : '∞'}
                  </div>
                </div>
              </div>

              {/* Footnote */}
              <div className="flex items-start gap-2 mt-6 text-[11px] leading-[1.6]" style={{ color: greenTextMuted }}>
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span>
                  Estimates assume LiFePO4 chemistry at 80% depth-of-discharge, 4.5 peak-sun-hours, and 75% solar system efficiency. AC values use cycling-average draw, not peak. For a precise sizing review, email{' '}
                  <a href={LINKS.email} className="underline" style={{ color: greenText }}>
                    {BUSINESS.email}
                  </a>.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function CryonexPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  const openExt = (url) => window.open(url, '_blank', 'noopener');
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = ['hero', 'flagship', 'lineup', 'engineering', 'calculator', 'applications', 'specs'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent('Cryonex newsletter subscription');
    const body = encodeURIComponent(`Please subscribe me to Cryonex updates.\n\nMy email: ${email}`);
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setEmailSent(true);
    setEmail('');
    setTimeout(() => setEmailSent(false), 3500);
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─── Fonts + base styles ─── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --font-display: 'DM Sans', 'Inter', system-ui, -apple-system, sans-serif;
          --font-body: 'Inter', 'DM Sans', system-ui, -apple-system, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: 'cv11', 'ss01', 'ss03';
        }

        ::selection { background: ${COLORS.accent}; color: white; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bgSoft}; }
        ::-webkit-scrollbar-thumb {
          background: ${COLORS.inkMuted};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.ink}; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .ed-display {
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -0.035em;
          font-feature-settings: 'ss01';
        }
        .ed-mono {
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }
        .ed-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Subtle grain overlay */
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        /* Animated gradient text */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .grad-text {
          background: linear-gradient(120deg, ${COLORS.ink} 0%, ${COLORS.accent} 45%, ${COLORS.ink} 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }

        /* Pulse dot */
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        /* Custom range slider — light variant (kept for any future light section) */
        .cryo-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: ${COLORS.rule};
          outline: none;
          cursor: pointer;
        }
        .cryo-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: ${COLORS.ink};
          border: 2px solid ${COLORS.bg};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 2px 6px rgba(12,10,9,0.2);
          transition: transform 0.15s;
        }
        .cryo-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          background: ${COLORS.accent};
        }
        .cryo-slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }
        .cryo-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: ${COLORS.ink};
          border: 2px solid ${COLORS.bg};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 2px 6px rgba(12,10,9,0.2);
        }
        .cryo-slider::-moz-range-thumb:hover {
          background: ${COLORS.accent};
        }

        /* Dark-variant slider for the dark green calculator section */
        .cryo-slider-dark {
          background: rgba(255,255,255,0.12);
        }
        .cryo-slider-dark::-webkit-slider-thumb {
          background: #7dd3c0;
          border: 2px solid ${COLORS.greenDeep};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .cryo-slider-dark::-webkit-slider-thumb:hover {
          background: #a3e5d4;
        }
        .cryo-slider-dark::-moz-range-thumb {
          background: #7dd3c0;
          border: 2px solid ${COLORS.greenDeep};
        }
        .cryo-slider-dark::-moz-range-thumb:hover {
          background: #a3e5d4;
        }
      `}</style>

      <ScrollProgress />
      <div className="grain" />

      {/* ════════════════════════════════════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: 'rgba(250, 250, 249, 0.85)',
          borderBottom: `1px solid ${COLORS.rule}`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 h-8 flex items-center justify-center text-white"
              style={{ background: COLORS.ink }}
            >
              <Snowflake className="w-4 h-4" strokeWidth={1.5} />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span
                className="ed-display text-[19px] tracking-tight"
                style={{ color: COLORS.ink }}
              >
                Cryonex
              </span>
              <span
                className="ed-mono text-[9px] mt-1"
                style={{ color: COLORS.inkMuted }}
              >
                CLIMATE SYSTEMS · VAN PARTS OUTLET
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-10">
            {[
              ['Flagship', 'flagship'],
              ['Lineup', 'lineup'],
              ['Engineering', 'engineering'],
              ['Power Calculator', 'calculator'],
              ['Specs', 'specs'],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-[13px] transition-colors py-1"
                style={{
                  color: activeNav === id ? COLORS.ink : COLORS.inkSoft,
                  fontWeight: activeNav === id ? 600 : 400,
                }}
              >
                {label}
                {activeNav === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px"
                    style={{ background: COLORS.accent }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Magnetic>
              <button
                onClick={() => openExt(LINKS.shopAll)}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[12px] text-white transition-all hover:opacity-90"
                style={{ background: COLORS.accent, fontWeight: 600 }}
              >
                Shop Ventilation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              style={{ border: `1px solid ${COLORS.rule}` }}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white"
              style={{ borderTop: `1px solid ${COLORS.rule}` }}
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {[
                  ['Flagship', 'flagship'],
                  ['Lineup', 'lineup'],
                  ['Engineering', 'engineering'],
                  ['Power Calculator', 'calculator'],
                  ['Specs', 'specs'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left py-3 ed-display text-[18px]"
                    style={{ color: COLORS.ink }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => openExt(LINKS.shopAll)}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-white text-[12px]"
                  style={{ background: COLORS.accent }}
                >
                  Shop Ventilation
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen w-full overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(110deg, rgba(250,250,249,0.97) 0%, rgba(250,250,249,0.92) 38%, rgba(250,250,249,0.65) 62%, rgba(12,10,9,0.32) 100%)`,
          }}
        />

        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(${COLORS.ink} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParent}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-8 lg:pr-10">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <span className="flex items-center gap-2 ed-label" style={{ color: COLORS.accent }}>
                  <span
                    className="pulse-dot w-2 h-2 rounded-full inline-block"
                    style={{ background: COLORS.accent }}
                  />
                  01 — Climate Systems
                </span>
                <span className="h-px w-12" style={{ background: COLORS.rule }} />
                <span className="ed-label" style={{ color: COLORS.inkMuted }}>
                  Cryonex by VPO
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="ed-display text-[clamp(2.75rem,8vw,7rem)] leading-[1.05] mb-8 pr-4"
              >
                <span style={{ color: COLORS.ink }}>Climate </span>
                <span className="grad-text italic inline-block pr-1" style={{ fontWeight: 700 }}>without</span>
                <span style={{ color: COLORS.ink }}> the</span>
                <br />
                <span style={{ color: COLORS.ink }}>inverter.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[17px] leading-[1.7] mb-10 max-w-[560px]"
                style={{ color: COLORS.inkSoft, fontWeight: 400 }}
              >
                Three systems. One architecture. Cryonex rooftop AC, dual-zone compressor
                refrigeration, and reversible ventilation all run directly off your battery bank —
                no inverter, no 15–20% conversion loss, no compromise on summer comfort.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 mb-14">
                <Magnetic>
                  <button
                    onClick={() => scrollTo('flagship')}
                    className="group inline-flex items-center gap-3 px-7 py-4 text-white text-[13px] transition-all hover:opacity-90 shadow-lg"
                    style={{ background: COLORS.ink, fontWeight: 600 }}
                  >
                    Meet the X700
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="inline-flex items-center gap-2 text-[13px] underline-offset-4 hover:underline transition group"
                  style={{ color: COLORS.ink, fontWeight: 600 }}
                >
                  Try the power calculator
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 max-w-[520px]">
                {[
                  { num: 8200, suffix: '', label: 'BTU output' },
                  { num: 12, suffix: 'V', label: 'Native DC' },
                  { num: 45, suffix: 'dB', label: 'Sleep mode' },
                ].map((m) => (
                  <div key={m.label}>
                    <div
                      className="ed-display text-[clamp(1.75rem,3vw,2.25rem)] leading-none mb-2"
                      style={{ color: COLORS.ink, fontWeight: 700 }}
                    >
                      <Counter to={m.num} suffix={m.suffix} />
                    </div>
                    <div className="ed-mono text-[10px]" style={{ color: COLORS.inkMuted }}>
                      {m.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="hidden lg:block lg:col-span-4"
            >
              <div
                className="relative p-6 backdrop-blur-md"
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: `1px solid ${COLORS.rule}`,
                  boxShadow: '0 20px 60px rgba(12,10,9,0.08)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: COLORS.accent }} />
                  <span className="ed-label" style={{ color: COLORS.accent }}>Flagship</span>
                </div>
                <div className="ed-display text-[20px] mb-1" style={{ color: COLORS.ink, fontWeight: 700 }}>
                  X700 Rooftop AC
                </div>
                <div className="ed-mono text-[10px] mb-5" style={{ color: COLORS.inkMuted }}>
                  8,200 BTU · 12V · 5.8" PROFILE
                </div>
                <div
                  className="aspect-[4/3] w-full overflow-hidden mb-5"
                  style={{ border: `1px solid ${COLORS.rule}` }}
                >
                  <img
                    src={FLAGSHIP.images[0]}
                    alt="X700"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="ed-mono text-[10px]" style={{ color: COLORS.inkMuted }}>FROM</div>
                    <div className="ed-display text-[22px]" style={{ color: COLORS.ink, fontWeight: 700 }}>
                      ${FLAGSHIP.price.toLocaleString()}
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
                <button
                  onClick={() => scrollTo('flagship')}
                  className="w-full py-2.5 text-white text-[12px] transition hover:opacity-90"
                  style={{ background: COLORS.ink, fontWeight: 600 }}
                >
                  View flagship
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="ed-mono text-[10px]" style={{ color: COLORS.inkMuted }}>SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-3.5 h-3.5" style={{ color: COLORS.inkMuted }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE BAR
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-4 overflow-hidden"
        style={{ borderTop: `1px solid ${COLORS.rule}`, borderBottom: `1px solid ${COLORS.rule}`, background: COLORS.bgPaper }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap ed-mono text-[12px]"
          style={{ color: COLORS.inkSoft }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].flatMap((_, j) =>
            [
              'NATIVE 12V DC',
              'NO INVERTER REQUIRED',
              'SPRINTER · TRANSIT · PROMASTER',
              '1-YEAR WARRANTY',
              'CALIFORNIA-BASED SUPPORT',
              'BUILT FOR OFF-GRID LIFE',
              'LIFEPO4-OPTIMIZED',
              'ROAD-VIBRATION TESTED',
            ].map((t, i) => (
              <span key={`${j}-${i}`} className="flex items-center gap-12">
                {t}
                <span style={{ color: COLORS.rule }}>◆</span>
              </span>
            ))
          )}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FLAGSHIP
          ════════════════════════════════════════════════════════════════════ */}
      <section id="flagship" className="py-24 lg:py-32 px-6 lg:px-10 relative">
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="mb-16 lg:mb-20"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accent }}>02 — Flagship</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="ed-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
                ${FLAGSHIP.price.toLocaleString()}.00 USD
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-4xl"
              style={{ color: COLORS.ink, fontWeight: 700 }}
            >
              The {FLAGSHIP.name.split('Cryonex ')[1] || FLAGSHIP.name}.{' '}
              <em
                style={{ fontStyle: 'italic', color: COLORS.inkSoft, fontWeight: 400 }}
              >
                {FLAGSHIP.tagline}
              </em>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <Gallery images={FLAGSHIP.images} name={FLAGSHIP.name} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerParent}
              className="lg:col-span-5 lg:pt-6"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <span
                  className="px-2 py-0.5 ed-mono text-[10px]"
                  style={{
                    background: COLORS.accentSoft,
                    color: COLORS.accent,
                  }}
                >
                  {FLAGSHIP.badge.toUpperCase()}
                </span>
                <span className="ed-mono text-[10px] flex items-center gap-1.5" style={{ color: COLORS.inkMuted }}>
                  <span
                    className="pulse-dot w-1.5 h-1.5 rounded-full"
                    style={{ background: COLORS.accent }}
                  />
                  {FLAGSHIP.inventory} in stock
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-[1.7] mb-8"
                style={{ color: COLORS.inkSoft }}
              >
                {FLAGSHIP.description}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 gap-px mb-10"
                style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
              >
                {FLAGSHIP.metrics.map((m) => (
                  <div
                    key={m.k}
                    className="p-5"
                    style={{ background: COLORS.bgPaper }}
                  >
                    <div
                      className="ed-mono text-[10px] mb-2"
                      style={{ color: COLORS.inkMuted }}
                    >
                      {m.k.toUpperCase()}
                    </div>
                    <div
                      className="ed-display text-[24px] leading-none"
                      style={{ color: COLORS.ink, fontWeight: 700 }}
                    >
                      {m.v}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.ul variants={fadeUp} className="space-y-3 mb-10">
                {FLAGSHIP.highlights.slice(0, 6).map((h, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-start gap-3 text-[14px]"
                    style={{ color: COLORS.inkSoft }}
                  >
                    <span
                      className="ed-mono text-[10px] mt-1 flex-shrink-0 w-5"
                      style={{ color: COLORS.accent }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUp}
                className="pt-6"
                style={{ borderTop: `1px solid ${COLORS.rule}` }}
              >
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="ed-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>
                      USD
                    </div>
                    <div
                      className="ed-display text-[40px] leading-none"
                      style={{ color: COLORS.ink, fontWeight: 700 }}
                    >
                      ${FLAGSHIP.price.toLocaleString()}.00
                    </div>
                  </div>
                  <div className="flex items-center" style={{ border: `1px solid ${COLORS.rule}` }}>
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className="w-10 text-center ed-mono text-[14px]"
                      style={{ color: COLORS.ink }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Magnetic strength={0.15}>
                    <button
                      onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white text-[13px] transition hover:opacity-90 w-full"
                      style={{ background: COLORS.ink, fontWeight: 600 }}
                    >
                      Add to cart
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Magnetic>
                  <button
                    onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:bg-stone-100"
                    style={{
                      border: `1px solid ${COLORS.ink}`,
                      color: COLORS.ink,
                      fontWeight: 600,
                    }}
                  >
                    View full spec
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          LIVE METRICS STRIP (dark band)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-14 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.ink, color: COLORS.bg }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${COLORS.accent}, transparent 50%)`,
          }}
        />
        <div className="max-w-[1400px] mx-auto relative grid grid-cols-2 lg:grid-cols-4 gap-10">
          {LIVE_METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: COLORS.accentSoft }}>
                {m.icon}
                <span className="ed-mono text-[10px] opacity-70">{m.label.toUpperCase()}</span>
              </div>
              <div className="ed-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ fontWeight: 700 }}>
                <Counter to={m.value} suffix={m.suffix} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          LINEUP
          ════════════════════════════════════════════════════════════════════ */}
      <section id="lineup" className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: COLORS.bgPaper }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="mb-20"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accent }}>03 — Lineup</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="ed-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
                {PRODUCTS.length} systems
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-4xl mb-4"
              style={{ color: COLORS.ink, fontWeight: 700 }}
            >
              Beyond the rooftop —{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.inkSoft, fontWeight: 400 }}>
                a complete climate system.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[15px] max-w-[640px] leading-[1.7]"
              style={{ color: COLORS.inkSoft }}
            >
              Cooling is only one part of comfort. Cryonex refrigeration keeps your galley cold without
              an inverter, and reversible ventilation moves heat, steam, and condensation out before
              they can damage your build.
            </motion.p>
          </motion.div>

          <div className="space-y-24 lg:space-y-32">
            {PRODUCTS.map((p, idx) => {
              const isReverse = idx % 2 === 1;
              return (
                <motion.article
                  key={p.id}
                  id={`product-${p.id}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={staggerParent}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
                >
                  <motion.div
                    variants={fadeUp}
                    className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="relative">
                      <div
                        className={`absolute -top-14 ed-display select-none text-[120px] lg:text-[180px] leading-none pointer-events-none ${
                          isReverse ? '-right-4' : '-left-4'
                        }`}
                        style={{
                          color: COLORS.accentSoft,
                          fontWeight: 300,
                          opacity: 0.65,
                          zIndex: 0,
                        }}
                      >
                        {String(idx + 2).padStart(2, '0')}
                      </div>
                      <div className="relative z-10">
                        <Gallery images={p.images} name={p.name} />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className={`lg:col-span-5 lg:pt-8 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-2 py-0.5 ed-mono text-[10px]"
                        style={{
                          background: COLORS.accentSoft,
                          color: COLORS.accent,
                        }}
                      >
                        {p.badge.toUpperCase()}
                      </span>
                      <span className="ed-mono text-[10px] flex items-center gap-1.5" style={{ color: COLORS.inkMuted }}>
                        <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: COLORS.accent }} />
                        {p.inventory} in stock
                      </span>
                    </div>

                    <h3
                      className="ed-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] mb-3"
                      style={{ color: COLORS.ink, fontWeight: 700 }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="ed-display text-[18px] leading-[1.4] mb-6"
                      style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 500 }}
                    >
                      {p.tagline}
                    </p>

                    <p
                      className="text-[15px] leading-[1.7] mb-8"
                      style={{ color: COLORS.inkSoft }}
                    >
                      {p.blurb}
                    </p>

                    <div
                      className="flex flex-wrap gap-px mb-8"
                      style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
                    >
                      <div className="px-5 py-4 flex-1 min-w-[140px]" style={{ background: COLORS.bg }}>
                        <div className="ed-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>
                          {p.keyMetric.k.toUpperCase()}
                        </div>
                        <div className="ed-display text-[20px] leading-none" style={{ color: COLORS.ink, fontWeight: 700 }}>
                          {p.keyMetric.v}
                        </div>
                      </div>
                      {p.metrics.slice(0, 3).map((m) => (
                        <div
                          key={m.k}
                          className="px-5 py-4 flex-1 min-w-[120px]"
                          style={{ background: COLORS.bg }}
                        >
                          <div className="ed-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>
                            {m.k.toUpperCase()}
                          </div>
                          <div
                            className="ed-mono text-[13px] leading-none"
                            style={{ color: COLORS.ink, fontWeight: 600 }}
                          >
                            {m.v}
                          </div>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2.5 mb-10">
                      {p.highlights.slice(0, 5).map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-[13.5px] leading-[1.55]"
                          style={{ color: COLORS.inkSoft }}
                        >
                          <CheckCircle
                            className="w-3.5 h-3.5 mt-1 flex-shrink-0"
                            style={{ color: COLORS.accent }}
                            strokeWidth={1.5}
                          />
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className="flex items-end justify-between pt-6 mb-6"
                      style={{ borderTop: `1px solid ${COLORS.rule}` }}
                    >
                      <div>
                        <div className="ed-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>
                          USD
                        </div>
                        <div className="ed-display text-[32px] leading-none" style={{ color: COLORS.ink, fontWeight: 700 }}>
                          ${p.price.toLocaleString()}.00
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Magnetic strength={0.15}>
                        <button
                          onClick={() => openExt(productUrl(p.handle))}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white text-[13px] transition hover:opacity-90 w-full"
                          style={{ background: COLORS.ink, fontWeight: 600 }}
                        >
                          Add to cart
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </Magnetic>
                      <button
                        onClick={() => openExt(productUrl(p.handle))}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:bg-stone-100"
                        style={{ border: `1px solid ${COLORS.ink}`, color: COLORS.ink, fontWeight: 600 }}
                      >
                        Details
                      </button>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ENGINEERING PILLARS — RE-THEMED:  pale sage / mint background
          Subtle green wash, dark text retained, green hairline rules
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="engineering"
        className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.greenLight }}
      >
        {/* Very faint diagonal stripe pattern in deeper green for texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, ${COLORS.greenDeep} 0px, ${COLORS.greenDeep} 1px, transparent 1px, transparent 22px)`,
          }}
        />
        {/* Soft radial glow upper right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.accent}25, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16"
          >
            <motion.div variants={fadeUp} className="lg:col-span-5">
              <div className="flex items-baseline gap-5 mb-6">
                <span className="ed-label" style={{ color: COLORS.accent }}>04 — Engineering</span>
                <span className="h-px flex-1" style={{ background: COLORS.greenMid }} />
              </div>
              <h2
                className="ed-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]"
                style={{ color: COLORS.ink, fontWeight: 700 }}
              >
                Four principles{' '}
                <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 500 }}>
                  every system follows.
                </em>
              </h2>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="lg:col-span-7 text-[15px] leading-[1.75] lg:pt-6"
              style={{ color: COLORS.inkSoft }}
            >
              Cryonex isn't just three products that happen to share a logo. The architecture is
              the brand. Every unit assumes you live off your batteries, sleeps a few feet from
              your bed, and travels rough roads every weekend.
            </motion.p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: COLORS.greenMid, border: `1px solid ${COLORS.greenMid}` }}
          >
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 lg:p-10 group transition-all relative overflow-hidden cursor-default"
                style={{ background: 'rgba(255,255,255,0.85)' }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${COLORS.accent}15, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="ed-mono text-[11px]"
                      style={{ color: COLORS.accent }}
                    >
                      {p.n}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: COLORS.accent }}
                    >
                      {p.icon}
                    </motion.div>
                  </div>
                  <h3
                    className="ed-display text-[24px] leading-tight mb-3"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[13.5px] leading-[1.65]"
                    style={{ color: COLORS.inkSoft }}
                  >
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          POWER BUDGET CALCULATOR — RE-THEMED:  DEEP GREEN with bg image overlay
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="calculator"
        className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.greenDeep }}
      >
        {/* Background image, low opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src={SECTION_BG_IMAGE}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
        </div>

        {/* Deep green overlay — keeps readability high */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${COLORS.greenDeeper}f2 0%, ${COLORS.greenDeep}ee 50%, ${COLORS.greenDeeper}f2 100%)`,
          }}
        />

        {/* Subtle dotted pattern for depth */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient radial accents */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, rgba(125,211,192,0.18), transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, rgba(125,211,192,0.12), transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label flex items-center gap-2" style={{ color: '#7dd3c0' }}>
                <Calculator className="w-3.5 h-3.5" />
                05 — Power Budget Calculator
              </span>
              <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.18)' }} />
              <span className="ed-mono text-[11px] hidden md:inline" style={{ color: COLORS.greenMuted }}>
                LIVE · INTERACTIVE
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-4xl mb-5"
              style={{ color: COLORS.greenInk, fontWeight: 700 }}
            >
              Will it run on your bank?{' '}
              <em style={{ fontStyle: 'italic', color: '#7dd3c0', fontWeight: 400 }}>
                Find out in 10 seconds.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[15px] max-w-[680px] leading-[1.7]"
              style={{ color: 'rgba(232,241,237,0.82)' }}
            >
              Pick the Cryonex systems you're planning, set your battery and solar specs, and see
              live estimates for daily consumption, solar replenishment, and days of autonomous
              off-grid runtime — calculated from real product wattages.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <PowerCalculator />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          APPLICATIONS — RE-THEMED:  green-tinted with subtle bg image
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="applications"
        className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.greenLight }}
      >
        {/* Optional faint background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={SECTION_BG_IMAGE}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.08 }}
          />
        </div>

        {/* Sage wash overlay for legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(120deg, ${COLORS.greenLight}f7 0%, ${COLORS.greenLight}f0 60%, ${COLORS.greenLight}f7 100%)`,
          }}
        />

        {/* Soft accent glow */}
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] pointer-events-none z-10 opacity-40"
          style={{
            background: `radial-gradient(circle, ${COLORS.accent}20, transparent 60%)`,
            filter: 'blur(50px)',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerParent}
            className="lg:col-span-6"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accent }}>06 — Applications</span>
              <span className="h-px flex-1" style={{ background: COLORS.greenMid }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mb-8"
              style={{ color: COLORS.ink, fontWeight: 700 }}
            >
              Built for the people who{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 500 }}>
                live in their builds.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-[1.7] mb-8"
              style={{ color: COLORS.inkSoft }}
            >
              Cryonex systems ship to professional outfitters, DIY builders, and full-time
              vanlifers across North America. Every unit is dimensioned for the most common
              high-roof platforms and pre-engineered for battery-bank installation.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[14px] leading-[1.7]"
              style={{ color: COLORS.inkMuted }}
            >
              Not sure which system your build needs? Email{' '}
              <a
                href={LINKS.email}
                className="underline hover:no-underline"
                style={{ color: COLORS.accent, fontWeight: 600 }}
              >
                {BUSINESS.email}
              </a>{' '}
              with your platform and battery configuration — our California team will pair the
              right setup to your power budget.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerParent}
            className="lg:col-span-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {USE_CASES.map((u, idx) => (
                <motion.div
                  key={u.label}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: COLORS.accent }}
                  transition={{ duration: 0.25 }}
                  className="p-6 transition-all group cursor-default relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: `1px solid ${COLORS.greenMid}`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${COLORS.accent}18, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <motion.div
                        whileHover={{ rotate: 12 }}
                        style={{ color: COLORS.accent }}
                      >
                        {u.icon}
                      </motion.div>
                      <span
                        className="ed-mono text-[10px]"
                        style={{ color: COLORS.inkMuted }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div
                      className="ed-display text-[18px] leading-tight"
                      style={{ color: COLORS.ink, fontWeight: 600 }}
                    >
                      {u.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SPECS TABLE
          ════════════════════════════════════════════════════════════════════ */}
      <section id="specs" className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accent }}>07 — Specifications</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] max-w-3xl"
              style={{ color: COLORS.ink, fontWeight: 700 }}
            >
              The full architecture,{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.inkSoft, fontWeight: 400 }}>
                line by line.
              </em>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto"
            style={{ border: `1px solid ${COLORS.rule}` }}
          >
            <table className="w-full min-w-[720px]" style={{ background: COLORS.bgPaper }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.rule}`, background: COLORS.bgSoft }}>
                  <th
                    className="text-left px-6 py-4 ed-mono text-[11px]"
                    style={{ color: COLORS.inkMuted, fontWeight: 500 }}
                  >
                    SPECIFICATION
                  </th>
                  <th
                    className="text-left px-6 py-4 ed-display text-[14px]"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    X700 Rooftop AC
                  </th>
                  <th
                    className="text-left px-6 py-4 ed-display text-[14px]"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    BC83A Fridge
                  </th>
                  <th
                    className="text-left px-6 py-4 ed-display text-[14px]"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    Roof Vent Fan
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPECS_TABLE.map((row, idx) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-stone-50 transition-colors"
                    style={{
                      borderBottom: idx === SPECS_TABLE.length - 1 ? 'none' : `1px solid ${COLORS.rule}`,
                    }}
                  >
                    <td
                      className="px-6 py-4 ed-mono text-[12px]"
                      style={{ color: COLORS.inkMuted }}
                    >
                      {row.label.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-[13.5px]" style={{ color: COLORS.ink }}>
                      {row.v1}
                    </td>
                    <td className="px-6 py-4 text-[13.5px]" style={{ color: COLORS.ink }}>
                      {row.v2}
                    </td>
                    <td className="px-6 py-4 text-[13.5px]" style={{ color: COLORS.ink }}>
                      {row.v3}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GUARANTEES STRIP
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6 lg:px-10"
        style={{
          background: COLORS.ink,
          color: COLORS.bg,
        }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Shield className="w-5 h-5" strokeWidth={1.5} />,
              t: '1-Year Warranty',
              d: 'Coverage on manufacturing defects and material failure for every unit, no questions asked.',
            },
            {
              icon: <Truck className="w-5 h-5" strokeWidth={1.5} />,
              t: 'Free U.S. Shipping',
              d: 'Calculated at checkout. Most lower-48 orders ship within two business days from California.',
            },
            {
              icon: <Wrench className="w-5 h-5" strokeWidth={1.5} />,
              t: 'California Tech Team',
              d: 'Direct access to builders who actually install these systems — not a generic support center.',
            },
          ].map((g, idx) => (
            <motion.div
              key={g.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-start gap-5 group"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.05 }}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center"
                style={{
                  border: `1px solid rgba(255,255,255,0.2)`,
                  color: COLORS.bg,
                }}
              >
                {g.icon}
              </motion.div>
              <div>
                <div className="ed-display text-[20px] mb-2" style={{ fontWeight: 700 }}>{g.t}</div>
                <div className="text-[13.5px] leading-[1.6]" style={{ color: 'rgba(250,250,249,0.65)' }}>
                  {g.d}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 px-6 lg:px-10 text-center relative overflow-hidden" style={{ background: COLORS.bgPaper }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${COLORS.accent}08, transparent 60%)`,
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerParent}
          className="max-w-3xl mx-auto relative"
        >
          <motion.div variants={fadeUp} className="ed-label mb-6" style={{ color: COLORS.accent }}>
            — Begin your build
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="ed-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-8"
            style={{ color: COLORS.ink, fontWeight: 700 }}
          >
            Comfort{' '}
            <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 500 }}>
              should not be
            </em>{' '}
            optional.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-[1.7] mb-10 max-w-xl mx-auto"
            style={{ color: COLORS.inkSoft }}
          >
            Three systems. One architecture. The complete Cryonex Ventilation lineup is in stock and
            ready to ship from Big Bear, California.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Magnetic strength={0.2}>
              <button
                onClick={() => openExt(LINKS.shopAll)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-[13px] transition hover:opacity-90 shadow-lg"
                style={{ background: COLORS.ink, fontWeight: 600 }}
              >
                Shop all Ventilation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
            <button
              onClick={() => openExt(LINKS.contact)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[13px] transition hover:bg-stone-100"
              style={{ border: `1px solid ${COLORS.ink}`, color: COLORS.ink, fontWeight: 600 }}
            >
              Talk to a builder
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer
        className="px-6 lg:px-10 pt-20 pb-10"
        style={{ background: COLORS.bgSoft, borderTop: `1px solid ${COLORS.rule}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12" style={{ borderBottom: `1px solid ${COLORS.rule}` }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center text-white"
                  style={{ background: COLORS.ink }}
                >
                  <Snowflake className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="ed-display text-[22px] leading-none" style={{ color: COLORS.ink, fontWeight: 700 }}>
                    Cryonex
                  </div>
                  <div className="ed-mono text-[10px] mt-1" style={{ color: COLORS.inkMuted }}>
                    CLIMATE SYSTEMS · VAN PARTS OUTLET
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[1.7] max-w-md" style={{ color: COLORS.inkSoft }}>
                Native 12V rooftop AC, dual-zone compressor refrigeration, and reversible
                ventilation for the people who live in their builds.
              </p>
            </div>

            <form onSubmit={handleEmail} className="w-full lg:w-auto">
              <div className="ed-label mb-3" style={{ color: COLORS.inkMuted }}>
                Updates from VPO
              </div>
              <div className="flex" style={{ border: `1px solid ${COLORS.ink}` }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="px-4 py-3 text-[13px] outline-none flex-1 lg:w-72 bg-transparent"
                  style={{ color: COLORS.ink }}
                />
                <button
                  type="submit"
                  className="px-5 text-white text-[12px] transition hover:opacity-90 flex items-center gap-2"
                  style={{ background: COLORS.ink, fontWeight: 600 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </div>
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ed-mono text-[11px] mt-3"
                  style={{ color: COLORS.accent }}
                >
                  ✓ Email client opened — finish sending from your mail app.
                </motion.div>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12">
            <div>
              <div className="ed-label mb-5" style={{ color: COLORS.inkMuted }}>
                Lineup
              </div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['X700 Rooftop AC', productUrl(FLAGSHIP.handle)],
                  ['BC83A Compressor Fridge', productUrl(PRODUCTS[0].handle)],
                  ['Roof Ventilation Fan', productUrl(PRODUCTS[1].handle)],
                  ['All Ventilation products', LINKS.shopAll],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="transition hover:opacity-60 inline-flex items-center gap-1.5"
                      style={{ color: COLORS.ink }}
                    >
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="ed-label mb-5" style={{ color: COLORS.inkMuted }}>
                Support
              </div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['Contact', LINKS.contact],
                  ['FAQ', LINKS.faq],
                  ['Warranty', LINKS.warranty],
                  ['Returns', LINKS.returns],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="transition hover:opacity-60"
                      style={{ color: COLORS.ink }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="ed-label mb-5" style={{ color: COLORS.inkMuted }}>
                Company
              </div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['About VPO', LINKS.about],
                  ['Terms', LINKS.terms],
                  ['Privacy', LINKS.privacy],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="transition hover:opacity-60"
                      style={{ color: COLORS.ink }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <div className="ed-label mb-5" style={{ color: COLORS.inkMuted }}>
                Headquarters
              </div>
              <ul className="space-y-3 text-[13px]" style={{ color: COLORS.ink }}>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.accent }} />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.accent }} />
                  <span>{BUSINESS.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.accent }} />
                  <a href={`tel:${BUSINESS.phone}`} className="hover:opacity-60">
                    {BUSINESS.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.accent }} />
                  <a href={LINKS.email} className="hover:opacity-60">
                    {BUSINESS.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${COLORS.rule}` }}
          >
            <div className="ed-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
              © {new Date().getFullYear()} VAN PARTS OUTLET · CRYONEX IS A VPO HOUSE BRAND
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: <Facebook className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.facebook, label: 'Facebook' },
                { icon: <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.instagram, label: 'Instagram' },
                { icon: <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.email, label: 'Email' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => { e.preventDefault(); openExt(s.href); }}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 flex items-center justify-center transition hover:bg-stone-200"
                  style={{ border: `1px solid ${COLORS.rule}`, color: COLORS.ink }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}