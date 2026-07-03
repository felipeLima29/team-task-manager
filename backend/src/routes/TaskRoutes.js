import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import taskController from "../controllers/TaskController.js";

const taskRoutes = Router();

taskRoutes.post('/projects/:projectId/tasks', authMiddleware, taskController.createTask);
taskRoutes.get('/projects/:projectId/tasks', authMiddleware, taskController.listTasks);

export default taskRoutes;