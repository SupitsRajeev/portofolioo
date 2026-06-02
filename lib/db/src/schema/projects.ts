import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category"),
  tags: jsonb("tags").$type<string[]>(),
  featured: boolean("featured").default(false),
  imageUrl: text("image_url"),
  images: jsonb("images").$type<Array<{ url: string; alt: string }>>(),
  technologies: jsonb("technologies").$type<string[]>(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects);

export const selectProjectSchema = createSelectSchema(projects);
