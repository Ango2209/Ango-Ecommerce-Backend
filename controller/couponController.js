const Coupon = require("../models/couponModel.js");
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");

const createCoupon = createOne(Coupon);
const getAllCoupon = getAll(Coupon);
const getCoupon = getOne(Coupon);
const deleteCoupon = deleteOne(Coupon);
const updateCoupon = updateOne(Coupon);
module.exports = {
  createCoupon,
  getAllCoupon,
  getCoupon,
  deleteCoupon,
  updateCoupon,
};
