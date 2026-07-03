import CreateProjectDTO from "../DTOs/project/CreateProjectDTO.js";
import AppError from "../errors/AppError.js";
import projectService from "../services/ProjectServices.js";

class ProjectController {
    async register(req, res) {
        try {
            const projectDTO = new CreateProjectDTO(req.body);
            const project = await projectService.register(projectDTO, req.params.teamId, req.userId);
            return res.status(201).json(project);
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

    async listMyProjects(req, res) {
        try {
            const projects = await projectService.listMyProjects(req.userId, req.params.teamId);
            return res.status(200).json(projects);
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

const projectController = new ProjectController();
export default projectController;