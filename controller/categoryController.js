const Category = require("../models/categoryModel");

const {
  createOne,
  updateOne,
  getAll,
  deleteOne,
  getOne,
} = require("./handlerFactory");

const createCategory = createOne(Category);
const updateCategory = updateOne(Category);
const getAllCategory = getAll(Category);
const deleteCategory = deleteOne(Category);
const getCategory = getOne(Category);
module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
  getCategory,
};
