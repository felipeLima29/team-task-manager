import CreateTaskDTO from "../DTOs/task/CreateTaskDTO.js";
import UpdateStatusTaskDTO from "../DTOs/task/UpdateStatusTaskDTO.js";
import UpdateTaskDTO from "../DTOs/task/UpdateTaskDTO.js";
import AppError from "../errors/AppError.js";
import taskService from "../services/TaskServices.js";

class TaskController {
    async createTask(req, res) {
        try {
            const taskDTO = new CreateTaskDTO(req.body);
            const task = await taskService.createTask(taskDTO, req.params.projectId, req.userId);
            return res.status(201).json(task);
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

    async listTasks(req, res) {
        try {
            const tasks = await taskService.listTasks(req.params.projectId, req.userId);
            return res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

    async listTaskById(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.taskId, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

    async updateTaskStatus(req, res) {
        try {
            const statusDTO = new UpdateStatusTaskDTO(req.body);
            const task = await taskService.updateTaskStatus(req.params.taskId, statusDTO, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

    async updateTask(req, res) {
        try {
            const taskDTO = new UpdateTaskDTO(req.body);
            const task = await taskService.updateTask(req.params.taskId, taskDTO, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

    async deleteTask(req, res) {
        try {
            const task = await taskService.deleteTask(req.params.taskId, req.userId);
            return res.status(200).json({ message: "Tarefa deletada com sucesso." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({
                error: "Erro interno do servidor. Tente novamente mais tarde.",
            });
        }
    }

}

const taskController = new TaskController();
export default taskController;