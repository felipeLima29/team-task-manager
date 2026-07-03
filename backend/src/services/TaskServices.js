import AppError from "../errors/AppError.js";
import Projects from "../models/Projects.js";
import Tasks from "../models/Tasks.js";
import User from "../models/User.js";
import UserTeams from "../models/UserTeams.js";

class TaskService {
    async createTask(taskDTO, projectId, userId) {
        const verifyProject = await Projects.findByPk(projectId);
        if (!verifyProject) {
            throw new AppError('Projeto não encontrado', 404);
        }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) {
            throw new AppError('Usuário não pertence à equipe do projeto', 403);
        }

        const verifyUser = await User.findByPk(userId);
        if (!verifyUser) {
            throw new AppError('Usuário não encontrado', 404);
        }
        
        const verifyUserAssigned = await UserTeams.findOne({
            where: {
                userId: taskDTO.assignedTo,
                teamId: verifyProject.teamId,
            }
        });
        console.log('verifyUserAssigned:', verifyUserAssigned);
        if (!verifyUserAssigned) {
            throw new AppError('Usuário atribuído não pertence à equipe do projeto', 403);
        }

        const task = await Tasks.create({
            title: taskDTO.title,
            description: taskDTO.description,
            status: taskDTO.status,
            projectId: projectId,
            assignedTo: taskDTO.assignedTo,
        })
        return task;
    }

    async listTasks(projectId, userId) {
        const verifyProject = await Projects.findByPk(projectId);
        if (!verifyProject) { throw new AppError('Projeto não encontrado', 404); }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Usuário não pertence à equipe do projeto', 403); }

        const tasks = await Tasks.findAll({
            where: { projectId },
            attributes: ['id', 'title', 'description', 'status', 'assignedTo'],
        });
        return tasks;
    }
}

const taskService = new TaskService();
export default taskService;