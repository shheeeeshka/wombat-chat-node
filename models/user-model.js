import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 250,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;