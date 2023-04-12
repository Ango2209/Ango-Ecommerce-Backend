const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");
const blogCatRoute = require("./routes/blogCatRoute.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const blogRouter = require("./routes/blogRoutes");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const colorRouter = require("./routes/colorRoute");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoute");
const enqRouter = require("./routes/enqRoute");
const cors = require("cors");
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogCategory", blogCatRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/order", orderRouter);
app.use("/api/upload", uploadRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
