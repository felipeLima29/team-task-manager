import Teams from "../models/Teams.js";
import UserTeams from "../models/UserTeams.js";

class TeamService {
    async register(dto, userId) {
        const team = await Teams.create({
            name: dto.name,
        });

        await UserTeams.create({
            userId: userId,
            teamId: team.id,
            role: 'admin',
        });

        return team;
    }

    async listAll(userId) {
        const teams = await Teams.findAll({
            attributes: ['id', 'name'],
            
            include: [
                {
                    model: UserTeams,
                    where: {
                        userId,
                    },
                    attributes: ['role'],
                }
            ]
        });
        return teams;
    }
}

const teamService = new TeamService();
export default teamService;