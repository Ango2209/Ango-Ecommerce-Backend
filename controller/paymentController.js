const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_2p6u29C39pkW2Q",
  key_secret: "ALsUj9JuRkOlpV8efYxzAZTv",
});

const checkout = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "VND",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
