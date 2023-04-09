const express = require("express");
const router = express.Router();
const {
  createColor,
  updateColor,
  getAllColor,
  deleteColor,
  getColor,
} = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.get("/", getAllColor);
router.get("/:id", getColor);
router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
module.exports = router;
