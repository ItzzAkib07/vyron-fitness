export const membershipPlans = [
  {
    id: "basic",
    name: "BASIC",
    tagline: "Foundational Access for Independent Lifters",
    monthlyPrice: 1499,
    annualMonthlyPrice: 1199,
    currency: "₹",
    period: "month",
    badge: "Essential",
    isPopular: false,
    color: "from-zinc-800 to-zinc-900",
    borderGlow: "border-zinc-800 hover:border-zinc-600",
    description: "Full access to our main strength floor and cardio arena during all standard operating hours.",
    features: [
      "Access to Main Strength & Free Weights Zone",
      "Full Cardio Arena with Keiser & Concept2",
      "Modern Locker Rooms & Rain Showers",
      "Standard VYRON Mobile Companion App",
      "1 Initial InBody Composition Scan",
      "Free High-Speed Wi-Fi & Hydration Station"
    ],
    notIncluded: [
      "Group Studio Classes (HIIT, Boxing, Yoga)",
      "Cryotherapy & Infrared Recovery Lounge",
      "Complimentary Personal Training Sessions",
      "Guest Passes & VIP Lounge Access"
    ],
    ctaText: "Start With Basic",
    trialEligible: true
  },
  {
    id: "pro",
    name: "PRO",
    tagline: "The Complete Next-Gen Athletic Lifestyle",
    monthlyPrice: 2999,
    annualMonthlyPrice: 2399,
    currency: "₹",
    period: "month",
    badge: "MOST POPULAR",
    isPopular: true,
    color: "from-[#1a2305] to-zinc-950",
    borderGlow: "border-[#E2FF00] shadow-[0_0_35px_rgba(226,255,0,0.18)]",
    description: "Unlimited access to all 8 specialized zones, all group classes, monthly body scans, and recovery facilities.",
    features: [
      "24/7 Unlimited Access to ALL 8 Zones",
      "Unlimited Daily Studio Classes (HIIT, Boxing, CrossFit, Yoga)",
      "Infrared Sauna & Contrast Cold Plunge Access",
      "Monthly InBody 770 Diagnostic Body Scans",
      "1 Monthly 1-on-1 Personal Training Session",
      "2 Monthly Complimentary Guest Passes",
      "Advanced Nutrition Macro Calculator & Meal Blueprint",
      "10% Discount at Fuel & Nutrition Bar"
    ],
    notIncluded: [
      "Dedicated Private VIP Training Suite",
      "Weekly 1-on-1 Personal Coaching"
    ],
    ctaText: "Get Pro Access",
    trialEligible: true
  },
  {
    id: "elite",
    name: "ELITE",
    tagline: "Uncompromised Executive Coaching & Longevity",
    monthlyPrice: 4999,
    annualMonthlyPrice: 3999,
    currency: "₹",
    period: "month",
    badge: "ULTIMATE TIER",
    isPopular: false,
    color: "from-[#051a24] to-zinc-950",
    borderGlow: "border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.18)]",
    description: "Bespoke one-on-one personal coaching, private VIP suite booking, unlimited cryo recovery, and executive concierge.",
    features: [
      "Everything in PRO tier with Zero Restrictions",
      "4 Monthly 1-on-1 Sessions with Master Coaches",
      "Unlimited Cryotherapy & Normatec Compression",
      "Weekly HRV & Biometric Neuromuscular Tracking",
      "Bespoke Supplement Stack & Nutrition Guidance",
      "Unlimited VIP Guest Passes",
      "Dedicated Private Locker & Executive Laundry Service",
      "Private VIP Suite Reservation Priority",
      "20% Discount at Fuel & Nutrition Bar"
    ],
    notIncluded: [],
    ctaText: "Join Elite Club",
    trialEligible: true
  }
];

export const comparisonFeatures = [
  { category: "Facility Access", features: [
    { name: "Main Strength & Cardio Floor", basic: "Standard Hours", pro: "24/7 Access", elite: "24/7 VIP Priority" },
    { name: "Olympic Lifting & CrossFit Arena", basic: false, pro: true, elite: true },
    { name: "Boxing & Combat Studio", basic: false, pro: true, elite: true },
    { name: "Private VIP Suite Reservation", basic: false, pro: false, elite: true }
  ]},
  { category: "Classes & Coaching", features: [
    { name: "Unlimited Group Studio Classes", basic: false, pro: true, elite: true },
    { name: "1-on-1 Master Coach Sessions", basic: false, pro: "1 / Month", elite: "4 / Month (Weekly)" },
    { name: "Technique Workshops & Clinics", basic: "Paid Pass", pro: "Included", elite: "VIP Front-Row" }
  ]},
  { category: "Diagnostics & Recovery", features: [
    { name: "InBody 770 Scans", basic: "1 at Signup", pro: "Monthly", elite: "Bi-Weekly + Bloodwork Review" },
    { name: "Infrared Sauna & Cold Plunge", basic: false, pro: "Unlimited", elite: "Unlimited + Private Time" },
    { name: "Cryotherapy Chamber & Normatec", basic: false, pro: "Discounted", elite: "Unlimited Free" }
  ]},
  { category: "Perks & Guest Privileges", features: [
    { name: "Guest Passes", basic: false, pro: "2 Passes/Month", elite: "Unlimited Passes" },
    { name: "Fuel & Nutrition Bar Discount", basic: "0%", pro: "10%", elite: "20%" },
    { name: "Permanent Locker & Laundry", basic: false, pro: false, elite: true }
  ]}
];
