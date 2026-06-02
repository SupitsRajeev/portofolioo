export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with 3D Character Design in Blender",
    excerpt: "Learn the fundamentals of 3D character design, from sculpting to rigging, in this comprehensive beginner's guide.",
    slug: "getting-started-3d-character-design",
    author: "Rajeev Neupane",
    category: "Tutorial",
    tags: ["3D Design", "Blender", "Character Design", "Beginner"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=630&fit=crop",
    publishedAt: "2024-01-15",
    readingTime: 8,
    content: `# Getting Started with 3D Character Design in Blender

3D character design is one of the most rewarding aspects of digital art and game development. In this guide, we'll explore the fundamentals of creating a character from scratch.

## Why Character Design Matters

Characters are the heart of any interactive experience. Whether you're building a game, animation, or virtual experience, well-designed characters engage users and tell stories.

## The Character Design Process

### 1. Concept & Reference

Start with solid references and a clear concept. Collect reference images of:
- Anatomy and proportions
- Clothing and accessories  
- Expressions and poses
- Color palettes and materials

### 2. Sculpting

High-poly sculpting allows you to add detail and personality:
- Use dynamic topology for efficient sculpting
- Pay attention to proportions early
- Build forms from simple shapes

### 3. Retopology

Create an optimized, game-ready mesh:
- Reduce polygon count
- Maintain visual quality
- Create proper edge flow for deformation

### 4. UV Unwrapping

Prepare your model for texturing:
- Unwrap seams strategically
- Minimize seams in visible areas
- Check for overlapping UVs

### 5. Rigging

Set up bones for animation:
- Create a skeleton hierarchy
- Weight paint for natural deformation
- Test with simple animations

### 6. Texturing

Bring your character to life:
- Create base color map
- Add normal maps for detail
- Use PBR textures for realism

## Tools & Resources

- **Blender** - Free, powerful 3D creation suite
- **Substance Painter** - Professional texturing software
- **MarmoSet Toolbag** - Real-time rendering and baking
- **Mixamo** - Free rigged character library for learning

## Next Steps

Start with simple characters, focus on solid fundamentals, and gradually tackle more complex designs. The key to improvement is consistent practice and studying real anatomy.

Happy sculpting!`,
  },
  {
    id: "2",
    title: "The Future of Web-Based 3D Experiences",
    excerpt: "Exploring how WebGL, Three.js, and React Three Fiber are revolutionizing interactive web experiences.",
    slug: "future-web-3d",
    author: "Rajeev Neupane",
    category: "Insights",
    tags: ["Web3D", "Three.js", "WebGL", "Future"],
    coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=630&fit=crop",
    publishedAt: "2024-01-10",
    readingTime: 6,
    content: `# The Future of Web-Based 3D Experiences

The web is rapidly evolving from a static, 2D medium into an immersive, 3D-capable platform. This shift is fundamentally changing how we design and experience digital interfaces.

## The Rise of WebGL

WebGL has democratized 3D graphics on the web. What once required native applications can now run directly in browsers with impressive performance.

## Three.js: The Game Changer

Three.js has become the de facto standard for web 3D development, providing:
- Simplified API for WebGL
- Rich ecosystem of materials and effects
- Excellent documentation and community support

## React Three Fiber

React Three Fiber brings the power of React to 3D graphics:
- Declarative 3D scene management
- Familiar React patterns for 3D development
- Integration with existing React ecosystems

## Current & Future Applications

- Product visualization and e-commerce
- Data visualization and analytics
- Interactive storytelling
- Gaming in the browser
- Architectural visualization
- Virtual showrooms and metaverse experiences

## Performance Considerations

Despite impressive capabilities, web 3D faces challenges:
- Mobile performance optimization
- Browser compatibility
- Loading times for large assets

Solutions are emerging through:
- WebAssembly (WASM) for performance
- Progressive loading techniques
- Efficient compression formats

## The Opportunity

Developers and designers who master web 3D now will be positioned at the forefront of the next evolution of the web. The intersection of creativity, technology, and interactivity has never been more exciting.`,
  },
  {
    id: "3",
    title: "Motion Design Principles for Better UX",
    excerpt: "Essential animation principles that elevate user experience and create delightful interfaces.",
    slug: "motion-design-ux",
    author: "Rajeev Neupane",
    category: "Design",
    tags: ["Motion", "Animation", "UX", "Design"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    publishedAt: "2024-01-05",
    readingTime: 7,
    content: `# Motion Design Principles for Better UX

Motion design isn't just about making things pretty—it's about enhancing usability and creating intuitive interfaces. Here are key principles that will elevate your designs.

## 1. Purpose Over Flash

Every animation should serve a purpose:
- Provide feedback for user actions
- Enhance navigation and orientation
- Draw attention to important elements
- Maintain visual continuity

Avoid arbitrary motion that distracts from functionality.

## 2. Timing & Easing

The feel of an animation matters as much as its appearance:
- Fast animations (100-300ms) for feedback
- Medium animations (300-500ms) for transitions
- Slow animations (500ms+) for emphasis
- Use easing curves to feel more natural

## 3. Hierarchy & Choreography

When multiple elements animate:
- Create a sequence, not chaos
- Stagger animations for clarity
- Use consistent timing
- Guide the eye through the experience

## 4. Feedback & Confirmation

Animate to confirm user actions:
- Button press feedback
- Form submission success
- Loading progress
- Error state indication

## 5. Micro-interactions

Small, thoughtful animations:
- Hover states on interactive elements
- Focus indicators
- Transition between states
- Gesture responses

## 6. Accessibility Considerations

Respect user preferences:
- Honor prefers-reduced-motion
- Ensure animations don't flicker
- Provide keyboard alternatives
- Test with assistive technologies

## Tools for Motion Design

- **Framer Motion** - React animation library
- **GSAP** - Professional animation framework
- **Web Animations API** - Native browser API
- **Figma** - Design with prototyping

## Conclusion

Great motion design is invisible—users don't consciously think about it, but they feel when it's missing. Master these principles, and you'll create experiences that feel polished and intentional.`,
  },
];

export const categories = ["Tutorial", "Insights", "Design", "3D", "Web Development"];
export const allTags = [
  "3D Design",
  "Animation",
  "Blender",
  "Web3D",
  "Three.js",
  "React",
  "Performance",
  "UX",
  "Design",
  "Tutorial",
];
