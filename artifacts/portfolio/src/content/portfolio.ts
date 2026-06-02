export interface CaseStudy {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  client: string;
  service: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  images: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
  };
  technologies: string[];
  featured: boolean;
  timeline: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Animated Brand Identity for TechStart",
    excerpt: "Complete animated brand system with logo animations, UI motion, and brand guidelines.",
    slug: "techstart-brand-animation",
    client: "TechStart Inc.",
    service: "Brand Animation & Identity",
    challenge:
      "TechStart needed a modern, animated brand identity that conveyed innovation and trustworthiness across all digital touchpoints.",
    solution:
      "Designed a comprehensive animated brand system including: animated logo with 5 variations, microinteraction guidelines, loading animations, and transition effects. All exported in multiple formats for seamless integration.",
    results: [
      { metric: "Brand Recognition", value: "+45%" },
      { metric: "Website Engagement", value: "+67%" },
      { metric: "Animation Assets", value: "20+" },
      { metric: "Time to Implementation", value: "3 weeks" },
    ],
    images: [
      "https://images.unsplash.com/photo-1559163499-8a318b6e39d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    ],
    testimonial: {
      quote:
        "The animated brand identity transformed how our customers perceive us. The attention to detail and smooth animations make every interaction feel premium.",
      author: "Sarah Chen",
      title: "Creative Director",
      company: "TechStart Inc.",
    },
    technologies: ["After Effects", "Figma", "React", "Lottie"],
    featured: true,
    timeline: "3 weeks",
  },
  {
    id: "2",
    title: "Interactive 3D Product Visualization",
    excerpt: "Web-based 3D product explorer with real-time customization and high-performance rendering.",
    slug: "ecommerce-3d-viewer",
    client: "Luxury Goods Co.",
    service: "Interactive 3D Visualizations",
    challenge:
      "E-commerce platform needed a way to showcase complex products in 3D with real-time customization without compromising performance on mobile devices.",
    solution:
      "Built a custom React Three Fiber application with: 360° product rotation, real-time material/color changes, mobile optimization, and integration with inventory system. Used optimized 3D models and LOD (Level of Detail) for performance.",
    results: [
      { metric: "Conversion Rate", value: "+38%" },
      { metric: "Page Load Time", value: "-65%" },
      { metric: "Product Views", value: "+4.2x" },
      { metric: "Mobile Users", value: "85% compatibility" },
    ],
    images: [
      "https://images.unsplash.com/photo-1550745165-9491bb59b12d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    ],
    testimonial: {
      quote:
        "This 3D viewer is a game-changer. Our customers spend more time on product pages and make better purchasing decisions. The technical implementation is seamless.",
      author: "Michael Rodriguez",
      title: "VP of E-commerce",
      company: "Luxury Goods Co.",
    },
    technologies: ["Three.js", "React Three Fiber", "Next.js", "WebGL"],
    featured: true,
    timeline: "6 weeks",
  },
  {
    id: "3",
    title: "Character Design & Animation for Game",
    excerpt: "Professional 3D character design with full rigging, blendshapes, and animation cycles.",
    slug: "game-character-design",
    client: "indie Game Studio",
    service: "3D Character Design",
    challenge:
      "Indie game studio needed diverse, expressive characters with unique personalities and multiple animation states within budget constraints.",
    solution:
      "Designed and modeled 5 main characters with distinct visual styles, created full character rigs with blendshapes for facial expressions, and delivered 15+ animation cycles including idle, run, jump, and emote animations.",
    results: [
      { metric: "Characters Delivered", value: "5" },
      { metric: "Animation Cycles", value: "15+" },
      { metric: "Production Time", value: "4 weeks" },
      { metric: "Game Score", value: "+2.5★" },
    ],
    images: [
      "https://images.unsplash.com/photo-1538481143235-2afa092662b7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
    ],
    testimonial: {
      quote:
        "The characters brought our game to life. The rigging and animations are professional quality, and the studio was incredibly responsive to feedback.",
      author: "Alex Chen",
      title: "Game Director",
      company: "Indie Game Studio",
    },
    technologies: ["Blender", "Maya", "Substance Painter", "Unity"],
    featured: true,
    timeline: "4 weeks",
  },
  {
    id: "4",
    title: "Motion Graphics Campaign",
    excerpt: "Full-production motion graphics video for social media and advertising campaign.",
    slug: "motion-campaign-social",
    client: "Digital Agency",
    service: "Motion Graphics & Animation",
    challenge:
      "Create eye-catching motion graphics content optimized for multiple social platforms with tight timeline and multiple revisions.",
    solution:
      "Produced a 60-second hero animation with custom typography, kinetic elements, and visual effects. Delivered in multiple formats: 16:9, 9:16 (Stories), 1:1 (Feed), and custom aspect ratios for different platforms.",
    results: [
      { metric: "Video Views", value: "2.3M+" },
      { metric: "Engagement Rate", value: "+52%" },
      { metric: "Click-through Rate", value: "+18%" },
      { metric: "Format Variations", value: "6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    ],
    testimonial: {
      quote:
        "The motion graphics exceeded our expectations. The quality is broadcast-level and delivered on time. Our clients were impressed with the attention to detail.",
      author: "Jessica Martinez",
      title: "Creative Lead",
      company: "Digital Agency",
    },
    technologies: ["Cinema 4D", "After Effects", "DaVinci Resolve", "Premiere Pro"],
    featured: false,
    timeline: "2 weeks",
  },
];

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
