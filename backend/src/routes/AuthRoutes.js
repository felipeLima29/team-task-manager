import { Router } from "express";
import authController from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

export default authRoutes;