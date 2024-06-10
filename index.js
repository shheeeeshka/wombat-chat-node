import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import router from "./routes/router.js"
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use("/", router)
app.use(ErrorHandlingMiddleware);

const launchServer = () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}\n`));
        mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`Mongodb connection established\n`))
            .catch(err => console.log(`An error occured while connecting to mongodb ${err.message}\n`));
    } catch (err) {
        console.log(err);
    }
}

launchServer();