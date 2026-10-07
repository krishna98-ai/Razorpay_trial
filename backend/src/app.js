import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin:"*"
}))
app.get("/", (req, res) => {
  res.send("hi sirji");
});

import paymentRouter from "./routes/payment.routes.js";
app.use("/api/v1/payments", paymentRouter);

export default app;
