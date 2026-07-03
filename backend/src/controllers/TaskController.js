import CreateTaskDTO from "../DTOs/task/CreateTaskDTO.js";
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
}

const taskController = new TaskController();
export default taskController;