import { Signup } from "../models/Signup.js";
import { UserChat } from "../models/UserChats.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Signup.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "User already exist, you can login", success: false })
        }
        const userModel = new Signup({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: "Signup successful", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false })
        console.log("Server error", error);

    }
}

const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await Signup.findOne({ email })
        const msg = "Authentication failed, email or password is wrong";

        if (!user) {
            return res.status(403).json({ message: msg, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        
        if (!isPassEqual) {
            return res.status(403).json({ message: msg, success: false })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        return res.status(200).json(
            {
                message: "Logged In successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                userId: user._id
            }
        )

    } catch (error) {
        console.log("Server error", error);
        return res.status(500).json({ message: "Internal server error", success: false })

    }
}

const UserChatsController = async (req, res) => {
    const { userId } = req.query; // Use req.query to get query parameters
    if (!userId) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }

    try {
        const userChats = await UserChat.find({ userId });

        if (userChats.length === 0) {
            return res.status(404).json({ message: "No chats found for this user", success: false });
        }

        return res.status(200).json(userChats[0].chats);
    } catch (error) {
        console.log("Userchats ERROR", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


export { SignupController, LoginController, UserChatsController };