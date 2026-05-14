import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import User from "../models/User.js";
import authConfig from "../config/auth.js";
import { cryptPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";

class AuthService {
    async register(userDto) {
        const userExists = await User.findOne({ where: { email: userDto.email } });
        if (userExists) {
            throw new AppError("Usuário já existe", 400);
        }
        const hashPassword = await cryptPassword(userDto.password);

        const user = await User.create({
            ...userDto,
            password: hashPassword,
        });

        const { password, ...userWithoutPassword } = user.toJSON();

        return userWithoutPassword;
    }

    async login(userDto) {
        const user = await User.findOne({ where: { email: userDto.email } });
        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }
        const isPasswordValid =  comparePassword(userDto.password, user.password)

        if(!isPasswordValid) {
            throw new AppError("Senha errada.", 401);
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            authConfig.jwt.secret,
            {
                expiresIn: authConfig.jwt.expiresIn,
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        }
    }
}

const authService = new AuthService();
export default authService;