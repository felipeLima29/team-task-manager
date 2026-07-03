import AppError from "../errors/AppError.js";
import Projects from "../models/Projects.js";
import Teams from "../models/Teams.js";
import UserTeams from "../models/UserTeams.js";

class ProjectService {
    async register(dto, teamId, userId) {
        const verifyTeam = await Teams.findByPk(teamId);

        if (!verifyTeam) {
            throw new AppError("Time não encontrado", 404);
        }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId,
                teamId,
            }
        });
        
        if (!verifyUserInTeam) {
            throw new AppError("Usuário não pertence a este time", 403);
        }

        const project = await Projects.create({
            name: dto.name,
            teamId: teamId,
        });
        return project;
    }
}

const projectService = new ProjectService();
export default projectService;