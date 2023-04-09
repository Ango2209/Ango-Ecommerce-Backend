const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", getAllCoupon);
router.get("/:id", getCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
module.exports = router;
