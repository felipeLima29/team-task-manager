import AddMemberDTO from "../DTOs/team/AddMemberDTO.js";
import CreateTeamDTO from "../DTOs/team/CreateTeamDTO.js";
import AppError from "../errors/AppError.js";
import teamService from "../services/TeamService.js";

class TeamController {
    async register(req, res) {
        try {
            const createTeamDTO = new CreateTeamDTO(req.body);
            const createTeam = await teamService.register(createTeamDTO, req.userId);
            return res.status(201).json(createTeam);
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

    async listAll(req, res) {
        try {
            const teams = await teamService.listAll(req.userId);
            return res.json(teams);
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

    async addMember(req, res) {
        try {
            const memberDTO = new AddMemberDTO(req.body);
            const addedMember = await teamService.addMember(memberDTO, req.params.teamId, req.userId);
            return res.status(201).json(addedMember);

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

    async listMembersTeam(req, res) {
        try {
            const members = await teamService.listMembersTeam(req.params.teamId, req.userId);
            return res.json(members);
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

const teamController = new TeamController();
export default teamController;