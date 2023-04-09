const express = require("express");

const router = express.Router();
const {
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controller/orderController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.get("/", getAllOrders);
router.post("/add-to-cart", authMiddleware, userCart);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.post("/cash-order", authMiddleware, createOrder);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/get-ordersByAnUser", authMiddleware, getOrders);
module.exports = router;
