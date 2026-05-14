import LoginDTO from "../DTOs/auth/LoginDTO.js";
import RegisterDTO from "../DTOs/auth/RegisterDTO.js";
import AppError  from "../errors/AppError.js";
import authService from "../services/AuthServices.js";

class AuthController {
    async register(req, res) {
        try {
            const registerDTO = new RegisterDTO(req.body);
            const registerUser = await authService.register(registerDTO);
            return res.status(201).json(registerUser);
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

    async login(req, res) {
        try {
            const loginDTO = new LoginDTO(req.body);
            const loginUser = await authService.login(loginDTO);
            return res.status(200).json(loginUser);
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