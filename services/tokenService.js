import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

class TokenService {
    async generateToken(_id) {
        return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    }
}

export default new TokenService();