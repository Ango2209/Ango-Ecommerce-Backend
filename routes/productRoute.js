const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  // uploadProductImg,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleWare");
// const {
//   uploadPhoto,
//   productImgResize,
// } = require("../middlewares/uploadImages");
const router = express.Router();
// router.put(
//   "/upload/:id",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImgResize,
//   uploadProductImg
// );
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getAllProduct);

module.exports = router;
