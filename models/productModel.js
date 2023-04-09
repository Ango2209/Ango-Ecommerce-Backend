const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: { type: String },
    quantity: { type: Number, required: true, select: false },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    image: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: Number,
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", ProductSchema);
