if (process.env.NODE_ENV !== "production") require("dotenv").config();
const config = require("config");

const mongoose = require("mongoose");

const connectDB = async () => {
  const db = config.get("db");
  try {
    const dbUrl = process.env.DB_URL || db;
    await mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log(`Connected to ${db}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;
