import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import contentRouter from "./content";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/projects", projectsRouter);
router.use(contentRouter);

export default router;
