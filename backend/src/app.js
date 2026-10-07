import express from "express";
import cors from "cors";

import paymentRouter from "./routes/payment.routes.js";

const serverApp = express();

serverApp.use(
  cors({
    origin: "*",
  }),
);

serverApp.use(express.json());

serverApp.get("/", (req, res) => {
  res.send("Payment service is running");
});

serverApp.use("/api/v1/payments", paymentRouter);

export default serverApp;
