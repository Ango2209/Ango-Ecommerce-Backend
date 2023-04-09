const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
  getCategory,
} = require("../controller/categoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
module.exports = router;
