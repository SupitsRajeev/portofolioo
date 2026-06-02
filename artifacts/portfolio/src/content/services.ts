import type { LucideIcon } from "lucide-react";
import {
  Box,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  Palette,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullDescription: string;
  deliverables: string[];
  pricing: {
    tier: string;
    price: string;
    description: string;
    features: string[];
  }[];
  timeline: string;
  process: string[];
  colorScheme: {
    from: string;
    to: string;
    icon: string;
  };
}

export const services: Service[] = [
  {
    id: "3d-character-design",
    icon: Box,
    title: "3D Character Design",
    shortDesc: "Custom 3D character modeling and rigging for your projects",
    fullDescription:
      "Professional 3D character design and modeling. From concept art to fully rigged and animated characters, I create high-quality 3D assets tailored to your project's art style and requirements.",
    deliverables: [
      "High-poly concept model",
      "Optimized low-poly game model",
      "Full UV mapping",
      "Rigging and bone setup",
      "Basic animation cycles",
      "Texture maps (Albedo, Normal, Roughness, Metallic)",
    ],
    timeline: "2-4 weeks",
    process: [
      "Concept discussion & mood board creation",
      "High-poly sculpting",
      "Retopology & optimization",
      "UV unwrapping",
      "Rigging & weight painting",
      "Texturing & shading",
      "Final deliverables & documentation",
    ],
    pricing: [
      {
        tier: "Basic",
        price: "$2,000",
        description: "Simple character model",
        features: [
          "Single character model",
          "Basic rigging",
          "2-4 texture sets",
          "Delivery in 3 weeks",
        ],
      },
      {
        tier: "Standard",
        price: "$4,500",
        description: "Detailed character with animations",
        features: [
          "High-detail character",
          "Professional rigging",
          "Advanced textures",
          "4-6 animation cycles",
          "Delivery in 2 weeks",
        ],
      },
      {
        tier: "Premium",
        price: "$7,500",
        description: "Fully production-ready asset",
        features: [
          "Complex character design",
          "Professional rigging & blendshapes",
          "PBR textures with detail maps",
          "Multiple animation sets",
          "Performance optimization",
          "Priority support",
        ],
      },
    ],
    colorScheme: {
      from: "from-violet-500",
      to: "to-purple-600",
      icon: "text-violet-400",
    },
  },
  {
    id: "motion-graphics",
    icon: Zap,
    title: "Motion Graphics & Animation",
    shortDesc: "Dynamic animations for web, apps, and promotional content",
    fullDescription:
      "Bring your ideas to life with smooth, professional motion graphics. I create engaging animations for websites, apps, explainer videos, and promotional materials.",
    deliverables: [
      "Storyboard & animatic",
      "Keyframe animation",
      "Motion graphics design",
      "Sound design (optional)",
      "Multiple file formats (MP4, WebM, GIF)",
      "Delivery in 4K resolution",
    ],
    timeline: "1-3 weeks",
    process: [
      "Project brief & requirements gathering",
      "Storyboarding",
      "Animatic creation",
      "Animation production",
      "Visual effects & color grading",
      "Sound integration",
      "Final delivery & optimization",
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$1,500",
        description: "Short animation (15-30 seconds)",
        features: [
          "15-30 second animation",
          "Basic motion graphics",
          "2 revisions",
          "MP4 & WebM formats",
        ],
      },
      {
        tier: "Standard",
        price: "$3,500",
        description: "Full promotional video",
        features: [
          "30-60 second video",
          "Advanced motion graphics",
          "Sound design included",
          "4K resolution",
          "4 revisions",
        ],
      },
      {
        tier: "Premium",
        price: "$6,000",
        description: "Full production animation",
        features: [
          "60+ seconds of animation",
          "Custom sound design",
          "Color grading",
          "Multiple deliverable formats",
          "6 revisions",
          "Director's support",
        ],
      },
    ],
    colorScheme: {
      from: "from-cyan-500",
      to: "to-blue-600",
      icon: "text-cyan-400",
    },
  },
  {
    id: "interactive-visualization",
    icon: Layers,
    title: "Interactive 3D Visualizations",
    shortDesc: "Web-based 3D experiences with Three.js and React",
    fullDescription:
      "Transform data and complex concepts into interactive 3D visualizations. Perfect for data storytelling, product showcases, and immersive web experiences.",
    deliverables: [
      "Custom React Three Fiber component",
      "Interactive controls & UI",
      "Mobile-responsive design",
      "Performance optimization",
      "Source code documentation",
      "Integration guidance",
    ],
    timeline: "2-5 weeks",
    process: [
      "Concept & interaction design",
      "3D asset creation",
      "React Three Fiber development",
      "Interactive feature implementation",
      "UI/UX integration",
      "Performance optimization",
      "Testing & deployment support",
    ],
    pricing: [
      {
        tier: "Basic",
        price: "$2,500",
        description: "Simple 3D visualization",
        features: [
          "Basic 3D scene",
          "Simple interactions",
          "Mobile responsive",
          "Source code included",
        ],
      },
      {
        tier: "Standard",
        price: "$5,000",
        description: "Complex interactive experience",
        features: [
          "Multiple interactive elements",
          "Data integration",
          "Advanced camera controls",
          "Mobile & desktop optimized",
          "Analytics integration",
        ],
      },
      {
        tier: "Premium",
        price: "$8,500",
        description: "Full custom experience",
        features: [
          "Complex interactive system",
          "Real-time data updates",
          "Advanced animations",
          "Cross-platform optimization",
          "API integration",
          "Ongoing support (1 month)",
        ],
      },
    ],
    colorScheme: {
      from: "from-emerald-500",
      to: "to-cyan-500",
      icon: "text-emerald-400",
    },
  },
  {
    id: "brand-animation",
    icon: Sparkles,
    title: "Brand Animation & Identity",
    shortDesc: "Animated logos, brand guidelines, and visual identity systems",
    fullDescription:
      "Create a cohesive animated brand identity. From animated logos to motion design guidelines, I help your brand come alive across all digital touchpoints.",
    deliverables: [
      "Animated logo variations",
      "Motion design guidelines",
      "Loading animations",
      "Transition animations",
      "Brand animation kit",
      "Documentation & style guide",
    ],
    timeline: "3-6 weeks",
    process: [
      "Brand research & discovery",
      "Concept development",
      "Animation design",
      "Multiple iterations",
      "Guidelines creation",
      "Delivery in multiple formats",
      "Support for implementation",
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$2,000",
        description: "Logo animation only",
        features: [
          "Single animated logo",
          "3 variations",
          "All file formats",
          "Basic documentation",
        ],
      },
      {
        tier: "Standard",
        price: "$4,500",
        description: "Complete brand animation set",
        features: [
          "Logo animations",
          "Loading states",
          "Transitions",
          "Motion guidelines",
          "5 deliverables",
        ],
      },
      {
        tier: "Premium",
        price: "$7,500",
        description: "Full brand animation system",
        features: [
          "Complete animation kit",
          "20+ motion assets",
          "Comprehensive guidelines",
          "Implementation support",
          "3-month support period",
        ],
      },
    ],
    colorScheme: {
      from: "from-pink-500",
      to: "to-rose-600",
      icon: "text-pink-400",
    },
  },
  {
    id: "product-animation",
    icon: BarChart3,
    title: "Product Animation & Visualization",
    shortDesc: "Showcase your products with stunning 3D animations",
    fullDescription:
      "Highlight product features with high-quality 3D animations. Perfect for e-commerce, marketing campaigns, and product launches.",
    deliverables: [
      "Product 3D model optimization",
      "360° product rotation",
      "Feature highlight animations",
      "Explainer animations",
      "Marketing video (optional)",
      "Multi-format delivery",
    ],
    timeline: "1-4 weeks",
    process: [
      "Product 3D model preparation",
      "Camera & lighting setup",
      "Animation planning",
      "Animation production",
      "Color grading & effects",
      "Export optimization",
      "Delivery & support",
    ],
    pricing: [
      {
        tier: "Basic",
        price: "$1,800",
        description: "Simple product showcase",
        features: [
          "360° rotation",
          "Basic lighting",
          "Single product",
          "HD video",
        ],
      },
      {
        tier: "Standard",
        price: "$4,000",
        description: "Feature-rich product video",
        features: [
          "Multiple product angles",
          "Feature animations",
          "Professional lighting",
          "4K video",
          "2 revisions",
        ],
      },
      {
        tier: "Premium",
        price: "$6,500",
        description: "Full marketing campaign",
        features: [
          "Multiple products",
          "Complex animations",
          "Visual effects",
          "4K + 8K delivery",
          "Marketing variations",
          "Unlimited revisions",
        ],
      },
    ],
    colorScheme: {
      from: "from-amber-500",
      to: "to-yellow-400",
      icon: "text-amber-400",
    },
  },
  {
    id: "custom-3d-experience",
    icon: Palette,
    title: "Custom 3D Experiences",
    shortDesc: "Bespoke 3D projects tailored to your unique needs",
    fullDescription:
      "Have a unique idea that doesn't fit standard categories? Let's create a custom 3D experience specifically designed for your vision.",
    deliverables: [
      "Custom design & development",
      "Tailored to your requirements",
      "Source code (if applicable)",
      "Full documentation",
      "Ongoing support",
      "Unlimited revisions",
    ],
    timeline: "Custom (2-8 weeks)",
    process: [
      "Requirements gathering",
      "Proposal & timeline planning",
      "Concept development",
      "Iterative development",
      "Testing & refinement",
      "Final delivery",
      "Support & maintenance",
    ],
    pricing: [
      {
        tier: "Consultation",
        price: "$500",
        description: "Project planning session",
        features: [
          "1-hour consultation",
          "Project scope definition",
          "Timeline estimation",
          "Quote proposal",
        ],
      },
      {
        tier: "Custom",
        price: "Custom",
        description: "Based on your project",
        features: [
          "Custom quote",
          "Timeline based on scope",
          "Full project support",
          "Unlimited revisions",
          "Post-launch support",
        ],
      },
    ],
    colorScheme: {
      from: "from-indigo-500",
      to: "to-purple-600",
      icon: "text-indigo-400",
    },
  },
];

export const serviceCategories = {
  modeling: ["3d-character-design", "product-animation"],
  animation: ["motion-graphics", "brand-animation", "product-animation"],
  interactive: ["interactive-visualization", "custom-3d-experience"],
  fullService: ["brand-animation", "custom-3d-experience"],
};
