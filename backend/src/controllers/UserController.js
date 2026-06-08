import AppError from "../errors/AppError.js";
import userService from "../services/UserService.js";

class UserController {
    async getProfile(req, res) {
        try {
            console.log("controller entrou");

            return res.json({
                ok: true
            });
            const userId = req.userId;
            const user = await userService.getProfile(userId);

            return res.json(user);
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

const userController = new UserController();
export default userController;