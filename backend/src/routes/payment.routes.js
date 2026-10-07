import express from "express";

import {
  generateOrder,
  confirmPayment,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", generateOrder);

paymentRouter.post("/verify-payment", confirmPayment);

export default paymentRouter;
