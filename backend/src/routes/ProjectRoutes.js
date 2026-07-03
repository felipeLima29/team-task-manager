import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import projectController from "../controllers/ProjectController.js";

const projectRoutes = Router();

projectRoutes.post('/teams/:teamId/projects', authMiddleware, projectController.register);

export default projectRoutes;