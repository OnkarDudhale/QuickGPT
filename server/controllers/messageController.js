import Chat from "../models/Chat.js";
import genAI from '../configs/gemini.js';

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        const { chatId, prompt } = req.body;

        // Find chat
        const chat = await Chat.findOne({ userId, _id: chatId });
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // --- Core Application Logic ---

        // Prepare conversation history FOR THE API (Exclude the new prompt)
        const historyForAPI = chat.messages
            .map(msg => ({
                role: msg.role === 'assistant' ? 'model' : msg.role,
                parts: [{ text: msg.content }],
            }));

        // Start the chat session with the EXISTING history
        const modelInstance = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const chatSession = modelInstance.startChat({ history: historyForAPI });

        // Send the new prompt and extract content
        const result = await chatSession.sendMessage(prompt);
        // FIX: Use the .text() method for guaranteed string extraction
        const text = result.response.text();


        // Define user message (FOR DATABASE)
        const userMessage = {
            role: 'user',
            content: prompt,
            timeStamp: Date.now(),
            isImage: false,
        };

        // Prepare assistant reply (FOR DATABASE & RESPONSE)
        const reply = {
            role: 'assistant',
            // CRUCIAL: Ensure the content is here
            content: text,
            timeStamp: Date.now(),
            isImage: false,
        };

        // Save BOTH messages to the database
        chat.messages.push(userMessage);
        chat.messages.push(reply);
        await chat.save();

        // Respond
        return res.status(200).json({ success: true, reply });

    } catch (error) {
        console.error("Gemini/DB Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

