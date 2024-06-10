import userService from "../services/userService.js";

class UserController {
    async findUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await userService.findUser(userId);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();