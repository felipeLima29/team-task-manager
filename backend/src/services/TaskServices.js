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

    async getTaskById(taskId, userID) {
        const task = await Tasks.findByPk(taskId);
        if (!task) { throw new AppError('Tarefa não encontrada', 404); } // 1

        const projectOfTask = task.projectId; // 2

        const teamOfTask = await Projects.findByPk(projectOfTask);
        if (!teamOfTask) { throw new AppError('Projeto da tarefa não encontrado', 404); } // 3

        const verifyProject = await Projects.findByPk(projectOfTask);
        if (!verifyProject) { throw new AppError('Projeto não encontrado', 404); } 

        const verifyUserInTeam = await UserTeams.findOne({ // 4
            where: {
                userId: userID,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Usuário não pertence à equipe do projeto', 403); }

        const taskDetails = await Tasks.findAll({
            where: { id: taskId },
            attributes: ['id', 'title', 'description', 'status'],
            include: [
                {
                    model: Projects,
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['id', 'name', 'email'],
                }
            ]
        });
        return taskDetails;
    }

    async updateTaskStatus(taskId, statusDTO, userId) {
        const verifyTask = await Tasks.findByPk(taskId, {
            attributes: ['id', 'title', 'description', 'status', 'projectId'],
        });
        if (!verifyTask) { throw new AppError('Tarefa não encontrada', 404); }
        const projectOfTask = verifyTask.projectId;

        const verifyProject = await Projects.findByPk(projectOfTask);
        if (!verifyProject) { throw new AppError('Projeto não encontrado', 404); }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Usuário não pertence à equipe do projeto', 403); }

        verifyTask.status = statusDTO.status;
        await verifyTask.save();
        return verifyTask;
    }

    async updateTask(taskId, taskDTO, userId) {
        const verifyTask = await Tasks.findByPk(taskId, {
            attributes: ['id', 'title', 'description', 'status', 'projectId', 'assignedTo'],
        });
        if (!verifyTask) { throw new AppError('Tarefa não encontrada', 404); }
        const projectOfTask = verifyTask.projectId;

        const verifyProject = await Projects.findByPk(projectOfTask);
        if (!verifyProject) { throw new AppError('Projeto não encontrado', 404); }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Usuário não pertence à equipe do projeto', 403); }

        if(taskDTO.title) {
            verifyTask.title = taskDTO.title;
        }
        if(taskDTO.description) {
            verifyTask.description = taskDTO.description;
        }
        if(taskDTO.assignedTo) {
            verifyTask.assignedTo = taskDTO.assignedTo;
        }
        await verifyTask.save();
        return verifyTask;
    }

    async deleteTask(taskId, userId) {
        const verifyTask = await Tasks.findByPk(taskId, {
            attributes: ['id', 'title', 'description', 'status', 'projectId'],
        });
        if (!verifyTask) { throw new AppError('Tarefa não encontrada', 404); }
        const projectOfTask = verifyTask.projectId;

        const verifyProject = await Projects.findByPk(projectOfTask);
        if (!verifyProject) { throw new AppError('Projeto não encontrado', 404); }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId: verifyProject.teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Usuário não pertence à equipe do projeto', 403); }

        await verifyTask.destroy();
        return { message: "Tarefa deletada com sucesso." };
    }
}

const taskService = new TaskService();
export default taskService;