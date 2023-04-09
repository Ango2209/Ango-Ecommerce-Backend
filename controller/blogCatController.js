const blogCategory = require("../models/blogCatModel");

const {
  createOne,
  updateOne,
  getAll,
  deleteOne,
  getOne,
} = require("./handlerFactory");

const createBlogCategory = createOne(blogCategory);
const updateBlogCategory = updateOne(blogCategory);
const getAllBlogCategory = getAll(blogCategory);
const deleteBlogCategory = deleteOne(blogCategory);
const getBlogCategory = getOne(blogCategory);
module.exports = {
  createBlogCategory,
  updateBlogCategory,
  getAllBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
};
