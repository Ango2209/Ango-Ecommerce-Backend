const express = require("express");
const router = express.Router();
const {
  createBrand,
  updateBrand,
  getAllBrand,
  deleteBrand,
  getBrand,
} = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.get("/", getAllBrand);
router.get("/:id", getBrand);
router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
module.exports = router;
