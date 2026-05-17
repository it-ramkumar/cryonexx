"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Snowflake, Wind, ThermometerSun, Zap, Battery, Volume2,
  Shield, Truck, RotateCcw, CheckCircle, ArrowRight, ArrowUpRight,
  ChevronLeft, ChevronRight, ChevronDown,
  Menu, X, Instagram, Facebook, Mail, Phone, MapPin, Clock as ClockIcon,
  Plus, Minus, Send, Cpu, Layers, Award, Wrench,
  Maximize, Hash, Sun, Cloud, Compass, Star, Quote, Sparkles,
  Gauge, Activity, Radio, Mountain,
  ArrowDown
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE PATHS
   - Hero: /images/c3.png  (your existing hero from the current site)
   - Product images: /images/cryonex/<key>-<n>.webp  (run download script)
   ═══════════════════════════════════════════════════════════════════════════ */

const IMG = (key, i) => `/images/cryonex/${key}-${i}.webp`;
const imgs = (key, count) => Array.from({ length: count }, (_, i) => IMG(key, i + 1));

const HERO_IMAGE = '/images/c3.png';

/* ═══════════════════════════════════════════════════════════════════════════
   LINKS — Van Parts Outlet
   NOTE: shopAll / all "HVAC" text-anchored links now point to the Ventilation page
   ═══════════════════════════════════════════════════════════════════════════ */

const SHOP_BASE = 'https://vanpartsoutlet.com';
const VENTILATION_PAGE = `${SHOP_BASE}/pages/ventilation`;
const productUrl = (handle) => `${SHOP_BASE}/products/${handle}`;

const LINKS = {
  shopAll: VENTILATION_PAGE,   // ← Shop HVAC button + footer "HVAC products" link
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
   NEW SECTION — Field Reports (testimonials/builders)
   ═══════════════════════════════════════════════════════════════════════════ */

const FIELD_REPORTS = [
  {
    quote:
      'The X700 changed our summer game completely. We crossed the Mojave in 110°F and the cabin held 72°F all night — solar kept up the next morning. No inverter, no drama.',
    author: 'Marcus & Lena T.',
    rig: 'Sprinter 144" High-Roof · 600Ah LiFePO4',
    location: 'Phoenix, AZ',
    rating: 5,
  },
  {
    quote:
      'Installed the BC83A in our Transit build last spring. 50W draw is real — our 400Ah bank barely notices it. The locking latch has saved our food more times than I can count on forest roads.',
    author: 'Priya & Devon K.',
    rig: 'Ford Transit 148" EL · 400Ah Bank',
    location: 'Bozeman, MT',
    rating: 5,
  },
  {
    quote:
      'Best vent fan I have used in three van builds. The blackout curtain alone is worth the price — pulling out a separate window cover every morning was killing me. Wireless remote is a game-changer.',
    author: 'Casey R.',
    rig: 'ProMaster 159" · DIY Conversion',
    location: 'Bend, OR',
    rating: 5,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   NEW SECTION — Performance metrics for the live counter widget
   ═══════════════════════════════════════════════════════════════════════════ */

const LIVE_METRICS = [
  { value: 8200, suffix: '', label: 'BTU at peak load', icon: <Gauge className="w-4 h-4" /> },
  { value: 45,   suffix: ' dB', label: 'Sleep-mode quiet', icon: <Volume2 className="w-4 h-4" /> },
  { value: 12,   suffix: 'V',  label: 'Native architecture', icon: <Zap className="w-4 h-4" /> },
  { value: 200,  suffix: 'Ah+', label: 'Battery-bank ready', icon: <Battery className="w-4 h-4" /> },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THEME — Light editorial palette
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER — counts to value when in view
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
   MAGNETIC BUTTON WRAPPER — subtle attraction on hover
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
   SCROLL PROGRESS BAR — top of page
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function CryonexPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [activeReport, setActiveReport] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const openExt = (url) => window.open(url, '_blank', 'noopener');
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Sticky-nav active section tracking
  useEffect(() => {
    const sections = ['hero', 'flagship', 'lineup', 'engineering', 'reports', 'applications', 'specs'];
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

  // Auto-rotate field reports
  useEffect(() => {
    const t = setInterval(() => setActiveReport((p) => (p + 1) % FIELD_REPORTS.length), 7000);
    return () => clearInterval(t);
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
      {/* ─── Fonts (Google sans-serif) + base styles ─── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          /* Both display & body are Google sans-serif now */
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

        /* Subtle grain overlay for the page */
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

        /* Ken-burns slow zoom for hero bg */
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.18) translate(-1%, -2%); }
        }
        .kenburns {
          animation: kenburns 22s ease-in-out infinite alternate;
        }

        /* Pulse dot */
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        /* Marquee */
        @keyframes marqueeShift {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
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
              ['Field Reports', 'reports'],
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
                  ['Field Reports', 'reports'],
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
          HERO — full-bleed bg image + content overlay + parallax
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden flex items-center"
      >
        {/* Full-bleed background image - static */}
<div className="absolute inset-0 z-0">
  <img
    src={HERO_IMAGE}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(110deg, rgba(250,250,249,0.96) 0%, rgba(250,250,249,0.88) 35%, rgba(250,250,249,0.55) 60%, rgba(12,10,9,0.35) 100%)`,
          }}
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(${COLORS.ink} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating decorative shapes (subtle motion) */}
        <motion.div
          className="absolute top-32 right-[8%] z-10 hidden lg:block pointer-events-none"
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-24 h-24 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${COLORS.accent}25, transparent 70%)`,
              filter: 'blur(10px)',
            }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[10%] z-10 hidden lg:block pointer-events-none"
          animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${COLORS.copper}20, transparent 70%)`,
              filter: 'blur(14px)',
            }}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full"
        >
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
                className="ed-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] mb-8"
              >
                <span style={{ color: COLORS.ink }}>Climate </span>
                <span className="grad-text italic" style={{ fontWeight: 700 }}>without</span>
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
                  onClick={() => scrollTo('lineup')}
                  className="inline-flex items-center gap-2 text-[13px] underline-offset-4 hover:underline transition group"
                  style={{ color: COLORS.ink, fontWeight: 600 }}
                >
                  Explore the full lineup
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>
              </motion.div>

              {/* Hero metrics with animated counters */}
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

            {/* Right side — floating product card */}
            <motion.div
              variants={fadeUp}
              className="hidden lg:block lg:col-span-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 backdrop-blur-md"
                style={{
                  background: 'rgba(255,255,255,0.7)',
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
                  <motion.img
                    src={HERO_IMAGE}
                    alt="X700"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
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
        </motion.div>
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
                  <motion.div
                    key={m.k}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
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
          LIVE METRICS STRIP (Animated counters in dark band)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-14 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.ink, color: COLORS.bg }}
      >
        {/* Subtle moving gradient */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${COLORS.accent}, transparent 50%)`,
          }}
          animate={{ x: ['-10%', '10%', '-10%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
          ENGINEERING PILLARS
          ════════════════════════════════════════════════════════════════════ */}
      <section id="engineering" className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
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
                <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              </div>
              <h2
                className="ed-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]"
                style={{ color: COLORS.ink, fontWeight: 700 }}
              >
                Four principles{' '}
                <em style={{ fontStyle: 'italic', color: COLORS.inkSoft, fontWeight: 400 }}>
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
            style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
          >
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 lg:p-10 group transition-all hover:bg-stone-50 relative overflow-hidden cursor-default"
                style={{ background: COLORS.bgPaper }}
              >
                {/* Animated background accent on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${COLORS.accent}08, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="ed-mono text-[11px]"
                      style={{ color: COLORS.inkMuted }}
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
          NEW SECTION — FIELD REPORTS (Testimonials carousel with bg image)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="reports"
        className="relative py-24 lg:py-32 px-6 lg:px-10 overflow-hidden"
        style={{ background: COLORS.ink, color: COLORS.bg }}
      >
        {/* Background image with overlay */}
        {/* Background image with overlay - static */}
<div className="absolute inset-0 z-0 opacity-25">
  <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
</div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.7) 60%, rgba(13,90,79,0.5) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerParent}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accentSoft }}>05 — Field Reports</span>
              <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="ed-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-4xl"
              style={{ fontWeight: 700 }}
            >
              From builders <em style={{ fontStyle: 'italic', color: COLORS.accentSoft, fontWeight: 400 }}>who lived in it</em>.
            </motion.h2>
          </motion.div>

          {/* Big quote panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReport}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Quote
                    className="w-12 h-12 mb-8 opacity-30"
                    style={{ color: COLORS.accentSoft }}
                    strokeWidth={1}
                  />
                  <blockquote
                    className="ed-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.35] mb-10"
                    style={{ fontWeight: 500 }}
                  >
                    "{FIELD_REPORTS[activeReport].quote}"
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-6 pb-6" style={{ borderBottom: `1px solid rgba(255,255,255,0.15)` }}>
                    <div>
                      <div className="ed-display text-[18px] mb-1" style={{ fontWeight: 700 }}>
                        {FIELD_REPORTS[activeReport].author}
                      </div>
                      <div className="ed-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {FIELD_REPORTS[activeReport].rig.toUpperCase()}
                      </div>
                    </div>
                    <span className="h-8 w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: COLORS.accentSoft }} strokeWidth={1.5} />
                      <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {FIELD_REPORTS[activeReport].location}
                      </span>
                    </div>
                    <span className="h-8 w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: FIELD_REPORTS[activeReport].rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: COLORS.accentSoft }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector column */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {FIELD_REPORTS.map((r, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveReport(idx)}
                  whileHover={{ x: 4 }}
                  className="text-left p-5 transition-all relative overflow-hidden"
                  style={{
                    background: activeReport === idx ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeReport === idx ? COLORS.accentSoft : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="ed-mono text-[10px]" style={{ color: COLORS.accentSoft }}>
                      REPORT {String(idx + 1).padStart(2, '0')}
                    </span>
                    {activeReport === idx && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 24 }}
                        className="h-px"
                        style={{ background: COLORS.accentSoft }}
                      />
                    )}
                  </div>
                  <div className="ed-display text-[15px]" style={{ fontWeight: 600 }}>
                    {r.author}
                  </div>
                  <div className="ed-mono text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {r.location.toUpperCase()}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-12">
            {FIELD_REPORTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReport(idx)}
                className="h-px transition-all"
                style={{
                  width: activeReport === idx ? 40 : 16,
                  background: activeReport === idx ? COLORS.accentSoft : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          APPLICATIONS
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="applications"
        className="py-24 lg:py-32 px-6 lg:px-10"
        style={{ background: COLORS.bgPaper }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerParent}
            className="lg:col-span-6"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="ed-label" style={{ color: COLORS.accent }}>06 — Applications</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
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
                style={{ color: COLORS.ink }}
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
                    background: COLORS.bg,
                    border: `1px solid ${COLORS.rule}`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${COLORS.accent}10, transparent 70%)`,
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
        {/* Subtle radial accent */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${COLORS.accent}08, transparent 60%)`,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
                  /* Updated: "All Ventilation products" now points to /pages/ventilation */
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