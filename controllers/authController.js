import authService from "../services/authService.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await authService.register(name, email, password);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();