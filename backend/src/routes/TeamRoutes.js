import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import teamController from "../controllers/TeamController.js";

const teamRoutes = Router();

teamRoutes.post('/create', authMiddleware, teamController.register);

export default teamRoutes;