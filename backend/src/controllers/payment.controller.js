import crypto from "crypto";
import paymentClient from "../config/razorpay.js";

const generateOrder = async (req, res) => {
  try {
    const { amount: paymentAmount } = req.body;

    const orderDetails = {
      amount: paymentAmount * 100,
      currency: "INR",
      receipt: `payment_${Date.now()}`,
    };

    const createdOrder = await paymentClient.orders.create(orderDetails);

    return res.status(200).json({
      success: true,
      order: createdOrder,
    });
  } catch (orderError) {
    console.error("Order Creation Error:", orderError);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id: orderReference,
      razorpay_payment_id: paymentReference,
      razorpay_signature: paymentSignature,
    } = req.body;

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderReference}|${paymentReference}`)
      .digest("hex");

    if (calculatedSignature === paymentSignature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (verificationError) {
    console.error("Payment Confirmation Error:", verificationError);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { generateOrder, confirmPayment };
