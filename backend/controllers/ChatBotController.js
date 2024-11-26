import run from "../GeminiApi.js";
import { Chat } from "../models/Chats.js";
import { UserChat } from "../models/UserChats.js";
import jwt from 'jsonwebtoken';

const ChatBotController = async (req, res) => {
    const { text, userId } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Generate a response using Gemini API
        const mytext = await run(text);

        // Create a new chat document
        const newChat = new Chat({
            userId: userId,
            history: [{ role: "user", parts: [{ text }] }]
        });

        // Save the chat document
        const savedChat = await newChat.save();

        // Find existing user chats
        const userChats = await UserChat.find({ userId: userId });

        // If no user chats exist, create a new UserChat document
        if (!userChats.length) {
            const newUserChats = new UserChat({
                userId: userId,
                chats: [
                    {
                        _id: savedChat.id,
                        title: text
                    }
                ]
            });
            await newUserChats.save();
        } else {
            // If user chats exist, update the existing document
            await UserChat.updateOne(
                { userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat.id,
                            title: text
                        }
                    }
                }
            );
        }

        // Send back the generated response and chat ID
        return res.status(201).json({ response: mytext, chatId: newChat._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export { ChatBotController };
