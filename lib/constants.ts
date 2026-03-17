// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'Features', sectionId: 'features' },
  { label: 'About', sectionId: 'about' },
  { label: 'Comparison', sectionId: 'comparison' },
  { label: 'Join Waitlist', sectionId: 'waitlist' },
  { label: 'Contact Us', sectionId: 'contact' },
] as const

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/lubu-ai',
    icon: 'linkedin' as const,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/lubu.ai',
    icon: 'instagram' as const,
  },
] as const

// ─── Section IDs ──────────────────────────────────────────────────────────────

export const SECTION_IDS = {
  hero: 'hero',
  marquee: 'marquee',
  socialProof: 'social-proof',
  stats: 'stats',
  about: 'about',
  comparison: 'comparison',
  features: 'features',
  trustedBy: 'trusted-by',
  waitlist: 'waitlist',
  contact: 'contact',
  footer: 'footer',
} as const

// ─── Brand ────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'LUBU',
  tagline: 'Movement Intelligence Platform',
  logoWhite: '/brand/LUBU logo - logo white.png',
  logoBlack: '/brand/LUBU logo - logo black.png',
  email: 'hello@lubu.ai',
} as const

// ─── Motion constants ─────────────────────────────────────────────────────────

export const MOTION = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.7,
  },
  ease: {
    out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    inOut: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  },
  reducedMotion: 'prefers-reduced-motion',
} as const

// ─── Hero section ─────────────────────────────────────────────────────────────

export const HERO = {
  headline: 'The Movement Intelligence Platform.',
  subheadline:
    'The first wearable that tracks the mechanical cause of health. Not just the reactive symptoms.',
  cta: 'Get Early Access',
  ctaSectionId: 'waitlist',
} as const

// ─── Marquee ──────────────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  'power',
  'control',
  'speed',
  'efficiency',
  'consistency',
  'balance',
  'performance',
] as const

export const MARQUEE_PREFIX = 'Level up with more:' as const

// ─── Social Proof ─────────────────────────────────────────────────────────────

export const SOCIAL_PROOF = {
  label: 'Backed by the best',
  logos: [
    { name: 'Haslam', src: '/logos/partners/haslam_logo.jpeg' },
    { name: 'Intennse', src: '/logos/partners/intennse_logo.png' },
    { name: 'Juventus', src: '/logos/partners/juve_logo.png' },
    { name: 'MLS Innovation Lab', src: '/logos/partners/mls_innovation_lab_logo.png' },
    { name: 'Techstars', src: '/logos/partners/techstars_logo.png' },
  ],
} as const

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: '120B+', label: 'Biomechanical Data Points' },
  { value: '50K+', label: 'High-intensity minutes' },
  { value: '95%', label: 'Gold-standard correlation' },
  { value: '90%', label: 'Fatigue prediction' },
] as const

// ─── About ────────────────────────────────────────────────────────────────────

export const ABOUT = {
  bodyCopy: [
    'We spent decades in medical devices and elite sports to realize one thing: we are measuring everything except the way we move. Lubu changes that.',
    'At Lubu, we are redefining performance from the ground up. We capture the one data source every athlete relies on: the foot. From elite sports to everyday training, we help athletes move better, faster, and smarter.',
  ],
  rating: '4.8',
  ratingLabel: 'Average user rating',
} as const

// ─── Comparison ───────────────────────────────────────────────────────────────

export const COMPARISON = {
  heading: 'What Sets LUBU Apart',
  cta: 'Join the Waitlist',
  ctaSectionId: 'waitlist',
  rows: [
    { other: 'Wrist-level movement estimation', lubu: 'Foot-level movement intelligence' },
    { other: 'Basic inertial sensors', lubu: 'IMU sensing + Precision pressure' },
    { other: 'Bulky hardware', lubu: 'Ultra-thin electronics' },
    { other: 'Short battery life', lubu: 'Extended battery life' },
    { other: 'Manual syncing', lubu: 'Auto syncing' },
    { other: 'No force signals', lubu: 'Force and pressure analytics' },
    { other: 'Mediocre fitting', lubu: 'Cleat-ready comfort' },
    { other: 'Complex user experience', lubu: 'Intuitive user experience' },
  ],
} as const

// ─── Features ─────────────────────────────────────────────────────────────────

export const FEATURES = {
  heading: 'Lab-Grade Precision. Mass-Market Scale.',
  subheading:
    'We leveraged 80 years of medical heritage to build the world\'s first scalable movement intelligence engine. Protected by IP, validated by science, and ready for everyone.',
  items: [
    {
      title: 'Proprietary Core',
      body: 'Protected by multiple patents and decades of biomechanics expertise. Hardware-software stack is hard to replicate, easy to scale.',
    },
    {
      title: 'Elite Validation',
      body: 'Algorithms pressure-tested by the Italian Navy Seals and Politecnico of Milano. Clinical accuracy without clinical friction.',
    },
    {
      title: 'Compounding Intelligence',
      body: "We capture the 'missing variable' of health. Every step feeds a unique longitudinal dataset that gets smarter with scale.",
    },
  ],
} as const

// ─── Trusted By ───────────────────────────────────────────────────────────────

export const TRUSTED_BY = {
  institutions: [
    { name: 'Sports Innovation Center', src: null },
    { name: 'UNT HSC', src: '/logos/institutions/unt_logo.png' },
    { name: 'UCLA', src: '/logos/institutions/ucla_logo.png' },
    { name: 'NATO Special Forces', src: '/logos/institutions/nato_logo.jpeg' },
    { name: 'Complutense University', src: null },
    { name: 'Rizzoli Institute', src: null },
    { name: 'Cambridge University', src: null },
    { name: 'Politecnico of Milano', src: '/logos/institutions/PoliMi_logo.jpeg' },
  ],
} as const

// ─── Trusted By heading (section label) ───────────────────────────────────────

export const TRUSTED_BY_HEADING = 'Trusted By' as const

// ─── Waitlist ─────────────────────────────────────────────────────────────────

export const WAITLIST = {
  heading: 'LUBU is invite-only.',
  subheading:
    'Be among the first to experience movement intelligence — join the waitlist.',
  placeholder: 'Enter your email',
  cta: 'Join the Waitlist',
  successMessage: "You're on the list.",
} as const

// ─── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT = {
  email: 'hello@lubu.ai',
  successMessage: 'Message received. We\'ll be in touch.',
} as const

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  tagline: 'Run Faster, Play Harder, Recover Smarter.',
  body: 'Performance starts from your feet. High-fidelity biomechanics for performance, longevity, and clinical-grade prevention.',
} as const
