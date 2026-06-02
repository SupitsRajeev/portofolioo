import { Router, type Request, type Response } from "express";
import { db, projects, insertProjectSchema, eq, desc } from "@workspace/db";
import { logger } from "../lib/logger";

const projectsRouter = Router();

// GET all projects
projectsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.displayOrder), desc(projects.createdAt));
    res.json(allProjects);
  } catch (error) {
    logger.error({ error }, "Failed to fetch projects");
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET featured projects
projectsRouter.get("/featured", async (req: Request, res: Response) => {
  try {
    const featuredProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.displayOrder), desc(projects.createdAt));
    res.json(featuredProjects);
  } catch (error) {
    logger.error({ error }, "Failed to fetch featured projects");
    res.status(500).json({ error: "Failed to fetch featured projects" });
  }
});

// GET single project by ID
projectsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (project.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(project[0]);
  } catch (error) {
    logger.error({ error }, "Failed to fetch project");
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST create project
projectsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = insertProjectSchema.parse(req.body);
    const newProject = await db
      .insert(projects)
      .values(validatedData)
      .returning();

    res.status(201).json(newProject[0]);
  } catch (error) {
    logger.error({ error }, "Failed to create project");
    if (error instanceof Error && error.message.includes("validation")) {
      res.status(400).json({ error: "Invalid project data" });
    } else {
      res.status(500).json({ error: "Failed to create project" });
    }
  }
});

// PUT update project
projectsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = insertProjectSchema.partial().parse(req.body);

    const updatedProject = await db
      .update(projects)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, Number(id)))
      .returning();

    if (updatedProject.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(updatedProject[0]);
  } catch (error) {
    logger.error({ error }, "Failed to update project");
    if (error instanceof Error && error.message.includes("validation")) {
      res.status(400).json({ error: "Invalid project data" });
    } else {
      res.status(500).json({ error: "Failed to update project" });
    }
  }
});

// DELETE project
projectsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, Number(id)))
      .returning();

    if (deletedProject.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    logger.error({ error }, "Failed to delete project");
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default projectsRouter;
