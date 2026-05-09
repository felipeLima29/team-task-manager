import { Router } from "express";
import authController from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post('/register', authController.register);

export default authRoutes;