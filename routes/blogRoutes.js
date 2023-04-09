const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  // uploadBlogImg,
} = require("../controller/blogController");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
// router.put(
//   "/upload/:id",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   blogImgResize,
//   uploadBlogImg
// );
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/like", authMiddleware, isAdmin, likeBlog);
router.put("/dislike", authMiddleware, isAdmin, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
