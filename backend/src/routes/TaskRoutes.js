import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import taskController from "../controllers/TaskController.js";

const taskRoutes = Router();

taskRoutes.post('/projects/:projectId/tasks', authMiddleware, taskController.createTask);
taskRoutes.get('/projects/:projectId/tasks', authMiddleware, taskController.listTasks);
taskRoutes.get('/tasks/:taskId', authMiddleware, taskController.listTaskById);
taskRoutes.patch('/tasks/:taskId/status', authMiddleware, taskController.updateTaskStatus);
taskRoutes.patch('/tasks/:taskId', authMiddleware, taskController.updateTask);
taskRoutes.delete('/tasks/:taskId', authMiddleware, taskController.deleteTask);

export default taskRoutes;