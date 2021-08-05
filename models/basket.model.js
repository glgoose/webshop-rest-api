const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const basketSchema = new Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      title: {
        type: String,
      },
      qty: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
  totalQty: {
    type: Number,
    default: 0,
    required: true,
  },
  totalCost: {
    type: Number,
    default: 0,
    required: true,
  },
  userId: String,
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
