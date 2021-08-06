const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Basket = require("../models/basket.model");
const ExpressError = require("../utils/ExpressError");

exports.login = (req, res) => {
  const { firstName, lastName } = req.user;
  req.flash("success", `Welcome ${firstName}`);
  res.status(200).json({ message: "Logged in succesfully", loggedInUser: `${firstName} ${lastName}` });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, firstName, lastName });
    req.login(user, function (err) {
      if (err) return next(err);
      req.flash("success", "User succesfully registered!!");
      res.status(201).json({ message: "User succesfully registered!", registeredUser: `${firstName} ${lastName}` });
    });
    await Basket.create({ userId: req.user._id });
  } catch (err) {
    req.flash("error", "User already exists!");
    throw new ExpressError("User already exists!", 409);
  }
};

exports.logout = (req, res) => {
  const { firstName, lastName } = req.user;
  req.logout();
  req.flash("success", `Bye bye ${firstName}`);
  res.status(200).json({ message: "User succesfully logged out!", loggedOutUser: `${firstName} ${lastName}` });
};
