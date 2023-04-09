const express = require("express");
const router = express.Router();
const {
  createBlogCategory,
  updateBlogCategory,
  getAllBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
} = require("../controller/blogCatController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.get("/", getAllBlogCategory);
router.get("/:id", getBlogCategory);
router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);
module.exports = router;
