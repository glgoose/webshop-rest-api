if (process.env.NODE_ENV !== "production") require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/webshop";
    await mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;
