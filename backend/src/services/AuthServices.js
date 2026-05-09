import { AppError } from "../errors/AppError.js";
import User from "../models/User.js";

class AuthService {
    async register(userDto) {
        const userExists = await User.findOne({ where: { email: userDto.email } });
        if (userExists) {
            throw new AppError("User already exists", 400);
        }
        const user = await User.create(userDto);
        return user;
    }
}

const authService = new AuthService();
export default authService;