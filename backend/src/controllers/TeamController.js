import AddMemberDTO from "../DTOs/team/AddMemberDTO.js";
import CreateTeamDTO from "../DTOs/team/CreateTeamDTO.js";
import AppError from "../errors/AppError.js";
import teamService from "../services/TeamService.js";

class TeamController {
    async register(req, res, next) {
        try {
            const createTeamDTO = new CreateTeamDTO(req.body);
            const createTeam = await teamService.register(createTeamDTO, req.userId);
            return res.status(201).json(createTeam);
        } catch (error) {
            next(error);
        }
    }

    async listAll(req, res, next) {
        try {
            const teams = await teamService.listAll(req.userId);
            return res.json(teams);
        } catch (error) {
            next(error);
        }
    }

    async addMember(req, res, next) {
        try {
            const memberDTO = new AddMemberDTO(req.body);
            const addedMember = await teamService.addMember(memberDTO, req.params.teamId, req.userId);
            return res.status(201).json(addedMember);
        } catch (error) {
            next(error);
        }
    }

    async listMembersTeam(req, res, next) {
        try {
            const members = await teamService.listMembersTeam(req.params.teamId, req.userId);
            return res.json(members);
        } catch (error) {
            next(error);
        }
    }
}

const teamController = new TeamController();
export default teamController;