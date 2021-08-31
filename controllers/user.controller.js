const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Basket = require("../models/basket.model");
const ExpressError = require("../utils/ExpressError");

exports.login = (req, res) => {
  try {
    const { firstName, lastName } = req.user;
    res.status(200).json({ message: "Logged in succesfully", loggedInUser: `${firstName} ${lastName}` });
  } catch (err) {
    throw new ExpressError("Incorrect credentials!", 401);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, firstName, lastName });
    req.login(user, function (err) {
      if (err) return next(err);
      res.status(201).json({ message: "User succesfully registered!", registeredUser: `${firstName} ${lastName}` });
    });
    await Basket.create({ userId: req.user._id });
  } catch (err) {
    throw new ExpressError("User already exists!", 409);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: "User succesfully logged out!" });
};
