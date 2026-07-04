import CreateProjectDTO from "../DTOs/project/CreateProjectDTO.js";
import AppError from "../errors/AppError.js";
import projectService from "../services/ProjectServices.js";

class ProjectController {
    async register(req, res, next) {
        try {
            const projectDTO = new CreateProjectDTO(req.body);
            const project = await projectService.register(projectDTO, req.params.teamId, req.userId);
            return res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    }

    async listMyProjects(req, res, next) {
        try {
            const projects = await projectService.listMyProjects(req.userId, req.params.teamId);
            return res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    }
}

const projectController = new ProjectController();
export default projectController;