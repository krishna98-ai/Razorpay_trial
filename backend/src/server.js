import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import paymentRouter from "./routes/payment.routes.js";

dotenv.config({
  path: "./.env",
});

const server = express();

server.use(
  cors({
    origin: "*",
  }),
);

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Payment server is running");
});

server.use("/api/v1/payments", paymentRouter);

const serverPort = process.env.PORT || 5000;

server.listen(serverPort, () => {
  console.log(`Server started on port ${serverPort}`);
});
