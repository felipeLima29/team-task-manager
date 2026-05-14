import AppError from "../errors/AppError.js";
import User from "../models/User.js";
import { cryptPassword } from "../utils/hashPassword.js";

class AuthService {
    async register(userDto) {
        const userExists = await User.findOne({ where: { email: userDto.email } });
        if (userExists) {
            throw new AppError("User already exists", 400);
        }
        const hashPassword = await cryptPassword(userDto.password);

        const user = await User.create({
            ...userDto,
            password: hashPassword,
        });
        return user;
    }
}

const authService = new AuthService();
export default authService;