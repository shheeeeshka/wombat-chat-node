import ApiError from "../exceptions/ApiError.js";
import messageModel from "../models/message-model.js";

class MessageService {
    async createMessage(chatId, senderId, text) {
        if (!chatId || !senderId) throw ApiError.BadRequest("Chat Id or sender is not specified");
        const msg = new messageModel({ chatId, senderId, text });
        const response = await msg.save();
        return response;
    }

    async getMessages(chatId) {
        if (!chatId) throw ApiError.BadRequest("Chat Id is not specified");
        const messages = await messageModel.find({ chatId });
        return messages;
    }
}

export default new MessageService();