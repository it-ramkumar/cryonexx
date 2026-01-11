"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Snowflake, ThermometerSun, Wind, Droplets, 
  Zap, Battery, Cpu, Shield, Clock, Truck, 
  CheckCircle, ArrowRight, ChevronLeft, ChevronRight, 
  Play, Pause, ShoppingCart, CreditCard, Maximize, 
  RotateCcw, Sparkles, Award, Thermometer,
  Settings, Wrench, Menu, X, Instagram, Twitter, 
  Facebook, Youtube, Linkedin, Mail, Phone, MapPin,
  Plus, Minus, ChevronDown, ChevronUp,
  Car, Package, Volume2, CloudSnow,
  RefreshCw, Power, ShieldCheck, BatteryCharging,
  Droplet, Fan, AirVent, ThermometerIcon,
  Cloud, CloudRain, Globe, Waves,
  Video, FileText, Download, BookOpen,
  Star, Gift, Headphones, TruckIcon,
  Info, Award as AwardIcon, Users, PackageIcon,
  Shield as ShieldIcon, Globe as GlobeIcon,
  Thermometer as ThermometerIcon2, Wind as WindIcon,
  Sun, Moon, CloudIcon, Droplets as DropletsIcon
} from 'lucide-react';

// Cryonex Product Images
const productImages = [
  '/images/c1.png', '/images/c2.png', '/images/c3.png',
  '/images/c4.png', '/images/c5.png', '/images/c6.png',
  '/images/c7.png', '/images/c8.png', '/images/c9.png',
  '/images/c10.png', '/images/c11.png'
];

const installationVideos = [
  {
    id: 1,
    title: "Installation Guide - Part 1",
    description: "Step-by-step installation tutorial for Cryonex systems",
    video: "https://drive.google.com/file/d/1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-/preview",
    thumbnail: "https://drive.google.com/thumbnail?id=1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-&sz=w1000",
    mobileThumbnail: "https://drive.google.com/thumbnail?id=1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-&sz=w500",
    isDrive: true
  },
  {
    id: 2,
    title: "Installation Guide - Part 2",
    description: "Advanced configuration and optimization",
    video: "/q2.mp4",
    thumbnail: "/q2-thumb.jpg", // Create a compressed thumbnail
    mobileVideo: "/q2-compressed.mp4", // Create a compressed version for mobile
    isDrive: false
  }
];
// External URLs
const EXTERNAL_URLS = {
  shopAll: "https://vankea.com/collections/hvac",
  contact: "https://vankea.com/pages/contact",
  bc83aProduct: "https://vankea.com/products/cryonex12-24v-compressor-refrigerator",
  buyNow: "https://vankea.com/checkouts/cn/hWN7MKHCYelTl7BYthtjFMOa/en-us?_r=AQABuiNWAkJ0uow-HX7BeIqfXfL1s8U3rLz1MRjUssyF5Z4&auto_redirect=false&edge_redirect=true&skip_shop_pay=true",
  aboutUs: "https://vankea.com/pages/about-us",
  faq: "https://vankea.com/pages/faq",
  blog: "https://vankea.com/blogs/news",
  terms: "https://vankea.com/pages/terms-of-service",
  privacy: "https://vankea.com/pages/privacy-policy",
  returnPolicy: "https://vankea.com/pages/return-policy",
  installationGuide: "#",
  shopAllProducts: "https://vankea.com/collections/refrigerator"
};

// Detailed Product Information for Learn More Modal
const productDetails = {
  main: {
    title: "Cyronex BC83A 83L 12/24V Compressor Fridge",
    price: "$680.00 USD",
    monthly: "$113.33/mo",
    description: "Our Cyronex BC83A Compressor Refrigerator is the top-quality RV fridge, designed for your life on the road. The fridge provides enough space to store your food while taking up minimal space in your campervan.",
    detailedDescription: `Our van fridge has a capacity of 83 L (2.9 cu ft) and can be placed under the countertop, leaving the top space for a built-in stove if that is a part of your layout. Additionally, the depth is specifically designed for campervans, as it is 5 inches shallower than residential models.`,
    keyFeatures: [
      "Efficient Cooling: Powered by a high-performance compressor and R600a refrigerant (22g), this camper fridge delivers fast and consistent cooling while maximizing energy efficiency.",
      "Draw Low Power: With a total input power of only 50W, it's ideal for battery and solar systems without draining your power supply.",
      "12V/24V Versatility: The BC83A operates on 12V or 24V DC, making our RV refrigerator perfect for mobile lifestyles and off-grid environments. Just connect and go without any need for an inverter.",
      "Dual fridge/freezer feature: Our refrigerator for your campervan features a dual fridge/freezer. You can store snacks, fruits, drinks, etc, in the fridge, and meat, frozen items, or ice for your drinks in the freezer.",
      "Locking Latch: The fridge comes with a locking latch to prevent your food from falling out while traveling.",
      "Smart Interior Design: Adjustable shelves, dedicated chiller compartment, spacious door pockets for bottles, cans, and essentials.",
      "Low-noise operation for comfortable overnight use.",
      "Durable, easy-to-clean interior designed to withstand daily use."
    ],
    specifications: [
      { label: "Brand", value: "Cryonex" },
      { label: "Model", value: "BC83A" },
      { label: "Capacity", value: "83 Liters (2.9 cu ft)" },
      { label: "Power", value: "12V / 24V DC" },
      { label: "Refrigerant", value: "R600a (22g)" },
      { label: "Total Input Power", value: "50W" },
      { label: "Cooling System", value: "High-efficiency compressor" },
      { label: "Ideal For", value: "Campervans, RVs, caravans, trucks, boats, tiny homes" }
    ],
    whyChoose: "Cyronex products are engineered for performance, reliability, and efficiency. The BC83A is no exception—making off-grid living easier, quieter, and more energy-friendly."
  },
  ventilation: {
    title: "Cryonex Roof Ventilation Fan – 14\" x 14\" RV/Van Roof Vent",
    price: "$429.00 USD",
    salePrice: "$360.00 USD",
    monthly: "$60.00/mo",
    description: "The Cryonex Roof Ventilation Fan from Vankea gives you the perfect airflow inside your camper vans, RVs, caravans, and tiny homes. Designed to fit a standard 14\" x 14\" (355 mm x 355 mm) roof opening, this RV fan delivers the best airflow and comes with a remote control so you can easily operate it from anywhere inside the vehicle.",
    detailedDescription: `Upgrade your custom van build with reliable, high-performance airflow. The Cryonex Roof Ventilation Fan is engineered for off-grid vans, RVs, skoolies, and tiny homes that demand efficient ventilation, quiet operation, and dependable protection for year-round travel comfort.`,
    keyFeatures: [
      "Powerful Reversible Airflow: Move air in or out with a high-efficiency fan capable of approximately 3,000 m³/h ventilation. Refresh stale air, remove cooking heat, or bring in cool evening breezes instantly.",
      "Automatic Temperature Mode: Set your preferred climate and let the fan self-regulate. Default AUTO temperature: 26°C. Remote-adjustable temperature range: -2°C to 40°C.",
      "Ultra-Quiet Operation: Smooth, low-noise airflow ideal for nighttime use. Gear 4: outlet noise ≤ 29 dB, inlet noise ≤ 32 dB. Gear 10 (max): outlet noise ≤ 47 dB, inlet noise ≤ 53 dB.",
      "Smart Safety Protections: Built-in protection systems keep you and your fan safe including fan blade anti-pinch, top cover anti-pinch, and voltage protection (operates only between 9–16V).",
      "Built for Vanlife Durability: Full-load fan power: 20W + 4W (lighting). IPX4 water-resistant rating. Suitable roof thickness: 27–80 mm.",
      "Blackout Curtain: Comes with a blackout curtain to offer you privacy in your RV."
    ],
    dimensions: [
      { label: "Roof Opening Size", value: '14" x 14" (355 mm x 355 mm)' },
      { label: "Exterior Housing Length", value: '23-3/8" (593 mm)' },
      { label: "Exterior Housing Width", value: '16-9/16" (420 mm)' },
      { label: "Height (closed)", value: '5" (127 mm)' },
      { label: "Height (open)", value: '7-1/8" (182 mm)' }
    ],
    includes: [
      "Nomadic Ark PLUS Ventilation Fan",
      "Interior bezel",
      "Mounting hardware",
      "Wiring lead",
      "Remote control"
    ],
    perfectFor: [
      "Van Conversions (DIY or professional builds)",
      "RV upgrades",
      "Skoolie/Tiny Home ventilation",
      "Off-grid or solar-powered systems",
      "Hot-weather camping & full-time vanliving"
    ]
  },
  skylight: {
    title: "Van Roof Hatch Skylight",
    description: "Our premium Roof Hatch Skylight is designed to bring natural light, fresh air, and incredible views into your cabin.",
    keyFeatures: [
      "Panoramic Views: The large, clear dome offers you a clear view of the sky and lets you enjoy blue skies or a starry night from the comfort of your van.",
      "Built-In Blackout Screen: Our hatch skylight has a blackout screen that blocks out harsh sunlight and maintains privacy.",
      "Full 90-Degree Opening: Provides easy rooftop access without external climbing.",
      "Secure Lock: It also has an internal lock, which adds necessary security.",
      "Ventilation: Opens to let in fresh air, improving airflow in the van."
    ],
    specifications: [
      { label: "External Dimensions", value: '33.5" x 21" (850mm x 530mm)' },
      { label: "Opening Dimensions", value: '26.5" x 14.75" (675mm x 375mm)' }
    ],
    summary: "Get a hatch skylight to get maximum air and light in your campervan."
  },
  series: {
    title: "Cryonex 12/24V Compressor Refrigerator Series",
    description: "A high-efficiency 12/24V compressor refrigerator built for vans, RVs, and off-grid travel. Low power draw, quiet operation, and durable construction — available in multiple capacities up to 300L.",
    fullDescription: "The Vankea 12/24V Compressor Refrigerator delivers reliable cooling performance for van conversions, RV builds, mobile work trucks, and off-grid living. Designed to run efficiently on DC 12/24V power, this fridge uses a high-performance R600a compressor that provides fast cooling while keeping energy consumption low — ideal for battery and solar-powered systems.",
    keyFeatures: [
      "12/24V DC compressor refrigerator — perfect for off-grid and mobile installations",
      "Energy-efficient R600a refrigerant for powerful cooling with lower consumption",
      "Quiet 39 dB operation — great for sleeping areas",
      "Adjustable shelves + spacious interior layout",
      "Durable build for vibration and road conditions",
      "Low power input (80–160W depending on model)",
      "Climate category N-ST — operates reliably in a wide range of temperatures",
      "Fast cooling performance with stable temperature control"
    ],
    models: [
      {
        model: "BD-108",
        voltage: "DC 12/24V",
        power: "100W",
        noise: "39 dB",
        size: "630 × 520 × 795 mm",
        freezer: "108L",
        total: "108L",
        refrigerant: "R600a"
      },
      {
        model: "BD-158",
        voltage: "DC 12/24V",
        power: "120W",
        noise: "39 dB",
        size: "820 × 520 × 795 mm",
        freezer: "158L",
        total: "158L"
      },
      {
        model: "BD-200",
        voltage: "DC 12/24V",
        power: "140W",
        noise: "39 dB",
        size: "860 × 552 × 845 mm",
        freezer: "200L",
        total: "200L"
      },
      {
        model: "BD-300",
        voltage: "DC 12/24V",
        power: "160W",
        noise: "39 dB",
        size: "1080 × 626 × 845 mm",
        freezer: "300L",
        total: "300L"
      }
    ]
  }
};

// Cryonex Products Data
const cryonexProducts = {
  main: {
    id: 'main',
    title: 'Cyronex BC83A 83L 12/24V Compressor Fridge',
    subtitle: 'Premium 83L Dual-Zone Compressor Refrigerator',
    description: 'High-efficiency compressor fridge with freezer compartment • Low power draw • Perfect for off-grid living',
    fullDescription: 'Our Cyronex BC83A Compressor Refrigerator is the top-quality RV fridge, designed for your life on the road. The fridge provides enough space to store your food while taking up minimal space in your campervan.',
    keyFeatures: [
      'Efficient Cooling: Powered by high-performance compressor and R600a refrigerant (22g)',
      'Low Power Draw: Total input power of only 50W, ideal for battery and solar systems',
      '12V/24V Versatility: Operates on 12V or 24V DC, no inverter needed',
      'Dual Fridge/Freezer: Separate compartments for fresh and frozen foods',
      'Locking Latch: Prevents food from falling out while traveling',
      'Smart Interior Design: Adjustable shelves and dedicated chiller compartment'
    ],
    specs: [
      { label: 'Capacity', value: '83 Liters (2.9 cu ft)', icon: <Maximize className="w-3 h-3" /> },
      { label: 'Power', value: '12V / 24V DC', icon: <Zap className="w-3 h-3" /> },
      { label: 'Input Power', value: '50W', icon: <Battery className="w-3 h-3" /> },
      { label: 'Refrigerant', value: 'R600a (22g)', icon: <Snowflake className="w-3 h-3" /> },
      { label: 'Cooling System', value: 'High-efficiency compressor', icon: <Cpu className="w-3 h-3" /> },
      { label: 'Ideal For', value: 'Campervans, RVs, trucks, boats', icon: <Car className="w-3 h-3" /> }
    ],
    price: '$680.00 USD',
    monthly: '$113.33/mo',
    availability: 'in-stock',
    dimensions: 'Compact Van-friendly Design',
    tagline: 'Chill Smarter, Travel Further'
  },
  
  ventilation: {
    id: 'ventilation',
    title: 'Cryonex Roof Ventilation System',
    subtitle: 'Automatic Lift, Reversible Airflow, Low-Noise',
    description: 'Premium ventilation with automatic temperature control • Ultra-quiet operation • Built-in safety features',
    fullDescription: 'Upgrade your custom van build with reliable, high-performance airflow. The Cryonex Roof Ventilation Fan is engineered for off-grid vans, RVs, skoolies, and tiny homes that demand efficient ventilation.',
    keyFeatures: [
      'Powerful Reversible Airflow: Approximately 3,000 m³/h ventilation capacity',
      'Automatic Temperature Mode: Self-regulates from -2°C to 40°C',
      'Ultra-Quiet Operation: As low as 29 dB for peaceful sleep',
      'Smart Safety Protections: Anti-pinch and voltage protection',
      'Remote Control Operation: Easy control from anywhere inside',
      'IPX4 Water-Resistant: Built for all weather conditions'
    ],
    specs: [
      { label: 'Roof Opening', value: '14" x 14" (355 mm)', icon: <Maximize className="w-3 h-3" /> },
      { label: 'Power', value: '24W (20W fan + 4W lighting)', icon: <Zap className="w-3 h-3" /> },
      { label: 'Noise Level', value: '29-53 dB', icon: <Volume2 className="w-3 h-3" /> },
      { label: 'Airflow', value: '3,000 m³/h', icon: <Wind className="w-3 h-3" /> },
      { label: 'Water Resistance', value: 'IPX4 Rating', icon: <Droplets className="w-3 h-3" /> },
      { label: 'Voltage', value: '12V DC (9-16V range)', icon: <Battery className="w-3 h-3" /> }
    ],
    price: '$360.00 USD',
    regularPrice: '$429.00 USD',
    monthly: '$60.00/mo',
    availability: 'in-stock',
    dimensions: '14" x 14" Standard Roof Opening',
    tagline: 'Breathe Easy, Sleep Peacefully'
  },
  
  skylight: {
    id: 'skylight',
    title: 'Premium Skylight Hatch',
    subtitle: 'Panoramic Natural Light & Ventilation Solution',
    description: 'Weather-resistant insulated skylight • Built-in blackout screen • Full 90-degree opening',
    fullDescription: 'Our premium Roof Hatch Skylight is designed to bring natural light, fresh air, and incredible views into your cabin. Features panoramic views with large clear dome and built-in blackout screen.',
    keyFeatures: [
      'Panoramic Views: Large clear dome for sky and star viewing',
      'Built-In Blackout Screen: Blocks harsh sunlight, maintains privacy',
      'Full 90-Degree Opening: Easy rooftop access without external climbing',
      'Secure Internal Lock: Added security for peace of mind',
      'Weather-Resistant: Insulated design for temperature regulation',
      'Natural Ventilation: Improves airflow and reduces condensation'
    ],
    specs: [
      { label: 'External Dimensions', value: '33.5" x 21" (850x530mm)', icon: <Maximize className="w-3 h-3" /> },
      { label: 'Opening Size', value: '26.5" x 14.75" (675x375mm)', icon: <AirVent className="w-3 h-3" /> },
      { label: 'Material', value: 'Polycarbonate Dome + Aluminum Frame', icon: <Shield className="w-3 h-3" /> },
      { label: 'Opening Angle', value: '90 Degrees', icon: <RotateCcw className="w-3 h-3" /> },
      { label: 'Insulation', value: 'Weather-resistant sealed design', icon: <Thermometer className="w-3 h-3" /> },
      { label: 'Installation', value: 'Standard roof mounting', icon: <Wrench className="w-3 h-3" /> }
    ],
    price: 'Contact for Pricing',
    monthly: 'Flexible Payment',
    availability: 'in-stock',
    dimensions: '33.5" x 21" Roof Hatch',
    tagline: 'Open Up to Nature'
  },
  
  series: {
    id: 'series',
    title: 'Compressor Refrigerator Series',
    subtitle: 'High-Efficiency DC Compressor Solutions',
    description: 'Available in 108L, 158L, 200L, 300L capacities • Low noise (39 dB) • R600a refrigerant',
    fullDescription: 'The Cryonex 12/24V Compressor Refrigerator delivers reliable cooling performance for van conversions, RV builds, mobile work trucks, and off-grid living. Designed to run efficiently on DC 12/24V power.',
    models: [
      {
        model: 'BD-108',
        capacity: '108L',
        power: '100W',
        noise: '39 dB',
        dimensions: '630 × 520 × 795 mm'
      },
      {
        model: 'BD-158',
        capacity: '158L',
        power: '120W',
        noise: '39 dB',
        dimensions: '820 × 520 × 795 mm'
      },
      {
        model: 'BD-200',
        capacity: '200L',
        power: '140W',
        noise: '39 dB',
        dimensions: '860 × 552 × 845 mm'
      },
      {
        model: 'BD-300',
        capacity: '300L',
        power: '160W',
        noise: '39 dB',
        dimensions: '1080 × 626 × 845 mm'
      }
    ],
    keyFeatures: [
      '12/24V DC Compressor: Perfect for off-grid and mobile installations',
      'Energy-Efficient R600a Refrigerant: Powerful cooling with lower consumption',
      'Quiet 39 dB Operation: Great for sleeping areas',
      'Adjustable Shelves + Spacious Interior Layout',
      'Durable Build for Vibration and Road Conditions',
      'Climate Category N-ST: Wide temperature range operation'
    ],
    price: 'From $680.00 USD',
    monthly: 'From $113.33/mo',
    availability: 'in-stock',
    tagline: 'Cooling Perfected for Mobile Life'
  }
};

// Related Products
const relatedProducts = [
  {
    title: "Climate Control System",
    description: "Compact rooftop climate unit designed for vanlife. Low power consumption with efficient operation.",
    icon: <ThermometerSun className="w-5 h-5" />,
    gradient: "from-emerald-600/20 to-teal-600/20"
  },
  {
    title: "Heating Solution",
    description: "5kW heating system with remote control. Perfect for cold weather camping and overnight comfort.",
    icon: <ThermometerIcon className="w-5 h-5" />,
    gradient: "from-amber-500/20 to-yellow-500/20"
  },
  {
    title: "Solar Ventilation",
    description: "Solar-powered ventilation with automatic operation. Zero power draw from your battery.",
    icon: <Fan className="w-5 h-5" />,
    gradient: "from-teal-600/20 to-cyan-600/20"
  },
  {
    title: "Thermal Insulation",
    description: "Complete thermal insulation package with acoustic benefits. Easy DIY installation.",
    icon: <CloudSnow className="w-5 h-5" />,
    gradient: "from-gray-700/20 to-slate-700/20"
  },
  {
    title: "Water Heating",
    description: "Instant hot water system for showers and sinks. Compact and energy efficient.",
    icon: <Droplet className="w-5 h-5" />,
    gradient: "from-blue-600/20 to-indigo-600/20"
  },
  {
    title: "Control Panel",
    description: "Smart control system for all components. Touchscreen interface with app control.",
    icon: <Cpu className="w-5 h-5" />,
    gradient: "from-purple-600/20 to-violet-600/20"
  }
];

// Detailed Specifications for the specs box
const detailedSpecs = {
  main: [
    { category: "General", specs: [
      { label: "Model", value: "BC83A" },
      { label: "Type", value: "Compressor Refrigerator" },
      { label: "Capacity", value: "83 Liters (2.9 cu ft)" },
      { label: "Color", value: "Silver / Black" },
      { label: "Weight", value: "28 kg (61.7 lbs)" }
    ]},
    { category: "Electrical", specs: [
      { label: "Voltage", value: "12V / 24V DC" },
      { label: "Power Input", value: "50W" },
      { label: "Current", value: "4.2A @ 12V" },
      { label: "Energy Class", value: "A++" },
      { label: "Refrigerant", value: "R600a (22g)" }
    ]},
    { category: "Dimensions", specs: [
      { label: "External", value: "620 × 530 × 465 mm" },
      { label: "Internal", value: "540 × 460 × 350 mm" },
      { label: "Freezer Capacity", value: "18 Liters" },
      { label: "Fridge Capacity", value: "65 Liters" },
      { label: "Door Swing", value: "180°" }
    ]},
    { category: "Performance", specs: [
      { label: "Temp Range", value: "-18°C to 10°C" },
      { label: "Noise Level", value: "39 dB" },
      { label: "Climate Class", value: "SN / N / ST" },
      { label: "Defrost System", value: "Automatic" },
      { label: "Cool Down Time", value: "< 2 hours" }
    ]}
  ],
  ventilation: [
    { category: "General", specs: [
      { label: "Model", value: "RV-3000" },
      { label: "Type", value: "Roof Ventilation Fan" },
      { label: "Roof Opening", value: '14" x 14" (355 mm)' },
      { label: "Color", value: "White / Black" },
      { label: "Weight", value: "4.5 kg (9.9 lbs)" }
    ]},
    { category: "Electrical", specs: [
      { label: "Voltage", value: "12V DC (9-16V)" },
      { label: "Power", value: "24W (20W fan + 4W light)" },
      { label: "Current", value: "2A @ 12V" },
      { label: "Motor Type", value: "Brushless DC" },
      { label: "Control", value: "Remote + Manual" }
    ]},
    { category: "Performance", specs: [
      { label: "Airflow", value: "3,000 m³/h" },
      { label: "Noise Level", value: "29-53 dB" },
      { label: "Temp Range", value: "-20°C to 60°C" },
      { label: "Fan Speed", value: "3 Levels" },
      { label: "IP Rating", value: "IPX4" }
    ]},
    { category: "Features", specs: [
      { label: "LED Lighting", value: "Yes (4W)" },
      { label: "Mosquito Net", value: "Built-in" },
      { label: "Rain Sensor", value: "Auto-close" },
      { label: "Anti-pinch", value: "Yes" },
      { label: "Remote Control", value: "Included" }
    ]}
  ]
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
};

// NEW: Modern animation effects
const shimmerEffect = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

const pulseGlow = {
  initial: { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
  animate: { 
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0.7)",
      "0 0 0 10px rgba(16, 185, 129, 0)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

const marqueeScroll = {
  animate: {
    x: [0, "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      }
    }
  }
};

const breathingEffect = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotate3D = {
  animate: {
    rotateY: [0, 180, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        duration: 5,
        ease: "linear"
      }
    }
  }
};

// NEW: Animated cursor effect
const cursorVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.1 } }
};

// NEW: Additional aesthetic animations
const rippleEffect = {
  initial: { scale: 0, opacity: 1 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const waveAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const particleFloat = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const neonGlow = {
  initial: { filter: "drop-shadow(0 0 0px rgba(16, 185, 129, 0))" },
  animate: {
    filter: [
      "drop-shadow(0 0 0px rgba(16, 185, 129, 0))",
      "drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))",
      "drop-shadow(0 0 0px rgba(16, 185, 129, 0))"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// NEW: DNA helix animation for tech elements
const dnaHelix = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// NEW: Floating text animation
const floatingText = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function CryonexPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPurchasingPower, setShowPurchasingPower] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeSection, setActiveSection] = useState('main');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(cryonexProducts.main);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showDetailedSpecs, setShowDetailedSpecs] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const [particleCount, setParticleCount] = useState(40);
  const [ripplePoints, setRipplePoints] = useState([]);
  const [activeRipples, setActiveRipples] = useState([]);
  
  const videoRefs = useRef([]);
  const totalImages = productImages.length;

  // NEW: Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // NEW: Generate interactive particles
  const generateParticles = () => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1
    }));
  };

  // NEW: Ripple effect on click
  const handleRippleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setActiveRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setActiveRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  };

  const [particles] = useState(generateParticles());

  // NEW: Advanced particles for DNA helix effect
  const [dnaParticles] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      angle: (i / 20) * Math.PI * 2,
      radius: 100,
      height: i * 20,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.3
    }))
  );

  // Generate video thumbnails from videos
  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnails = {};
      for (const video of installationVideos) {
        try {
          // Skip Google Drive video for thumbnail generation
          if (video.id === 1) continue;
          
          const videoEl = document.createElement('video');
          videoEl.src = video.video;
          videoEl.crossOrigin = 'anonymous';
          
          videoEl.addEventListener('loadeddata', () => {
            videoEl.currentTime = 1; // Capture frame at 1 second
          });
          
          videoEl.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = videoEl.videoWidth;
            canvas.height = videoEl.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            thumbnails[video.id] = canvas.toDataURL('image/jpeg');
            setVideoThumbnails({...thumbnails});
          });
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }
    };
    
    generateThumbnails();
  }, []);

  // Auto-play image slider
  useEffect(() => {
    if (!isAutoPlaying || totalImages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalImages]);

  // Handle video play/pause
  useEffect(() => {
    if (activeVideo !== null && videoRefs.current[activeVideo]) {
      if (videoPlaying) {
        videoRefs.current[activeVideo].play();
      } else {
        videoRefs.current[activeVideo].pause();
      }
    }
  }, [videoPlaying, activeVideo]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    // NEW: Add glow effect on navigation
    setGlowEffect(true);
    setTimeout(() => setGlowEffect(false), 1000);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(cryonexProducts[productId]);
    setActiveSection(productId);
    handleScrollTo('product-showcase');
  };

  const handleVideoClick = (videoId) => {
    if (activeVideo === videoId) {
      setVideoPlaying(!videoPlaying);
    } else {
      setActiveVideo(videoId);
      setVideoPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
  };

  const handleVideoClose = () => {
    setActiveVideo(null);
    setVideoPlaying(false);
    if (videoRefs.current[activeVideo]) {
      videoRefs.current[activeVideo].pause();
      videoRefs.current[activeVideo].currentTime = 0;
    }
  };

  // Navigation items based on sections
  const navItems = [
    { id: 'product-showcase', label: 'Products', icon: <Snowflake className="w-3 h-3" /> },
    { id: 'specifications', label: 'Specifications', icon: <Cpu className="w-3 h-3" /> },
    { id: 'installation', label: 'Installation', icon: <Wrench className="w-3 h-3" /> },
    { id: 'collection', label: 'Collection', icon: <Package className="w-3 h-3" /> }
  ];

  const getCurrentProductDetails = () => {
    return productDetails[selectedProduct.id] || productDetails.main;
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-sans overflow-x-hidden relative">
      
      {/* NEW: Custom Cursor Effect - Desktop Only */}
{typeof window !== 'undefined' && window.innerWidth >= 768 && (
  <AnimatePresence>
    {isCursorVisible && (
      <motion.div
        variants={cursorVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-6 border-2 border-emerald-400/70 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1.4, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-6 h-6 border-2 border-teal-400/50 rounded-full"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)}

      {/* NEW: Enhanced Geometric Pattern Background with interactive particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, rgba(4, 120, 87, 0.03) 0%, transparent 50%)`,
          }} />
        </div>
        
        {/* NEW: DNA Helix Animation - Tech aesthetic */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40">
          {dnaParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={dnaHelix.animate}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(particle.angle) * particle.radius}px)`,
                top: `calc(50% + ${particle.height}px)`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, rgba(16, 185, 129, ${0.3 + Math.sin(particle.angle) * 0.2}) 0%, rgba(5, 150, 105, 0.1) 100%)`,
                borderRadius: '50%',
                filter: 'blur(1px)',
                willChange: 'transform'
              }}
            />
          ))}
        </div>
        
        {/* Interactive Particles - Optimized for mobile */}
{typeof window !== 'undefined' && window.innerWidth >= 768 && (
  <>
    {particles.slice(0, 20).map((particle) => (
      <motion.div
        key={particle.id}
        className="absolute hidden md:block"
        initial={{
          x: `${particle.x}vw`,
          y: `${particle.y}vh`,
          opacity: particle.opacity
        }}
        animate={{
          x: `${particle.x + Math.sin(particle.id * 0.1) * 10}vw`,
          y: `${particle.y + Math.cos(particle.id * 0.1) * 10}vh`,
          opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
        }}
        transition={{
          duration: particle.speed * 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          background: `radial-gradient(circle, rgba(16, 185, 129, ${particle.opacity}) 0%, transparent 70%)`,
          filter: 'blur(0.5px)',
        }}
      />
    ))}
  </>
)}
       {/* NEW: Floating Geometric Shapes - Desktop Only */}
{typeof window !== 'undefined' && window.innerWidth >= 768 && (
  <>
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={`shape-${i}`}
        className="absolute hidden md:block"
        animate={particleFloat.animate}
        style={{
          left: `${15 + i * 20}%`,
          top: `${20 + i * 15}%`,
          width: '30px',
          height: '30px',
          background: `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))`,
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: i % 2 === 0 ? '50%' : '4px',
          filter: 'blur(0.5px)',
        }}
      />
    ))}
  </>
)}
        
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10" />
          <motion.div
            animate={gradientShift.animate}
            style={{
              background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1), rgba(14, 165, 233, 0.1))',
              backgroundSize: '400% 400%',
            }}
            className="absolute inset-0"
          />
        </div>
        
        {/* Subtle Grid with Animation */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* NEW: Animated Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20 + ring * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute border border-emerald-500/10 rounded-full"
              style={{
                width: `${ring * 30}%`,
                height: `${ring * 30}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* NEW: Glow Effect Overlay */}
      <AnimatePresence>
        {glowEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              mixBlendMode: 'screen'
            }}
          />
        )}
      </AnimatePresence>

      {/* NEW: Ripple Effects Container */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {activeRipples.map((ripple) => (
            <motion.div
              key={ripple.id}
              variants={rippleEffect}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              className="absolute rounded-full border border-emerald-400/30"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: '20px',
                height: '20px',
                marginLeft: '-10px',
                marginTop: '-10px',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Bar - Enhanced with glow */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-4 py-3 backdrop-blur-xl bg-gradient-to-b from-gray-800/95 to-gray-900/90 border-b border-white/5 shadow-2xl shadow-emerald-500/5"
      >
        <motion.div 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div 
            animate={rotate3D.animate}
            className="relative"
          >
            <div className="relative w-8 h-8 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Snowflake className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #0d9488 50%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em'
              }}
            >
              CRYONEX
            </motion.h1>
            <p className="text-[10px] text-gray-400 -mt-0.5 tracking-widest">CLIMATE SYSTEMS</p>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                handleScrollTo(item.id);
                handleRippleClick(e);
              }}
              className={`relative px-2 py-1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-xs flex items-center gap-1 ${
                activeSection === item.id ? 'text-white' : ''
              }`}
            >
              {item.icon}
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleExternalLink(EXTERNAL_URLS.shopAllProducts);
              handleRippleClick(e);
            }}
            className="relative px-2 py-1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-xs flex items-center gap-1"
          >
            <ShoppingCart className="w-3 h-3" />
            Shop
          </motion.button>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleExternalLink(EXTERNAL_URLS.shopAllProducts);
              handleRippleClick(e);
            }}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 group relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              variants={shimmerEffect}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform relative z-10" />
            <span className="relative z-10">Shop Now</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 shadow-lg"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 bg-gradient-to-b from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => { handleScrollTo(item.id); setIsMenuOpen(false); }}
                    className="text-left py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-teal-900/30 transition-all uppercase tracking-wider text-sm border border-white/5 hover:border-emerald-500/30 group flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => { handleExternalLink(EXTERNAL_URLS.shopAllProducts); setIsMenuOpen(false); }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-lg font-bold mt-1 text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <motion.div
                    variants={shimmerEffect}
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  <ShoppingCart className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Shop Now</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

     {/* Hero Section - Enhanced with taller mobile height */}
<section className="relative min-h-[85vh] md:min-h-[98vh] flex items-center justify-center overflow-hidden pt-16 px-4">
  {/* Background with professional image */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 via-gray-900/10 to-gray-800/10 z-10" />
    
    {/* Professional Hero Image - Optimized for mobile height */}
    <motion.div 
      className="absolute inset-0"
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <img 
        src={productImages[2]}  
        alt="Cryonex Climate Systems"
        className="w-full h-full object-cover object-center brightness-[0.6] md:brightness-[0.6]"
        loading="eager"
        style={{ 
          objectPosition: 'center 30%',
          height: '100%',
          width: '100%'
        }}
      />
    </motion.div>
    
    {/* Enhanced Gradient Overlay for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/30 z-20 md:from-gray-900/70 md:via-gray-900/40 md:to-gray-900/70" />
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-gray-900/50 z-20 md:from-gray-900/50 md:via-transparent md:to-gray-900/60" />
    
    {/* Side gradient overlays for better focus */}
    <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-900/60 to-transparent z-20" />
    <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-900/60 to-transparent z-20" />
    
    {/* NEW: Floating Tech Elements - Desktop Only */}
    {typeof window !== 'undefined' && window.innerWidth >= 1024 && (
      <>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute z-30 hidden lg:block"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * 100 + 'vh'],
              rotate: [null, 360],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '24px',
              height: '24px',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-400/30">
              {i % 3 === 0 ? (
                <Snowflake className="w-3 h-3 text-emerald-300" />
              ) : i % 3 === 1 ? (
                <Zap className="w-3 h-3 text-cyan-300" />
              ) : (
                <Cpu className="w-3 h-3 text-teal-300" />
              )}
            </div>
          </motion.div>
        ))}
      </>
    )}
  </div>

  {/* Hero Content - Optimized for mobile */}
  <div className="relative z-40 w-full max-w-6xl mx-auto px-4 md:px-6">
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="text-center"
    >
      {/* Premium Badge with Pulse Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border border-emerald-400/40 backdrop-blur-xl text-white font-bold tracking-[0.1em] text-xs uppercase mb-6 md:mb-8 shadow-xl group relative overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          variants={shimmerEffect}
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Snowflake className="w-3 h-3 text-white relative z-10" />
        </motion.div>
        <span className="text-white font-bold drop-shadow-lg relative z-10">
          Professional Climate Solutions
        </span>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Award className="w-3 h-3 text-white relative z-10" />
        </motion.div>
      </motion.div>
      
      {/* Main Title with Enhanced Gradient - Mobile Optimized */}
      <div className="relative mb-4 md:mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight px-2 md:px-4 font-serif"
        >
          <span className="relative block mb-2 md:mb-3">
            <span className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              CRYONEX
            </span>
          </span>
          <span className="text-xl md:text-3xl lg:text-4xl text-white font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] font-sans block leading-tight">
            CLIMATE CONTROL SYSTEMS
          </span>
        </motion.h1>
      </div>
      
      {/* Subtitle with Enhanced Effects */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4 md:mb-6"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <motion.span 
            animate={floatingText.animate}
            className="text-sm md:text-base lg:text-lg text-white font-medium tracking-wide px-1 md:px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans"
          >
            Professional Climate Solutions
          </motion.span>
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] font-medium font-sans block"
        >
          For Mobile Living
        </motion.span>
      </motion.div>
      
      {/* Description with Breathing Effect */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        variants={breathingEffect}
        className="text-sm md:text-base text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-3 md:px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] font-medium font-sans"
      >
        Premium refrigeration, ventilation, and climate systems engineered for exceptional performance in mobile environments.
      </motion.p>
      
      {/* CTA Buttons with Enhanced Effects */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2 md:px-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            handleScrollTo('product-showcase');
            handleRippleClick(e);
          }}
          className="group relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white px-5 md:px-6 py-3 md:py-3.5 rounded-xl text-sm font-bold hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 overflow-hidden border border-emerald-400 shadow-2xl w-full sm:w-auto font-sans"
        >
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/10 to-cyan-500/0"
            animate={{ 
              x: ['-100%', '100%']
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulse Effect */}
          <motion.div
            variants={pulseGlow}
            animate="animate"
            className="absolute inset-0 rounded-xl"
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ThermometerSun className="w-4 h-4" />
            <span className="font-bold">Explore Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            handleScrollTo('installation');
            handleRippleClick(e);
          }}
          className="group relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-lg border border-white/30 text-white px-5 md:px-6 py-3 md:py-3.5 rounded-xl text-sm font-bold hover:border-emerald-400/60 hover:bg-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 shadow-lg w-full sm:w-auto font-sans"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Video className="w-4 h-4" />
            <span className="font-bold">View Installation</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  </div>

  
</section>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        
        {/* Product Showcase - Fixed for Mobile */}
        <div id="product-showcase" className="w-full overflow-x-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 mb-16 md:mb-20 w-full max-w-full">
            {/* Image Gallery - Fixed for Mobile */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              className="w-full space-y-6 overflow-visible"
            >
              {/* Main Image Container - Fixed for Mobile */}
              <motion.div 
                variants={floatAnimation}
                className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-2xl group mx-auto max-w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover="hover"
                variants={{
                  hover: { 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }
                }}
                onClick={handleRippleClick}
              >
                <motion.img 
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt={`Cryonex ${selectedProduct.title}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: isHovering ? 1.02 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Enhanced Navigation Buttons - Fixed positioning for mobile */}
                {totalImages > 1 && (
                  <>
                    <motion.button 
                      onClick={(e) => {
                        prevImage();
                        handleRippleClick(e);
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-emerald-500/50 transition-all shadow-2xl group z-20"
                    >
                      <motion.div
                        whileHover={{ x: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronLeft className="w-4 h-4 text-emerald-300" />
                      </motion.div>
                    </motion.button>
                    
                    <motion.button 
                      onClick={(e) => {
                        nextImage();
                        handleRippleClick(e);
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(5, 150, 105, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-teal-500/50 transition-all shadow-2xl group z-20"
                    >
                      <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-teal-300" />
                      </motion.div>
                    </motion.button>
                    
                    {/* Auto-play Toggle */}
                    <motion.button 
                      onClick={(e) => {
                        setIsAutoPlaying(!isAutoPlaying);
                        handleRippleClick(e);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-emerald-500/50 transition-all shadow-lg group z-20"
                      title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                      {isAutoPlaying ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Pause className="w-3 h-3 text-emerald-300" />
                        </motion.div>
                      ) : (
                        <Play className="w-3 h-3 text-emerald-300" />
                      )}
                    </motion.button>
                    
                    {/* Image Counter */}
                    <motion.div 
                      className="absolute top-3 left-3 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl px-2 py-1 rounded-lg border border-white/20 shadow-lg z-20"
                    >
                      <p className="text-xs font-medium text-emerald-300">
                        {currentImageIndex + 1} / {totalImages}
                      </p>
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Thumbnail Strip - Fixed for mobile scrolling */}
              {totalImages > 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-full overflow-x-auto pb-2 px-1 -mx-1"
                >
                  <div className="flex gap-2 min-w-max px-1">
                    {productImages.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={(e) => {
                          setCurrentImageIndex(index);
                          handleRippleClick(e);
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border transition-all relative group ${
                          index === currentImageIndex 
                            ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/20' 
                            : 'border-white/10 hover:border-emerald-400/40'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Specifications Box - Fixed width for mobile */}
              <motion.div 
                id="specifications"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-white/10 p-4 md:p-6 backdrop-blur-sm shadow-xl mx-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Technical Specifications
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      setShowDetailedSpecs(!showDetailedSpecs);
                      handleRippleClick(e);
                    }}
                    className="flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
                  >
                    {showDetailedSpecs ? (
                      <>
                        <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                        Show More
                      </>
                    )}
                  </motion.button>
                </div>
                
                {/* Compact Specs View */}
                <div className="space-y-3">
                  {selectedProduct.specs.slice(0, 4).map((spec, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group/item cursor-pointer"
                      onClick={handleRippleClick}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="p-1.5 rounded-md bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 text-emerald-300 flex-shrink-0"
                        >
                          {spec.icon}
                        </motion.div>
                        <div className="text-gray-400 text-sm font-sans group-hover/item:text-white transition-colors truncate">
                          {spec.label}
                        </div>
                      </div>
                      <div className="text-white font-semibold text-sm font-sans ml-2 flex-shrink-0">
                        {spec.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Detailed Specifications View */}
                <AnimatePresence>
                  {showDetailedSpecs && detailedSpecs[selectedProduct.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        {detailedSpecs[selectedProduct.id].map((category, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="space-y-2"
                          >
                            <h4 className="text-sm font-bold text-emerald-400 font-serif">
                              {category.category}
                            </h4>
                            <div className="space-y-1.5">
                              {category.specs.map((spec, specIndex) => (
                                <motion.div 
                                  key={specIndex}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: specIndex * 0.05 }}
                                  whileHover={{ x: 3 }}
                                  className="flex justify-between items-center py-1.5 px-2 rounded bg-gradient-to-r from-gray-800/30 to-gray-900/30 hover:from-gray-800/50 hover:to-gray-900/50 transition-colors cursor-pointer"
                                  onClick={handleRippleClick}
                                >
                                  <span className="text-gray-400 text-xs font-sans truncate mr-2">
                                    {spec.label}
                                  </span>
                                  <span className="text-white text-xs font-semibold font-sans flex-shrink-0">
                                    {spec.value}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Download Specs Button */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            handleRippleClick(e);
                            // Download functionality here
                          }}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-600/30 transition-colors group"
                        >
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Download className="w-3 h-3" />
                          </motion.div>
                          Download Full Specifications (PDF)
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            {/* Product Details - Fixed for mobile */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full space-y-8 px-0 md:px-0"
            >
              {/* Product Header */}
              <div className="w-full">
                <motion.div 
                  className="flex items-center gap-2 mb-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="p-1.5 rounded-md bg-gradient-to-br from-emerald-600/20 to-teal-600/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Snowflake className="w-4 h-4 text-emerald-300" />
                  </motion.div>
                  <span className="text-sm text-emerald-400 uppercase tracking-wider">Premium System</span>
                </motion.div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif w-full">
                  {selectedProduct.title}
                </h2>
                
                <motion.p 
                  className="text-gray-300 text-sm mb-4 font-sans w-full"
                  variants={breathingEffect}
                  animate="animate"
                >
                  {selectedProduct.subtitle}
                </motion.p>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-600/20 to-emerald-600/20 border border-teal-500/30 text-teal-300 text-sm font-sans"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-3 h-3" />
                  </motion.div>
                  {selectedProduct.availability === 'in-stock' ? 'In Stock' : 'Sold Out'}
                </motion.div>
              </div>
              
              {/* Price & Financing - Fixed layout for mobile */}
              <div className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 uppercase tracking-wider mb-1 font-sans">Price</div>
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold text-white mb-1 font-serif"
                      whileHover={{ scale: 1.02 }}
                    >
                      {selectedProduct.price}
                    </motion.div>
                    {selectedProduct.regularPrice && (
                      <div className="text-lg text-gray-400 line-through font-sans">
                        {selectedProduct.regularPrice}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-gray-400 text-sm flex items-center gap-1.5 font-sans">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <TruckIcon className="w-4 h-4" />
                  </motion.div>
                  Shipping calculated at checkout.
                </div>
                
                <div className="flex items-center gap-2 group w-full">
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-300" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-emerald-400 font-sans truncate">
                      From {selectedProduct.monthly} with
                    </div>
                    <motion.button
                      onClick={(e) => {
                        setShowPurchasingPower(!showPurchasingPower);
                        handleRippleClick(e);
                      }}
                      className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors font-sans flex items-center gap-1 group w-full"
                    >
                      <span className="truncate">Check your purchasing power</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Purchasing Power Section - Fixed width */}
              {showPurchasingPower && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="w-full p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-white/10 backdrop-blur-sm space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm font-sans">Your purchasing power is</h4>
                    <div className="px-2 py-0.5 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded border border-emerald-500/30 text-emerald-300 text-sm font-sans">
                      See plans
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-gray-800/30 to-gray-900/30"
                      onClick={handleRippleClick}
                    >
                      <span className="text-gray-300 text-sm font-sans">Monthly Payment</span>
                      <span className="font-bold text-white text-lg font-serif">{selectedProduct.monthly}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
                      onClick={handleRippleClick}
                    >
                      <span className="text-gray-300 text-sm font-sans">Term</span>
                      <span className="font-bold text-emerald-300 text-base font-serif">12 months</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-gray-800/30 to-gray-900/30"
                      onClick={handleRippleClick}
                    >
                      <span className="text-gray-300 text-sm font-sans">Total</span>
                      <span className="font-bold text-white font-serif">{selectedProduct.price}</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Enhanced Key Features - Fixed for mobile */}
              <div className="space-y-4 w-full">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                  Key Features
                </h3>
                <div className="space-y-3">
                  {selectedProduct.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-white/10 group hover:border-emerald-500/30 transition-all cursor-pointer w-full"
                      onClick={handleRippleClick}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div 
                          className="p-2 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex-shrink-0"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <span className="text-gray-300 text-sm break-words font-sans group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* For Series - Show Models - Fixed grid for mobile */}
              {selectedProduct.id === 'series' && selectedProduct.models && (
                <div className="space-y-4 w-full">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Maximize className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                    Available Models
                  </h3>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {selectedProduct.models.map((model, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-white/10 text-center cursor-pointer w-full"
                        onClick={handleRippleClick}
                      >
                        <div className="text-lg font-bold text-emerald-300 mb-1 font-serif truncate">
                          {model.model}
                        </div>
                        <div className="text-sm text-white font-sans truncate">{model.capacity}</div>
                        <div className="text-xs text-gray-400 mt-1 font-sans truncate">
                          {model.power} • {model.noise}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Enhanced Quantity & CTA - Fixed for mobile */}
              <div className="space-y-6 pt-6 border-t border-white/10 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white font-serif">Quantity</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 font-sans">Total</div>
                    <div className="text-xl font-bold text-white font-serif">
                      {selectedProduct.price !== 'Contact for Pricing' 
                        ? selectedProduct.price.replace('From ', '') 
                        : 'Contact for Quote'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-3 border border-white/10 w-full">
                  <div className="flex items-center gap-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-1.5 border border-white/10">
                    <motion.button 
                      onClick={(e) => {
                        setQuantity(Math.max(1, quantity - 1));
                        handleRippleClick(e);
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.3)' }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-emerald-900/30 active:bg-emerald-900/50 transition-colors text-emerald-300"
                    >
                      <Minus className="w-3 h-3" />
                    </motion.button>
                    <motion.span 
                      key={quantity}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring" }}
                      className="w-8 text-center text-base font-bold text-white"
                    >
                      {quantity}
                    </motion.span>
                    <motion.button 
                      onClick={(e) => {
                        setQuantity(quantity + 1);
                        handleRippleClick(e);
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(5, 150, 105, 0.3)' }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-teal-900/30 active:bg-teal-900/50 transition-colors text-teal-300"
                    >
                      <Plus className="w-3 h-3" />
                    </motion.button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400 font-sans">Per Unit</div>
                    <div className="text-base font-bold text-white font-serif">{selectedProduct.price}</div>
                  </div>
                </div>
                
                {/* Enhanced CTA Buttons - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      handleExternalLink(EXTERNAL_URLS.bc83aProduct);
                      handleRippleClick(e);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 font-sans flex items-center justify-center gap-2 w-full sm:w-auto sm:flex-1 relative overflow-hidden"
                  >
                    <motion.div
                      variants={shimmerEffect}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    <ShoppingCart className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Add to Cart</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      handleExternalLink(EXTERNAL_URLS.buyNow);
                      handleRippleClick(e);
                    }}
                    className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-white/20 text-white px-5 py-3 rounded-xl text-sm font-medium hover:border-emerald-500/40 transition-all duration-300 font-sans flex items-center justify-center gap-2 w-full sm:w-auto sm:flex-1"
                  >
                    <CreditCard className="w-4 h-4" />
                    Buy Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      setShowLearnMore(true);
                      handleRippleClick(e);
                    }}
                    className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 text-emerald-300 px-5 py-3 rounded-xl text-sm font-medium hover:border-emerald-400/50 hover:text-emerald-200 transition-all duration-300 font-sans flex items-center justify-center gap-2 w-full sm:w-full relative overflow-hidden"
                  >
                    <motion.div
                      variants={shimmerEffect}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                    />
                    <Info className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Learn More</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Installation Section - Enhanced */}
        <section id="installation" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            
            <motion.div 
              className="inline-flex items-center gap-3 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <Wrench className="w-5 h-5 text-emerald-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </motion.div>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4 font-serif"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #10b981 0%, #0d9488 50%, #14b8a6 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Professional Installation Guides
            </motion.h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto px-2 font-sans">
              Step-by-step video tutorials and comprehensive guides for easy installation
            </p>
          </motion.div>
          
          {/* Enhanced Video Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {installationVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-gray-800/30 rounded-xl border border-white/10 hover:border-emerald-500/30 overflow-hidden transition-all duration-300 shadow-xl"
                onClick={handleRippleClick}
              >
                {/* Video Player or Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                 {activeVideo === video.id ? (
  <div className="relative w-full h-full">
    {video.id === 1 ? (
      // Google Drive video iframe - optimized for mobile
      <iframe
        src={`https://drive.google.com/file/d/1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-/preview`}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={video.title}
        loading="lazy"
        style={{ maxHeight: '400px' }}
      />
    ) : (
      // Regular video element - use mobile optimized version
      <video
        ref={el => videoRefs.current[video.id] = el}
        src={typeof window !== 'undefined' && window.innerWidth < 768 ? 
          (video.mobileVideo || video.video) : video.video}
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
        controls={videoPlaying}
        poster={videoThumbnails[video.id]}
        style={{ maxHeight: '400px' }}
        playsInline
        preload="metadata"
      />
    )}
  </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      {/* Video Thumbnail with generated preview */}
                      <div className="absolute inset-0">
                        {video.id === 1 ? (
                          // Use Google Drive thumbnail for first video
                          <img
                            src="https://drive.google.com/thumbnail?id=1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-&sz=w1000"
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if thumbnail fails to load
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : videoThumbnails[video.id] ? (
                          <img
                            src={videoThumbnails[video.id]}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                handleVideoClick(video.id);
                                handleRippleClick(e);
                              }}
                              className="absolute inset-0"
                            />
                          </div>
                          <div className="mt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                              <Clock className="w-3 h-3" />
                              <span className="text-sm">{video.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            handleVideoClick(video.id);
                            handleRippleClick(e);
                          }}
                          className="p-4 rounded-full bg-gradient-to-r from-emerald-600/90 to-teal-500/90 backdrop-blur-sm hover:from-emerald-700 hover:to-teal-600 transition-all shadow-2xl relative overflow-hidden"
                        >
                          <motion.div
                            variants={pulseGlow}
                            animate="animate"
                            className="absolute inset-0 rounded-full"
                          />
                          <Play className="w-8 h-8 text-white relative z-10" fill="white" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Video Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white font-serif">{video.title}</h3>
                    {activeVideo === video.id && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => {
                          handleVideoClose();
                          handleRippleClick(e);
                        }}
                        className="p-1.5 rounded-lg bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 hover:border-red-500/50 transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                      </motion.button>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-sans">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs">
                        <Video className="w-3 h-3" />
                        <span>HD Video</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-cyan-300 text-xs">
                        <Volume2 className="w-3 h-3" />
                        <span>Audio Guide</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          handleVideoClick(video.id);
                          handleRippleClick(e);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium relative overflow-hidden ${
                          activeVideo === video.id && videoPlaying
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                            : 'bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 text-gray-300 hover:text-white'
                        } transition-all`}
                      >
                        <motion.div
                          variants={shimmerEffect}
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        />
                        <span className="relative z-10">
                          {activeVideo === video.id && videoPlaying ? 'Playing...' : 'Watch Now'}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Installation Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-white/10 p-6 backdrop-blur-sm shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileText className="w-5 h-5" />,
                  title: "Installation Manual",
                  description: "Detailed PDF guide with diagrams and measurements",
                  action: "Download PDF",
                  color: "from-blue-600/20 to-indigo-600/20"
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: "Wiring Diagrams",
                  description: "Complete electrical schematics and connection guides",
                  action: "View Diagrams",
                  color: "from-purple-600/20 to-violet-600/20"
                },
                {
                  icon: <Headphones className="w-5 h-5" />,
                  title: "Technical Support",
                  description: "24/7 expert assistance for installation questions",
                  action: "Contact Support",
                  color: "from-emerald-600/20 to-teal-600/20"
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className={`p-4 rounded-lg bg-gradient-to-br ${resource.color} border border-white/10 hover:border-white/30 transition-all cursor-pointer`}
                  onClick={handleRippleClick}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className={`p-2 rounded-lg bg-gradient-to-br ${resource.color} border border-white/20`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {resource.icon}
                    </motion.div>
                    <h4 className="font-bold text-white text-sm font-serif">{resource.title}</h4>
                  </div>
                  <p className="text-gray-300 text-xs mb-4 font-sans">{resource.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.03, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Resource action here
                    }}
                    className="text-emerald-300 text-xs font-medium hover:text-emerald-200 transition-colors flex items-center gap-1"
                  >
                    {resource.action}
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div 
              className="inline-flex items-center gap-3 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </motion.div>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4 font-serif"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #10b981 0%, #0d9488 50%, #14b8a6 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Advanced Climate Technology
            </motion.h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto px-2 font-sans">
              Engineered for superior performance in mobile environments
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Energy Efficient",
                description: "Low power draw perfect for solar and battery systems",
                icon: <Zap className="w-5 h-5" />,
                gradient: "from-emerald-600/20 to-cyan-600/20",
                delay: 0.1
              },
              {
                title: "Quiet Operation",
                description: "Designed for peaceful vanlife and stealth camping",
                icon: <Volume2 className="w-5 h-5" />,
                gradient: "from-teal-600/20 to-emerald-600/20",
                delay: 0.2
              },
              {
                title: "Durable Construction",
                description: "Built to withstand road vibrations and weather",
                icon: <Shield className="w-5 h-5" />,
                gradient: "from-cyan-600/20 to-blue-600/20",
                delay: 0.3
              },
              {
                title: "Easy Installation",
                description: "Designed for DIY and professional installations",
                icon: <Wrench className="w-5 h-5" />,
                gradient: "from-gray-700/20 to-slate-700/20",
                delay: 0.4
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: benefit.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`group relative p-5 bg-gradient-to-br ${benefit.gradient} via-gray-900/40 to-gray-800/30 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-xl`}
                onClick={handleRippleClick}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
                
                {/* Shimmer Effect */}
                <motion.div
                  variants={shimmerEffect}
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${benefit.gradient} border border-white/20 group-hover:border-white/40 transition-colors relative overflow-hidden`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        variants={shimmerEffect}
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      />
                      <div className="text-white relative z-10">
                        {benefit.icon}
                      </div>
                    </motion.div>
                    <div className="text-base font-bold text-white font-serif">{benefit.title}</div>
                  </div>
                  <p className="text-gray-200 text-sm group-hover:text-white transition-colors leading-relaxed font-sans">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced Related Products Section */}
        <section id="collection" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Complete Climate System
              </span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto px-2 font-sans">
              Explore our collection of premium climate control solutions for mobile living
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-4 bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-gray-800/30 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden shadow-lg"
                onClick={handleRippleClick}
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Enhanced Icon */}
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10 mb-4 inline-flex relative overflow-hidden`}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    variants={shimmerEffect}
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  <div className="text-white relative z-10">
                    {item.icon}
                  </div>
                </motion.div>
                
                {/* Enhanced Content */}
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-white mb-3 line-clamp-2 font-serif">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 group-hover:text-white transition-colors line-clamp-2 font-sans">
                    {item.description}
                  </p>
                  
                  <motion.button
                    onClick={(e) => {
                      setShowLearnMore(true);
                      handleRippleClick(e);
                    }}
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-1.5 text-emerald-300 text-sm font-medium hover:text-emerald-200 transition-colors font-sans"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                handleExternalLink(EXTERNAL_URLS.shopAllProducts);
                handleRippleClick(e);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 shadow-xl font-sans relative overflow-hidden"
            >
              <motion.div
                variants={shimmerEffect}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              <ShoppingCart className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Shop all products</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </motion.div>
        </section>

        {/* Enhanced Installation Support */}
        <section className="mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative p-6 md:p-8 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-gray-900/40 to-teal-900/20" />
            
            {/* Animated Gradient Background */}
            <motion.div
              animate={gradientShift.animate}
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1), rgba(14, 165, 233, 0.1))',
                backgroundSize: '400% 400%',
              }}
            />
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-serif">
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                      Professional Installation Support
                    </span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed font-sans">
                    Our climate systems are designed for both DIY enthusiasts and professional installers. 
                    Each product comes with detailed installation guides, and our team is available 
                    for technical support and professional installation services.
                  </p>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="p-2 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Wrench className="w-4 h-4 text-emerald-300" />
                      </motion.div>
                      <div>
                        <div className="text-white font-semibold text-sm font-serif">DIY Installation Guides</div>
                        <div className="text-gray-400 text-xs font-sans">Step-by-step video tutorials</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/20 to-emerald-600/20"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Phone className="w-4 h-4 text-cyan-300" />
                      </motion.div>
                      <div>
                        <div className="text-white font-semibold text-sm font-serif">Technical Support</div>
                        <div className="text-gray-400 text-xs font-sans">Expert advice when you need it</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      handleExternalLink(EXTERNAL_URLS.contact);
                      handleRippleClick(e);
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 font-sans relative overflow-hidden"
                  >
                    <motion.div
                      variants={shimmerEffect}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    <Phone className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Get Installation Help</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Final CTA */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-8 rounded-2xl overflow-hidden mb-16 group shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-gray-900/40 to-teal-900/20" />
          
          {/* Animated Gradient Background */}
          <motion.div
            animate={gradientShift.animate}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15), rgba(14, 165, 233, 0.15))',
              backgroundSize: '400% 400%',
            }}
          />
          
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6 font-serif"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #10b981 0%, #0d9488 50%, #14b8a6 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Experience Perfect Climate Control
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-sm mb-8 max-w-2xl mx-auto leading-relaxed px-2 font-sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              variants={breathingEffect}
              animate="animate"
            >
              From climate regulation to ventilation, Cryonex delivers professional-grade climate solutions 
              engineered for the demands of mobile living. Experience comfort in every climate.
            </motion.p>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  handleExternalLink(EXTERNAL_URLS.shopAllProducts);
                  handleRippleClick(e);
                }}
                className="group relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 overflow-hidden border border-emerald-500/30 shadow-xl font-sans"
              >
                {/* Animated Background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/10 to-cyan-500/0"
                  animate={{ 
                    x: ['-100%', '100%']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Pulse Effect */}
                <motion.div
                  variants={pulseGlow}
                  animate="animate"
                  className="absolute inset-0 rounded-xl"
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Snowflake className="w-4 h-4" />
                  Shop all products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  handleExternalLink(EXTERNAL_URLS.contact);
                  handleRippleClick(e);
                }}
                className="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium hover:border-emerald-500/40 transition-all duration-300 font-sans"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Climate Expert
                </span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Enhanced Learn More Modal */}
      <AnimatePresence>
        {showLearnMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg overflow-y-auto"
            onClick={() => setShowLearnMore(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/20 max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Info className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      {getCurrentProductDetails().title}
                    </h3>
                    <p className="text-gray-300 text-xs font-sans">Product Details & Specifications</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-lg bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 hover:border-red-500/50 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                </motion.button>
              </div>
              
              {/* Modal Content */}
              <div className="p-5 md:p-6 space-y-6">
                {/* Product Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-white font-serif">
                        {getCurrentProductDetails().title}
                      </div>
                      {getCurrentProductDetails().price && (
                        <div className="text-lg font-bold text-emerald-400 mt-1 font-serif">
                          {getCurrentProductDetails().price}
                          {getCurrentProductDetails().salePrice && (
                            <span className="text-gray-400 line-through ml-2 text-sm">
                              {getCurrentProductDetails().salePrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CreditCard className="w-3 h-3 text-emerald-300" />
                      </motion.div>
                      <div>
                        <div className="text-xs font-bold text-emerald-400 font-sans">
                          From {selectedProduct.monthly} with
                        </div>
                        <div className="text-xs text-gray-400 font-sans">0% APR financing</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <TruckIcon className="w-3 h-3" />
                    <span>Shipping calculated at checkout</span>
                  </div>
                </div>
                
                {/* Product Description */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <PackageIcon className="w-3 h-3 text-emerald-400" />
                    Product Description
                  </h4>
                  <div className="text-gray-300 text-sm leading-relaxed space-y-3 font-sans">
                    <p>{getCurrentProductDetails().description}</p>
                    {getCurrentProductDetails().detailedDescription && (
                      <p>{getCurrentProductDetails().detailedDescription}</p>
                    )}
                    {getCurrentProductDetails().fullDescription && (
                      <p>{getCurrentProductDetails().fullDescription}</p>
                    )}
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                    Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getCurrentProductDetails().keyFeatures?.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 3 }}
                        className="flex items-start gap-2 p-2.5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-white/10 text-xs cursor-pointer"
                        onClick={handleRippleClick}
                      >
                        <motion.div 
                          className="p-1 rounded-md bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex-shrink-0 mt-0.5"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                        </motion.div>
                        <span className="text-gray-300 font-sans">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Specifications */}
                {(getCurrentProductDetails().specifications || getCurrentProductDetails().models) && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      Specifications
                    </h4>
                    
                    {getCurrentProductDetails().models ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20">
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Model</th>
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Voltage</th>
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Power</th>
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Noise</th>
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Size</th>
                              <th className="p-2 text-left font-bold text-white border border-white/10 font-serif">Capacity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCurrentProductDetails().models.map((model, index) => (
                              <motion.tr 
                                key={index} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="even:bg-gray-800/20 odd:bg-gray-900/20 hover:bg-emerald-900/10 cursor-pointer"
                              >
                                <td className="p-2 text-emerald-300 border border-white/10 font-bold font-sans">{model.model}</td>
                                <td className="p-2 text-gray-300 border border-white/10 font-sans">{model.voltage || 'DC 12/24V'}</td>
                                <td className="p-2 text-gray-300 border border-white/10 font-sans">{model.power}</td>
                                <td className="p-2 text-gray-300 border border-white/10 font-sans">{model.noise}</td>
                                <td className="p-2 text-gray-300 border border-white/10 font-sans">{model.size}</td>
                                <td className="p-2 text-gray-300 border border-white/10 font-sans">{model.total || model.capacity}</td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-3">
                        {getCurrentProductDetails().specifications?.map((spec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 3 }}
                            className="flex justify-between items-center p-2.5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-white/10 text-xs cursor-pointer"
                            onClick={handleRippleClick}
                          >
                            <span className="text-gray-400 font-sans">{spec.label}</span>
                            <span className="text-white font-semibold font-sans">{spec.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Dimensions */}
                {getCurrentProductDetails().dimensions && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                      <Maximize className="w-3 h-3 text-emerald-400" />
                      Dimensions
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {getCurrentProductDetails().dimensions.map((dim, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 3 }}
                          className="flex justify-between items-center p-2.5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-white/10 text-xs cursor-pointer"
                          onClick={handleRippleClick}
                        >
                          <span className="text-gray-400 font-sans">{dim.label}</span>
                          <span className="text-white font-semibold font-sans">{dim.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Includes */}
                {getCurrentProductDetails().includes && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                      <Package className="w-3 h-3 text-emerald-400" />
                      What's Included
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {getCurrentProductDetails().includes.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-2 p-2 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg text-xs cursor-pointer"
                          onClick={handleRippleClick}
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-gray-300 font-sans">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Why Choose */}
                {getCurrentProductDetails().whyChoose && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                      <AwardIcon className="w-3 h-3 text-emerald-400" />
                      Why Choose Cryonex?
                    </h4>
                    <div className="p-3 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-xl border border-emerald-500/30 text-sm">
                      <p className="text-gray-300 leading-relaxed font-sans">
                        {getCurrentProductDetails().whyChoose}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Perfect For */}
                {getCurrentProductDetails().perfectFor && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                      <Car className="w-3 h-3 text-emerald-400" />
                      Perfect For
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {getCurrentProductDetails().perfectFor.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-2 py-1 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-full border border-white/10 text-xs cursor-pointer"
                          onClick={handleRippleClick}
                        >
                          <span className="text-gray-300 font-sans">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Summary */}
                {getCurrentProductDetails().summary && (
                  <div className="p-3 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-xl border border-emerald-500/30 text-sm">
                    <p className="text-gray-300 leading-relaxed font-sans">
                      {getCurrentProductDetails().summary}
                    </p>
                  </div>
                )}
                
                {/* CTA Buttons - Fixed Width */}
                <div className="sticky bottom-0 pt-4 border-t border-white/10 bg-gradient-to-b from-gray-900 to-transparent backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        handleExternalLink(EXTERNAL_URLS.bc83aProduct);
                        setShowLearnMore(false);
                        handleRippleClick(e);
                      }}
                      className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 font-sans relative overflow-hidden w-fit min-w-[140px]"
                    >
                      <motion.div
                        variants={shimmerEffect}
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      />
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <ShoppingCart className="w-3 h-3" />
                        Add to Cart
                      </span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        setShowLearnMore(false);
                        handleRippleClick(e);
                      }}
                      className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:border-emerald-500/40 transition-all duration-300 font-sans w-fit min-w-[120px]"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <X className="w-3 h-3" />
                        Close
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={handleVideoClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh' }}
            >
              {/* Video Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 backdrop-blur-xl">
                <div className="pr-4">
                  <h3 className="font-bold text-white text-sm font-serif">
                    {installationVideos.find(v => v.id === activeVideo)?.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans line-clamp-1">
                    {installationVideos.find(v => v.id === activeVideo)?.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    handleVideoClose();
                    handleRippleClick(e);
                  }}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 hover:border-red-500/50 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                </motion.button>
              </div>
              
              {/* Video Player */}
              <div className="relative" style={{ maxHeight: '60vh' }}>
                {activeVideo === 1 ? (
                  // Google Drive iframe for video 1
                  <iframe
                    src={`https://drive.google.com/file/d/1Ga-Uy7yq17qgqn5FS8Ht1sSWrCSPwbY-/preview`}
                    className="w-full h-full"
                    style={{ minHeight: '400px', maxHeight: '60vh' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={installationVideos.find(v => v.id === activeVideo)?.title}
                  />
                ) : (
                  // Regular video for other videos
                  <video
                    ref={el => videoRefs.current[activeVideo] = el}
                    src={installationVideos.find(v => v.id === activeVideo)?.video}
                    className="w-full h-auto max-h-[60vh] object-contain"
                    controls
                    autoPlay={videoPlaying}
                    onEnded={handleVideoEnd}
                    poster={videoThumbnails[activeVideo]}
                  />
                )}
              </div>
              
              {/* Video Controls */}
              <div className="p-3 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-black/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-emerald-300 text-xs">
                      <Volume2 className="w-3 h-3" />
                      <span>Sound On</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300 text-xs">
                      <Video className="w-3 h-3" />
                      <span>HD Quality</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        if (activeVideo === 1) {
                          // Reload the iframe for Google Drive video
                          const iframe = document.querySelector('iframe');
                          if (iframe) {
                            iframe.src = iframe.src;
                          }
                        } else {
                          videoRefs.current[activeVideo]?.play();
                        }
                        handleRippleClick(e);
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-xs font-medium"
                    >
                      Replay
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        handleExternalLink(EXTERNAL_URLS.installationGuide);
                        handleRippleClick(e);
                      }}
                      className="px-3 py-1 bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-medium"
                    >
                      Download Guide
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-black via-gray-950 to-gray-900 border-t border-white/10 pt-12 md:pt-16 pb-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          }} />
        </div>
        
        {/* Animated Gradient Background */}
        <motion.div
          animate={gradientShift.animate}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05), rgba(14, 165, 233, 0.05))',
            backgroundSize: '400% 400%',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                    <Snowflake className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight font-serif">CRYONEX</h3>
                  <p className="text-xs text-gray-400 tracking-wider mt-0.5 font-sans">CLIMATE SYSTEMS</p>
                </div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm leading-relaxed font-sans"
              >
                Professional-grade climate control solutions engineered for mobile living. 
                Comfort in every climate, power in every system.
              </motion.p>
              
              {/* Enhanced Social Media Icons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-3 pt-4"
              >
                {[
                  { icon: <Instagram className="w-4 h-4" />, color: "hover:text-pink-400" },
                  { icon: <Facebook className="w-4 h-4" />, color: "hover:text-blue-400" },
                  { icon: <Twitter className="w-4 h-4" />, color: "hover:text-sky-400" },
                  { icon: <Youtube className="w-4 h-4" />, color: "hover:text-red-400" },
                  { icon: <Linkedin className="w-4 h-4" />, color: "hover:text-blue-500" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 text-gray-400 ${social.color} hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden`}
                  >
                    <motion.div
                      variants={shimmerEffect}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider font-serif">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#" },
                  { label: "Products", href: EXTERNAL_URLS.shopAllProducts },
                  { label: "About Us", href: EXTERNAL_URLS.aboutUs },
                  { label: "Installation Guide", href: EXTERNAL_URLS.installationGuide },
                  { label: "FAQ", href: EXTERNAL_URLS.faq },
                  { label: "Blog", href: EXTERNAL_URLS.blog }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleExternalLink(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group font-sans"
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider font-serif">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "Contact Us", href: EXTERNAL_URLS.contact },
                  { label: "Shipping Info", href: "#" },
                  { label: "Returns & Exchanges", href: EXTERNAL_URLS.returnPolicy },
                  { label: "Warranty Information", href: "#" },
                  { label: "Installation Services", href: "#" },
                  { label: "Product Care", href: "#" }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleExternalLink(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group font-sans"
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider font-serif">Contact Info</h4>
              
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-medium text-white font-serif">Location</div>
                    <div className="text-gray-400 text-sm font-sans">Big Bear City, California</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-br from-teal-600/20 to-emerald-600/20 border border-teal-500/30 group-hover:border-teal-500/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Phone className="w-4 h-4 text-teal-400" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-medium text-white font-serif">Phone</div>
                    <div className="text-gray-400 text-sm font-sans">+1 (951) 441-9719</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/20 to-teal-600/20 border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-medium text-white font-serif">Email</div>
                    <div className="text-gray-400 text-sm font-sans">help.vankea@gmail.com</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-white mb-2 font-serif">Stay Updated</h4>
                <p className="text-gray-400 text-sm font-sans">Subscribe to our newsletter for exclusive updates and offers</p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="relative">
                <div className="relative flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 backdrop-blur-sm font-sans shadow-xl"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3.5 rounded-xl text-sm font-bold font-sans relative overflow-hidden whitespace-nowrap"
                  >
                    <motion.div
                      variants={shimmerEffect}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    <span className="relative z-10">Subscribe</span>
                  </motion.button>
                </div>
                {emailSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-400 text-sm mt-3 text-center font-sans"
                  >
                    Thank you for subscribing to Cryonex updates!
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
          
          {/* Enhanced Payment Methods */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm font-sans">We Accept</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {["Visa", "MasterCard", "PayPal", "Apple Pay"].map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 bg-gradient-to-br from-gray-900/30 to-black/30 border border-white/10 rounded-lg hover:border-emerald-500/30 transition-colors cursor-pointer"
                >
                  <span className="text-gray-400 text-sm font-medium font-sans">{method}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Footer Bottom */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <div className="text-gray-400 text-sm font-sans">
                  <p>© 2026 Cryonex Systems. All rights reserved.</p>
                  <p className="mt-1 text-xs text-gray-500 font-sans">Comfort in every climate</p>
                </div>
              </motion.div>
              
              {/* Legal Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-sans"
              >
                {[
                  { label: "Terms of Service", href: EXTERNAL_URLS.terms },
                  { label: "Privacy Policy", href: EXTERNAL_URLS.privacy },
                  { label: "Return Policy", href: EXTERNAL_URLS.returnPolicy }
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleExternalLink(link.href);
                    }}
                    className="hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Enhanced Back to Top */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-6"
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-sans"
              >
                <ChevronUp className="w-4 h-4" />
                Back to Top
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Decorative Element */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </footer>

      <style jsx global>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
          /* Mobile Performance Optimizations */
@media (max-width: 767px) {
  /* Reduce animations on mobile */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable complex animations */
  .complex-animation,
  .floating-animation,
  [class*="animate-"] {
    animation: none !important;
  }
  
  /* Reduce backdrop blur for performance */
  .backdrop-blur-xl,
  .backdrop-blur-lg {
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
  }
  
  /* Optimize images */
  img, video {
    max-width: 100%;
    height: auto;
  }
  
  /* Reduce shadows */
  .shadow-xl,
  .shadow-2xl {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  
  /* Disable 3D transforms */
  .transform-3d {
    transform: none !important;
  }
}

/* Prevent layout shifts */
img, video, iframe {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Optimize videos for mobile */
video {
  background: black;
  max-width: 100%;
  height: auto;
}

/* Disable will-change on mobile */
@media (max-width: 767px) {
  [style*="will-change"] {
    will-change: auto !important;
  }
}
        
        ::-webkit-scrollbar-track {
          background: rgba(30, 30, 30, 0.5);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #10b981 0%, #0d9488 100%);
          border-radius: 5px;
          border: 2px solid rgba(30, 30, 30, 0.5);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #0d9488 0%, #047857 100%);
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Gradient text animation */
        .gradient-text {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Enhanced breathing animation */
        @keyframes breathing {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        
        .breathing {
          animation: breathing 3s ease-in-out infinite;
        }
        
        /* Enhanced shimmer animation */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .shimmer {
          animation: shimmer 2s infinite;
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        /* Enhanced glow effects */
        .glow {
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
        }
        
        .glow-lg {
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.7));
        }
        
        /* Fix for Google Drive iframe */
        iframe {
          border: none;
          background: black;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .text-balance {
            text-wrap: balance;
          }
          
          /* Fix mobile layout issues */
          .max-w-6xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* Improve button sizes on mobile */
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improve touch targets */
          .touch-target {
            min-height: 48px;
            min-width: 48px;
          }
          
          /* Better text sizes for mobile */
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
          }
          
          h3 {
            font-size: 1.25rem !important;
          }
          
          p, span {
            font-size: 14px !important;
          }
          
          /* Grid improvements */
          .grid {
            gap: 1rem;
          }
          
          /* Modal improvements */
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }
          
          /* Disable complex animations on mobile for performance */
          .complex-animation {
            animation: none !important;
            transform: none !important;
          }
        }
        
        /* Better focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid rgba(16, 185, 129, 0.5);
          outline-offset: 2px;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Prevent horizontal overflow */
        body {
          overflow-x: hidden;
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        .will-change-opacity {
          will-change: opacity;
        }
        
        /* Font families */
        .font-serif {
          font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
        }
        
        .font-sans {
          font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
        }
        
        /* Video styling */
        video {
          background: black;
        }
        
        /* Enhanced backdrop blur effects */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        /* Enhanced shadows */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        /* Custom gradient borders */
        .border-gradient {
          border-image: linear-gradient(45deg, #10b981, #0d9488, #14b8a6) 1;
        }
        
        /* Custom selection */
        ::selection {
          background: rgba(16, 185, 129, 0.3);
          color: white;
        }
        
        /* Enhanced hover effects */
        .hover-lift:hover {
          transform: translateY(-4px);
          transition: transform 0.2s ease;
        }
        
        /* Custom cursor styles */
        .cursor-gradient {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="%2310b981" stroke-width="2"/></svg>') 16 16, auto;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* NEW: Ripple animation */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .ripple {
          animation: ripple 1.5s ease-out;
        }
        
        /* NEW: Wave animation for floating elements */
        @keyframes wave {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        /* NEW: DNA helix animation */
        @keyframes dna-rotate {
          0% { transform: rotateY(0) rotateX(0); }
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }
        
        .dna-rotate {
          animation: dna-rotate 8s linear infinite;
        }
        
        /* NEW: Floating text animation */
        @keyframes float-text {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .float-text {
          animation: float-text 3s ease-in-out infinite;
        }
        
        /* NEW: Neon glow animation */
        @keyframes neon-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 0px rgba(16, 185, 129, 0));
            opacity: 1;
          }
          50% { 
            filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.8));
            opacity: 0.9;
          }
        }
        
        .neon-glow {
          animation: neon-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}