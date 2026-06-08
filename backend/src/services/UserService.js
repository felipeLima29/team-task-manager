import User from "../models/User.js";

class UserService {
    async getProfile(userId) {
        const list = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email']
        });
        return list;
    }
}

const userService = new UserService();
export default userService;