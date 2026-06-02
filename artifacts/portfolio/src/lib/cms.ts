import type { CaseStudy } from "@/content/portfolio";

export interface CMSProject {
  id: number;
  title: string;
  description: string;
  longDescription?: string | null;
  category?: string | null;
  tags?: string[] | null;
  featured?: boolean | null;
  imageUrl?: string | null;
  images?: Array<{ url: string; alt: string }> | null;
  technologies?: string[] | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  displayOrder?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export const CMS_API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const COLOR_SCHEMES = [
  "violet",
  "emerald",
  "orange",
  "cyan",
  "rose",
  "blue",
  "amber",
] as const;

const PROJECT_ICONS = [
  "Rocket",
  "Brain",
  "Layers2",
  "Code2",
  "Star",
  "Zap",
  "Globe",
] as const;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectToPortfolioCard(project: CMSProject) {
  const id = Number(project.id) || 0;
  const colorScheme = COLOR_SCHEMES[id % COLOR_SCHEMES.length];
  const icon = PROJECT_ICONS[id % PROJECT_ICONS.length];
  const technologies = project.technologies?.length
    ? project.technologies
    : project.tags || [];

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    stack: technologies,
    github: project.githubUrl || "#",
    link: project.liveUrl || "#",
    icon,
    colorScheme,
    imageUrl: project.imageUrl || project.images?.[0]?.url || undefined,
  };
}

export function projectToCaseStudy(project: CMSProject): CaseStudy {
  const images = [
    ...(project.images?.map((image) => image.url) || []),
    ...(project.imageUrl ? [project.imageUrl] : []),
  ];

  const technologies = project.technologies?.length
    ? project.technologies
    : project.tags || [];

  const baseText = project.longDescription || project.description;
  const service = project.category || "Portfolio Project";
  const slug = slugify(project.title);

  return {
    id: String(project.id),
    title: project.title,
    excerpt: project.description,
    slug,
    client: project.category || "Portfolio",
    service,
    challenge: baseText,
    solution: baseText,
    results: [
      { metric: "Technologies", value: String(technologies.length) },
      { metric: "Images", value: String(images.length || 0) },
      { metric: "Status", value: project.featured ? "Featured" : "Live" },
      {
        metric: "Order",
        value: String(project.displayOrder ?? 0),
      },
    ],
    images: images.length > 0 ? images : ["/opengraph.jpg"],
    technologies,
    featured: Boolean(project.featured),
    timeline: project.createdAt
      ? new Date(project.createdAt).toLocaleDateString()
      : "Current",
  };
}

export async function fetchCMSProjects(featured = false): Promise<CMSProject[]> {
  const url = featured
    ? `${CMS_API_BASE}/api/projects/featured`
    : `${CMS_API_BASE}/api/projects`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS projects: ${response.statusText}`);
  }

  const data = (await response.json()) as CMSProject[];
  return Array.isArray(data) ? data : [];
}
