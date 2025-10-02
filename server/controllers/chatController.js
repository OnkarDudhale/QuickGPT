// API controller for creating chat

import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: 'New Chat',
            userName: req.user.name
        }
        await Chat.create(chatData);
        res.json({ success: true, message: 'Chat created' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API controller for getting chat

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        res.json({ success: true, chats })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API controller for delete chat

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.body;

        await Chat.deleteOne({ _id: chatId, userId })
        res.json({ success: true, message: 'Chat deleted ' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

