const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ExpressError = require("../utils/ExpressError");

exports.search = async (req, res) => {
  const { q } = req.query;
  const searchedProducts = await Product.find({ title: { $regex: q, $options: "i" } })
    .sort("-createdAt")
    .populate("category")
    .exec();
  if (searchedProducts.length) {
    res.status(200).json({ message: "Product searched correctly", searchedProducts });
  } else {
    req.flash("error", "The product you are searching for does not exist");
    throw new ExpressError("The product you are searching for does not exist", 404);
  }
};

exports.filterByCategory = async (req, res) => {
  const { slug } = req.params;
  const foundCategory = await Category.findOne({ slug });
  const filteredProducts = await Product.find({ category: foundCategory.id }).sort("-createdAt").populate("category");
  res.status(200).json({ filteredProducts });
};
