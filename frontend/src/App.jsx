import axios from "axios";

function App() {
  const handlePayment = async (amount) => {
    try {
    
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/payments/create-order",
        {
          amount
        }
      );

      const order = data.order;

      
      const options = {
        key: import.meta.env.VITE_API_RZP,

        amount: order.amount,
        currency: order.currency,

        name: "Razorpay Learning",
        description: "Test Payment",

        order_id: order.id,

        handler: async function (response) {
          console.log("Razorpay Response:", response);

          try {
            
            const verifyResponse = await axios.post(
              "http://localhost:3000/api/v1/payments/verify-payment",
              response,
            );

            if (verifyResponse.data.success) {
              alert("Payment Successful ");
            } else {
              alert("Payment Verification Failed ");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed ");
          }
        },

        prefill: {
          name: "Krishna",
          email: "krishnapandit98329@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);

      alert("Unable to start payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-3xl">💳</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Razorpay Payment</h1>

        <p className="text-gray-500 mt-2 mb-6">Select an amount to continue</p>

        <div className="space-y-3">
          <button
            onClick={() => handlePayment(500)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Pay ₹500
          </button>

          <button
            onClick={() => handlePayment(1000)}
            className="w-full py-3 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Pay ₹1000
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}

export default App;
