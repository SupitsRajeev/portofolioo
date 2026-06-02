import { Router } from "express";
import { db } from "@workspace/db";
import {
  blogPosts as blogPostsTable,
  services as servicesTable,
  testimonials as testimonialsTable,
  faqs as faqsTable,
  heroSection as heroSectionTable,
  aboutSection as aboutSectionTable,
  experience as experienceTable,
  insertBlogPostSchema,
  insertServiceSchema,
  insertTestimonialSchema,
  insertFaqSchema,
  insertHeroSectionSchema,
  insertAboutSectionSchema,
  insertExperienceSchema,
} from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

// ============ BLOG POSTS ============

router.get("/blog", async (req, res) => {
  try {
    const posts = await db.select().from(blogPostsTable).where(eq(blogPostsTable.published, true)).orderBy((t) => desc(t.createdAt));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/blog/featured", async (req, res) => {
  try {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true))
      .orderBy((t) => desc(t.createdAt))
      .limit(3);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured posts" });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const post = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, req.params.slug))
      .limit(1);
    if (!post.length) return res.status(404).json({ error: "Post not found" });
    res.json(post[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const validated = insertBlogPostSchema.parse(req.body);
    const result = await db.insert(blogPostsTable).values(validated).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Invalid blog post data" });
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    const result = await db
      .update(blogPostsTable)
      .set(req.body)
      .where(eq(blogPostsTable.id, parseInt(req.params.id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to update post" });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete post" });
  }
});

// ============ SERVICES ============

router.get("/services", async (req, res) => {
  try {
    const allServices = await db.select().from(servicesTable).orderBy((t) => t.order);
    res.json(allServices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.post("/services", async (req, res) => {
  try {
    const validated = insertServiceSchema.parse(req.body);
    const result = await db.insert(servicesTable).values(validated).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Invalid service data" });
  }
});

router.put("/services/:id", async (req, res) => {
  try {
    const result = await db
      .update(servicesTable)
      .set(req.body)
      .where(eq(servicesTable.id, parseInt(req.params.id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to update service" });
  }
});

router.delete("/services/:id", async (req, res) => {
  try {
    await db.delete(servicesTable).where(eq(servicesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete service" });
  }
});

// ============ TESTIMONIALS ============

router.get("/testimonials", async (req, res) => {
  try {
    const all = await db.select().from(testimonialsTable).orderBy((t) => t.order);
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

router.get("/testimonials/featured", async (req, res) => {
  try {
    const featured = await db
      .select()
      .from(testimonialsTable)
      .where(eq(testimonialsTable.featured, true))
      .orderBy((t) => t.order);
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured testimonials" });
  }
});

router.post("/testimonials", async (req, res) => {
  try {
    const validated = insertTestimonialSchema.parse(req.body);
    const result = await db.insert(testimonialsTable).values(validated).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Invalid testimonial data" });
  }
});

router.put("/testimonials/:id", async (req, res) => {
  try {
    const result = await db
      .update(testimonialsTable)
      .set(req.body)
      .where(eq(testimonialsTable.id, parseInt(req.params.id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to update testimonial" });
  }
});

router.delete("/testimonials/:id", async (req, res) => {
  try {
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete testimonial" });
  }
});

// ============ FAQs ============

router.get("/faqs", async (req, res) => {
  try {
    const all = await db.select().from(faqsTable).orderBy((t) => t.order);
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

router.post("/faqs", async (req, res) => {
  try {
    const validated = insertFaqSchema.parse(req.body);
    const result = await db.insert(faqsTable).values(validated).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Invalid FAQ data" });
  }
});

router.put("/faqs/:id", async (req, res) => {
  try {
    const result = await db
      .update(faqsTable)
      .set(req.body)
      .where(eq(faqsTable.id, parseInt(req.params.id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to update FAQ" });
  }
});

router.delete("/faqs/:id", async (req, res) => {
  try {
    await db.delete(faqsTable).where(eq(faqsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete FAQ" });
  }
});

// ============ HERO SECTION ============

router.get("/hero", async (req, res) => {
  try {
    const hero = await db.select().from(heroSectionTable).limit(1);
    res.json(hero[0] || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hero section" });
  }
});

router.put("/hero", async (req, res) => {
  try {
    const existing = await db.select().from(heroSectionTable).limit(1);
    if (existing.length) {
      const result = await db
        .update(heroSectionTable)
        .set(req.body)
        .where(eq(heroSectionTable.id, existing[0].id))
        .returning();
      res.json(result[0]);
    } else {
      const result = await db.insert(heroSectionTable).values(req.body).returning();
      res.status(201).json(result[0]);
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update hero section" });
  }
});

// ============ ABOUT SECTION ============

router.get("/about", async (req, res) => {
  try {
    const about = await db.select().from(aboutSectionTable).limit(1);
    res.json(about[0] || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch about section" });
  }
});

router.put("/about", async (req, res) => {
  try {
    const existing = await db.select().from(aboutSectionTable).limit(1);
    if (existing.length) {
      const result = await db
        .update(aboutSectionTable)
        .set(req.body)
        .where(eq(aboutSectionTable.id, existing[0].id))
        .returning();
      res.json(result[0]);
    } else {
      const result = await db.insert(aboutSectionTable).values(req.body).returning();
      res.status(201).json(result[0]);
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update about section" });
  }
});

// ============ EXPERIENCE ============

router.get("/experience", async (req, res) => {
  try {
    const all = await db.select().from(experienceTable).orderBy((t) => t.order);
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

router.post("/experience", async (req, res) => {
  try {
    const validated = insertExperienceSchema.parse(req.body);
    const result = await db.insert(experienceTable).values(validated).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Invalid experience data" });
  }
});

router.put("/experience/:id", async (req, res) => {
  try {
    const result = await db
      .update(experienceTable)
      .set(req.body)
      .where(eq(experienceTable.id, parseInt(req.params.id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to update experience" });
  }
});

router.delete("/experience/:id", async (req, res) => {
  try {
    await db.delete(experienceTable).where(eq(experienceTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete experience" });
  }
});

export default router;
