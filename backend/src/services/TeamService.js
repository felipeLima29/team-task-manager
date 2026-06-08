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
}

const teamService = new TeamService();
export default teamService;