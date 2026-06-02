import { useState, useEffect } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api`;

// Blog Posts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  publishedAt: string;
  readingTime: number;
  createdAt?: string;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const url = `${API_URL}/blog?t=${Date.now()}`;
        console.log("[useBlogPosts] Fetching from:", url);
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        
        console.log("[useBlogPosts] Response status:", response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch blog posts`);
        
        const data = await response.json();
        console.log("[useBlogPosts] Fetched posts:", data);
        
        setPosts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        console.error("[useBlogPosts] Error:", errorMsg);
        setError(errorMsg);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  return { posts, loading, error };
}

// Services
export interface Service {
  id: number;
  title: string;
  shortDesc: string;
  fullDescription: string;
  icon?: string;
  image?: string;
  deliverables?: string[];
  pricing?: Array<{
    tier: string;
    price: string;
    description: string;
    features: string[];
  }>;
  timeline?: string;
  process?: string[];
  colorScheme?: {
    from: string;
    to: string;
    icon: string;
  };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const url = `${API_URL}/services?t=${Date.now()}`;
        console.log("[useServices] Fetching from:", url);
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        
        console.log("[useServices] Response status:", response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch services`);
        
        const data = await response.json();
        console.log("[useServices] Fetched services:", data);
        
        setServices(data || []);
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        console.error("[useServices] Error:", errorMsg);
        setError(errorMsg);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

  return { services, loading, error };
}

// Testimonials
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  image?: string;
  rating: number;
  featured: boolean;
  quote?: string;
  author?: string;
  title?: string;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/testimonials?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        // Show featured testimonials first, then others
        const allTestimonials = Array.isArray(data) ? data : [];
        const sorted = allTestimonials.sort((a: any, b: any) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setTestimonials(sorted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
    const interval = setInterval(fetchTestimonials, 10000);
    return () => clearInterval(interval);
  }, []);

  return { testimonials, loading, error };
}

// FAQs
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/faqs?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) throw new Error("Failed to fetch FAQs");
        const data = await response.json();
        setFaqs(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
    const interval = setInterval(fetchFaqs, 10000);
    return () => clearInterval(interval);
  }, []);

  return { faqs, loading, error };
}

// Projects
export interface Project {
  id: number;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  featured: boolean;
  imageUrl?: string;
  images?: Array<{ url: string; alt: string }>;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/projects?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    const interval = setInterval(fetchProjects, 10000);
    return () => clearInterval(interval);
  }, []);

  return { projects, loading, error };
}

// Hero Section
export interface HeroSection {
  id?: number;
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundImage?: string;
}

export function useHeroSection() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/hero?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) throw new Error("Failed to fetch hero section");
        const data = await response.json();
        setHero(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
    const interval = setInterval(fetchHero, 10000);
    return () => clearInterval(interval);
  }, []);

  return { hero, loading, error };
}

// About Section
export interface AboutSection {
  id?: number;
  title: string;
  description: string;
  highlights?: string[];
  image?: string;
}

export function useAboutSection() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/about?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) throw new Error("Failed to fetch about section");
        const data = await response.json();
        setAbout(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
    const interval = setInterval(fetchAbout, 10000);
    return () => clearInterval(interval);
  }, []);

  return { about, loading, error };
}
