const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../controllers/user.controller");
const { validateLogin, validateRegister } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.post("/login", passport.authenticate("local"), validateLogin, User.login);

router.post("/register", validateRegister, catchAsync(User.register));

router.get("/logout", User.logout);

module.exports = router;
