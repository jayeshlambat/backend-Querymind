import express from "express";
import { EnsureAuthenticated } from "../middlewares/Auth.js";
import { ChatBotController } from "../controllers/ChatBotController.js";

const chatBotRouter = express.Router();

chatBotRouter.post("/chatbot", EnsureAuthenticated, ChatBotController);

export default chatBotRouter;