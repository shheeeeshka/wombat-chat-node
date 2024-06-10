import userModel from "../models/user-model.js";

class UserService {
    async findUser(userId) {
        const user = await userModel.findById(userId);
        return user;
    }

    async getUsers() {
        const users = await userModel.find();
        return users;
    }
}

export default new UserService();