import { Router } from "express";
import messageController from "../controllers/messageController.js";

const router = new Router();

router.post("/", messageController.createMessage);
router.get("/:chatId", messageController.getMessages);

export default router;