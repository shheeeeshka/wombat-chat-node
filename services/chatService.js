import chatModel from "../models/chat-model.js";

class ChatService {
    async createChat(firstId, secondId) {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });
        if (chat) return chat;

        const newChat = new chatModel({
            members: [firstId, secondId],
        });
        const response = await newChat.save();
        return response;
    }


    async findUserChats(userId) {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        });
        return chats;
    }

    async findChat(firstId, secondId) {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });
        return chat;
    }
}

export default new ChatService();