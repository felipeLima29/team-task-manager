import CreateTaskDTO from "../DTOs/task/CreateTaskDTO.js";
import UpdateStatusTaskDTO from "../DTOs/task/UpdateStatusTaskDTO.js";
import UpdateTaskDTO from "../DTOs/task/UpdateTaskDTO.js";
import AppError from "../errors/AppError.js";
import taskService from "../services/TaskServices.js";

class TaskController {
    async createTask(req, res, next) {
        try {
            const taskDTO = new CreateTaskDTO(req.body);
            const task = await taskService.createTask(taskDTO, req.params.projectId, req.userId);
            return res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    async listTasks(req, res, next) {
        try {
            const tasks = await taskService.listTasks(req.params.projectId, req.userId);
            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async listTaskById(req, res, next) {
        try {
            const task = await taskService.getTaskById(req.params.taskId, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const statusDTO = new UpdateStatusTaskDTO(req.body);
            const task = await taskService.updateTaskStatus(req.params.taskId, statusDTO, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const taskDTO = new UpdateTaskDTO(req.body);
            const task = await taskService.updateTask(req.params.taskId, taskDTO, req.userId);
            return res.status(200).json(task);
        } catch (error) {
            next(error);
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