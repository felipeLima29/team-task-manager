import RegisterDTO from "../DTOs/auth/RegisterDTO.js";
import AppError  from "../errors/AppError.js";
import authService from "../services/AuthServices.js";

class AuthController {
    async register(req, res) {
        try {
            const registerDTO = new RegisterDTO(req.body);
            const userExists = await authService.register(registerDTO);
            return res.status(201).json(userExists);
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

const authController = new AuthController();
export default authController;