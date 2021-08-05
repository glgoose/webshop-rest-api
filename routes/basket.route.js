const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Basket = require("../controllers/basket.controller");

router
  .route("/:productId")
  .post(isLoggedIn, catchAsync(Basket.addToBasket))
  .delete(isLoggedIn, catchAsync(Basket.removeFromBasket));

module.exports = router;
