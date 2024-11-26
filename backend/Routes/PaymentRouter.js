import express from "express";
import { OrderController, VerifyController } from "../controllers/PaymentController.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/order", OrderController);

PaymentRouter.post("/verify", VerifyController);

export default PaymentRouter;