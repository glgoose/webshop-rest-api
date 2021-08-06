const Product = require("../models/product.model");

exports.getAllProducts = (req, res, next) => {
  const products = await Product.find({}).sort("-createdAt").populate("category");
  res.status(200).json({ message: "All product displayed correctly!", products });
};
