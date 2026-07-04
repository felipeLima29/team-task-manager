import LoginDTO from "../DTOs/auth/LoginDTO.js";
import RegisterDTO from "../DTOs/auth/RegisterDTO.js";
import AppError  from "../errors/AppError.js";
import authService from "../services/AuthServices.js";

class AuthController {
    async register(req, res, next) {
        try {
            const registerDTO = new RegisterDTO(req.body);
            const registerUser = await authService.register(registerDTO);
            return res.status(201).json(registerUser);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const loginDTO = new LoginDTO(req.body);
            const loginUser = await authService.login(loginDTO);
            return res.status(200).json(loginUser);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
export default authController;