import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import teamController from "../controllers/TeamController.js";

const teamRoutes = Router();

teamRoutes.post('/create', authMiddleware, teamController.register);
teamRoutes.get('/list', authMiddleware, teamController.listAll);
teamRoutes.post('/:teamId/add-member', authMiddleware, teamController.addMember);
teamRoutes.get('/:teamId/members', authMiddleware, teamController.listMembersTeam);

export default teamRoutes;