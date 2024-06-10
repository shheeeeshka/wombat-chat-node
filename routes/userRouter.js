import { Router } from "express";
import userController from "../controllers/userController.js";

const router = new Router();

router.get("/find/:userId", userController.findUser);
router.get("/", userController.getUsers);

export default router;