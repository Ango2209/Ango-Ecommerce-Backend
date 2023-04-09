const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserController,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatedPassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare");

router.post("/register", createUser);
router.put("/save-address", authMiddleware, saveAddress);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdmin);
router.put("/password", authMiddleware, updatedPassword);
router.get("/all-users", getAllUser);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/refresh", handleRefreshToken);
router.put("/edit-user", authMiddleware, updateUser);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblocked-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
