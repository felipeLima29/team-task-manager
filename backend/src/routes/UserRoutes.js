import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userController from "../controllers/UserController.js";

const userRoutes = Router();

userRoutes.get('/me', authMiddleware, userController.getProfile);

export default userRoutes;