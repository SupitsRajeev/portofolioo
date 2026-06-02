import { pgTable, text, serial, timestamp, boolean, integer, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// BLOG POSTS TABLE
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>(),
  coverImage: text("cover_image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  readingTime: integer("reading_time"),
  views: integer("views").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// SERVICES TABLE
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDesc: text("short_desc").notNull(),
  fullDescription: text("full_description").notNull(),
  icon: text("icon"), // Icon name
  image: text("image"), // Featured image URL
  deliverables: jsonb("deliverables").$type<string[]>(),
  pricing: jsonb("pricing").$type<Array<{
    tier: string;
    price: string;
    description: string;
    features: string[];
  }>>(),
  timeline: text("timeline"),
  process: jsonb("process").$type<string[]>(),
  colorScheme: jsonb("color_scheme").$type<{
    from: string;
    to: string;
    icon: string;
  }>(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// TESTIMONIALS TABLE
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  image: text("image"),
  rating: integer("rating").default(5),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// FAQ TABLE
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// HERO SECTION TABLE
export const heroSection = pgTable("hero_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description"),
  ctaText: text("cta_text"),
  ctaUrl: text("cta_url"),
  backgroundImage: text("background_image"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ABOUT SECTION TABLE
export const aboutSection = pgTable("about_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  highlights: jsonb("highlights").$type<string[]>(),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// EXPERIENCE/TIMELINE TABLE
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
  highlights: jsonb("highlights").$type<string[]>(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Export Zod schemas
export const insertBlogPostSchema = createInsertSchema(blogPosts);
export const selectBlogPostSchema = createSelectSchema(blogPosts);

export const insertServiceSchema = createInsertSchema(services);
export const selectServiceSchema = createSelectSchema(services);

export const insertTestimonialSchema = createInsertSchema(testimonials);
export const selectTestimonialSchema = createSelectSchema(testimonials);

export const insertFaqSchema = createInsertSchema(faqs);
export const selectFaqSchema = createSelectSchema(faqs);

export const insertHeroSectionSchema = createInsertSchema(heroSection);
export const selectHeroSectionSchema = createSelectSchema(heroSection);

export const insertAboutSectionSchema = createInsertSchema(aboutSection);
export const selectAboutSectionSchema = createSelectSchema(aboutSection);

export const insertExperienceSchema = createInsertSchema(experience);
export const selectExperienceSchema = createSelectSchema(experience);
