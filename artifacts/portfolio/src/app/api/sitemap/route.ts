import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/portfolio";
import { services } from "@/content/services";
import { fetchCMSProjects, projectToCaseStudy } from "@/lib/cms";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.com";

async function getPortfolioSlugs() {
  try {
    const projects = await fetchCMSProjects();
    if (projects.length > 0) {
      return projects.map((project) => projectToCaseStudy(project).slug);
    }
  } catch {
    // Fall back to the curated case studies below.
  }

  return caseStudies.map(({ slug }) => slug);
}

async function generateSiteMap() {
  const portfolioSlugs = await getPortfolioSlugs();

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <!-- Homepage -->
     <url>
       <loc>${BASE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- Services -->
     <url>
       <loc>${BASE_URL}/services</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.9</priority>
     </url>
     ${services
       .map(({ id }) => {
         return `
     <url>
       <loc>${BASE_URL}/services/${id}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>`;
       })
       .join("")}
     
     <!-- Portfolio -->
     <url>
       <loc>${BASE_URL}/portfolio</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     ${portfolioSlugs
       .map((slug) => {
         return `
     <url>
       <loc>${BASE_URL}/portfolio/${slug}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>`;
       })
       .join("")}
     
     <!-- Blog -->
     <url>
       <loc>${BASE_URL}/blog</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     ${blogPosts
       .map(({ slug, publishedAt }) => {
         return `
     <url>
       <loc>${BASE_URL}/blog/${slug}</loc>
       <lastmod>${new Date(publishedAt).toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>`;
       })
       .join("")}
     
     <!-- Other Pages -->
     <url>
       <loc>${BASE_URL}/contact</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
   </urlset>
 `;
}

export async function GET() {
  const xml = await generateSiteMap();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
