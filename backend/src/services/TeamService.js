import AddMemberResponseDTO from "../DTOs/team/AddMemberResponseDTO.js";
import CreateTeamResponseDTO from "../DTOs/team/CreateTeamResponseDTO.js";
import AppError from "../errors/AppError.js";
import Teams from "../models/Teams.js";
import User from "../models/User.js";
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

        return new CreateTeamResponseDTO(team);
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

    async addMember(memberDTO, teamId, userId) {
        const verifyTeam = await Teams.findByPk(teamId);
        if (!verifyTeam) { throw new AppError('Equipe não encontrada.', 404); }

        const membership = UserTeams.findOne({
            where: {
                userId: userId,
                teamId: teamId,
                role: 'admin',
            }
        });
        if (!membership) { throw new AppError('Você não tem permissão para adicionar membros a esta equipe.', 403); }

        const existingMember = await User.findOne({
            where: {
                email: memberDTO.email,
            }
        });
        if (!existingMember) { throw new AppError('O usuário que você está tentando adicionar não existe.', 404); }

        const userAlreadyMember = await UserTeams.findOne({
            where: {
                userId: existingMember.id,
                teamId: teamId,
            }
        });
        if (userAlreadyMember) { throw new AppError('O usuário já é membro desta equipe.', 400); }

        const newMember = await UserTeams.create({
            userId: existingMember.id,
            teamId: teamId,
            role: memberDTO.role,
        });
        return new AddMemberResponseDTO(newMember);
    }

    async listMembersTeam(teamId, userId) {
        const verifyTeam = await Teams.findByPk(teamId);
        if (!verifyTeam) { throw new AppError('Equipe não encontrada.', 404); }

        const verifyUserInTeam = await UserTeams.findOne({
            where: {
                userId: userId,
                teamId: teamId,
            }
        });
        if (!verifyUserInTeam) { throw new AppError('Você não tem permissão para visualizar os membros desta equipe.', 403); }

        const members = await UserTeams.findAll({
            where: {
                teamId: teamId,
            },
            attributes: ['role'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                }
            ],
        });
        return members;
    }
}

const teamService = new TeamService();
export default teamService;