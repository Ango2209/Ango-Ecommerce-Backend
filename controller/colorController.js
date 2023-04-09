const Color = require("../models/colorModel");

const {
  createOne,
  updateOne,
  getAll,
  deleteOne,
  getOne,
} = require("./handlerFactory");

const createColor = createOne(Color);
const updateColor = updateOne(Color);
const getAllColor = getAll(Color);
const deleteColor = deleteOne(Color);
const getColor = getOne(Color);
module.exports = {
  createColor,
  updateColor,
  getAllColor,
  deleteColor,
  getColor,
};
