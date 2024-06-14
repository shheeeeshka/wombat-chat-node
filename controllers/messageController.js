import messageService from "../services/messageService.js";

class MessageController {
    async createMessage(req, res, next) {
        try {
            const { chatId, senderId, text } = req.body;
            const response = await messageService.createMessage(chatId, senderId, text);
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }

    async getMessages(req, res, next) {
        try {
            const { chatId } = req.params;
            const messages = await messageService.getMessages(chatId);
            return res.json(messages);
        } catch (err) {
            next(err);
        }
    }
}

export default new MessageController();