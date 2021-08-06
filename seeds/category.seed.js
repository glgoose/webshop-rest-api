const Category = require("../models/category.model");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr) {
    try {
      const categ = await new Category({ title: titleStr });
      await categ.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("Closing connection");
    await mongoose.disconnect();
  }
  await seedCateg("Shoes");
  await seedCateg("Sweatshirts");
  await seedCateg("Backpacks");
  await seedCateg("Jackets");
  await seedCateg("Jeans");
  await seedCateg("Sandals");
  await closeDB();
}

seedDB();
