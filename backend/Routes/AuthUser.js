import express from "express";
import { LoginValidation, SignUpValidation } from "../middlewares/AuthValidation.js";
import { LoginController, SignupController, UserChatsController } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", SignUpValidation, SignupController);

router.post("/login", LoginValidation, LoginController);

router.get("/userchats", UserChatsController);

export default router;
