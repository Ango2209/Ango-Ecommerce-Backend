const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const validateMongoDbId = require("../utils/validateMongoDbId");

const { getAll } = require("./handlerFactory");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    // let products = [];
    // const user = await User.findById(_id);
    // // check if user already have product in cart
    // const alreadyExist = await Cart.findOne({ orderBy: user._id });
    // if (alreadyExist) {
    //   alreadyExist.remove();
    // }
    // for (let i = 0; i < cart.length; i++) {
    //   let object = {};
    //   object.product = cart[i]._id;
    //   object.count = cart[i].count;
    //   object.color = cart[i].color;
    //   let getPrice = await Product.findById(cart[i]._id).select("price").exec();
    //   object.price = getPrice.price;
    //   products.push(object);
    // }
    // let cartTotal = 0;
    // for (let i = 0; i < products.length; i++) {
    //   cartTotal = cartTotal + products[i].price * products[i].count;
    // }

    let newCart = await new Cart({
      orderBy: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    await User.findByIdAndUpdate(_id, { $push: { cart: newCart._id } });
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const cartItemId = req.params.cartItemId;
  validateMongoDbId(_id);

  try {
    const deleteProductFromCart = await Cart.deleteOne({
      _id: cartItemId,
      orderBy: _id,
    });
    if (deleteProductFromCart.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  const { newQuantity } = req.body;
  validateMongoDbId(_id);

  try {
    const cartItem = await Cart.findOne({
      _id: cartItemId,
      orderBy: _id,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ orderBy: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderBy: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Element("Invalid Coupon");
  }

  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderBy: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalAfterDiscount,
      paymentInfo,
      orderBy: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (err) {
    throw new Error(err);
  }

  // const { COD, couponApplied } = req.body;
  // const { _id } = req.user;
  // validateMongoDbId(_id);
  // try {
  //   if (!COD) throw new Error("Create cash order failed");
  //   const user = await User.findById(_id);
  //   let userCart = await Cart.findOne({ orderBy: user._id });

  //   let finalAmount = 0;
  //   if (couponApplied && userCart.totalAfterDiscount) {
  //     finalAmount = userCart.totalAfterDiscount;
  //   } else {
  //     finalAmount = userCart.cartTotal;
  //   }
  //   let newOrder = await new Order({
  //     products: userCart.products,
  //     paymentIntent: {
  //       id: uniqid(),
  //       method: "COD",
  //       amount: finalAmount,
  //       status: "Cash on Delivery",
  //       created: Date.now(),
  //       currency: "usd",
  //     },
  //     orderBy: user._id,
  //     orderStatus: "Cash on Delivery",
  //   }).save();

  //   let update = userCart.products.map((item) => {
  //     return {
  //       updateOne: {
  //         filter: { _id: item.product._id },
  //         update: { $inc: { quantity: -item.count, sold: +item.count } },
  //       },
  //     };
  //   });

  //   const updated = await Product.bulkWrite(update, {});
  //   res.json({ message: "success" });
  // } catch (error) {
  //   throw new Error(error);
  // }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const orders = await Order.find({ orderBy: _id })
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json({
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  getAllOrders,
  removeProductFromCart,
  updateProductQuantity,
};
