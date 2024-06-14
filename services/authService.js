import bcrypt from "bcrypt";
import userModel from "../models/user-model.js";
import ApiError from "../exceptions/ApiError.js";
import validator from "validator";
import tokenService from "./tokenService.js";

class AuthService {
    async register(name, email, password) {
        if (!name || !email || !password) {
            throw ApiError.BadRequest("Empty field are not allowed");
        }
        if (!validator.isEmail(email)) {
            throw ApiError.BadRequest("Invalid email");
        }
        if (!validator.isStrongPassword(password)) {
            throw ApiError.BadRequest("Weak password");
        }
        let user = await userModel.findOne({ email });
        if (user) {
            throw ApiError.BadRequest("User already exists");
        }
        user = new userModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = tokenService.generateToken(user._id);
        return {
            user,
            token,
        }
    }

    async login(email, password) {
        let user = await userModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User doesn't exist");
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            throw ApiError.BadRequest("Incorrect password");
        }
        const token = await tokenService.generateToken(user._id);
        return {
            user,
            token,
        }
    }
}

export default new AuthService();