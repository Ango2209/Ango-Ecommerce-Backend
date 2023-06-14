const express = require("express");

const router = express.Router();
const {
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  getAllOrders,
  removeProductFromCart,
  updateProductQuantity,
} = require("../controller/orderController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");
const {
  checkout,
  paymentVerification,
} = require("../controller/paymentController");

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.get("/", getAllOrders);
router.post("/add-to-cart", authMiddleware, userCart);
router.post("/order/checkout", checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.put(
  "/update-from-cart/:cartItemId",
  authMiddleware,
  updateProductQuantity
);
router.delete(
  "/remove-from-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.post("/cash-order", authMiddleware, createOrder);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getmyorders", authMiddleware, getOrderByUserId);
module.exports = router;
