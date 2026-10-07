import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import paymentRouter from "./routes/payment.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors({
  origin:"*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Razorpay backend is running");
});

app.use("/api/v1/payments", paymentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
