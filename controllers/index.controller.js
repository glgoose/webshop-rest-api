const Product = require("../models/product.model");
const Basket = require("../models/basket.model");
const Order = require("../models/order.model");
const Category = require("../models/category.model");
const ExpressError = require("../utils/ExpressError");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").populate("category");
  res.status(200).json({ message: "All products displayed correctly!", products });
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({}).sort("-createdAt").populate("category");
  res.status(200).json({ message: "All categories displayed correctly!", categories });
};

exports.search = async (req, res) => {
  const { q } = req.query;
  const searchedProducts = await Product.find({ title: { $regex: q, $options: "i" } })
    .sort("-createdAt")
    .populate("category")
    .exec();
  if (searchedProducts.length) {
    res.status(200).json({ message: "Product searched correctly!", searchedProducts });
  } else {
    req.flash("error", "The product you are searching for does not exist");
    throw new ExpressError("The product you are searching for does not exist!", 404);
  }
};

exports.filterByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = await Product.find({ category: categoryId }).sort("-createdAt").populate("category");
  res.status(200).json({ filteredProducts });
};

exports.checkout = async (req, res) => {
  const { address } = req.body;
  const basket = await Basket.findOne({ userId: req.user._id });
  if (basket.products.length) {
    const { totalQty, totalCost, products } = basket;
    const order = new Order({
      basket: {
        totalQty,
        totalCost,
        products,
      },
      address,
    });
    await order.save();
    await Basket.findByIdAndUpdate(basket._id, {
      totalQty: 0,
      totalCost: 0,
      products: [],
    });
    req.flash("success", "Successfully purchased!");
    res.status(200).json({ message: "Successfully purchased!", order });
  } else {
    req.flash("error", "Cannot proceed with checkout, your basket is empty!");
    throw new ExpressError("Cannot proceed with checkout, your basket is empty!", 400);
  }
};
