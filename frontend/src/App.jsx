import axios from "axios";

function App() {
  const processPayment = async (paymentAmount) => {
    try {
      const { data: orderData } = await axios.post(
        "http://localhost:3000/api/v1/payments/create-order",
        {
          amount: paymentAmount,
        },
      );

      const paymentOrder = orderData.order;

      const checkoutConfig = {
        key: import.meta.env.VITE_API_RZP,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,

        name: "Payment Portal",
        description: "Demo Transaction",

        order_id: paymentOrder.id,

        handler: async (paymentResult) => {
          console.log("Payment Response:", paymentResult);

          try {
            const verificationResult = await axios.post(
              "http://localhost:3000/api/v1/payments/verify-payment",
              paymentResult,
            );

            if (verificationResult.data.success) {
              alert("Payment completed successfully!");
            } else {
              alert("Payment verification was unsuccessful.");
            }
          } catch (verificationError) {
            console.error("Payment Verification Error:", verificationError);
            alert("Unable to verify the payment.");
          }
        },

        prefill: {
          name: "Demo User",
          email: "demo.user@example.com",
          contact: "9000000000",
        },

        theme: {
          color: "#4F46E5",
        },
      };

      const paymentGateway = new window.Razorpay(checkoutConfig);
      paymentGateway.open();
    } catch (paymentError) {
      console.error("Payment Initialization Error:", paymentError);
      alert("Unable to initialize payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Choose Transaction
        </h1>

        <div className="space-y-3">
          <button
            onClick={() => processPayment(250)}
            className="w-full rounded-lg bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition"
          >
            ₹250
          </button>

          <button
            onClick={() => processPayment(500)}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            ₹500
          </button>

          <button
            onClick={() => processPayment(1000)}
            className="w-full rounded-lg bg-emerald-600 py-3 text-white font-medium hover:bg-emerald-700 transition"
          >
            ₹1000
          </button>

          <button
            onClick={() => processPayment(1500)}
            className="w-full rounded-lg bg-gray-800 py-3 text-white font-medium hover:bg-gray-900 transition"
          >
            ₹1500
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
