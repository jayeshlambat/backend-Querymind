import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';
import router from "./Routes/AuthUser.js";
import chatBotRouter from "./Routes/ChatbotRouter.js";
import MongoConnect from "./db/Db.js";
import PaymentRouter from "./Routes/PaymentRouter.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(bodyParser.json());
app.use("/api", router);
app.use("/", chatBotRouter);
app.use("/payment", PaymentRouter);

// Connect to MongoDB
MongoConnect();

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
