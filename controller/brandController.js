const Brand = require("../models/brandModel.js");

const {
  createOne,
  updateOne,
  getAll,
  deleteOne,
  getOne,
} = require("./handlerFactory");

const createBrand = createOne(Brand);
const updateBrand = updateOne(Brand);
const getAllBrand = getAll(Brand);
const deleteBrand = deleteOne(Brand);
const getBrand = getOne(Brand);
module.exports = {
  createBrand,
  updateBrand,
  getAllBrand,
  deleteBrand,
  getBrand,
};
