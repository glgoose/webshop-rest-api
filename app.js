if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");

const userRoute = require("./routes/user.route");
const basketRoute = require("./routes/basket.route");
const indexRoute = require("./routes/index.route");

const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/webshop";
const secret = process.env.SECRET || "thisshouldbeabettersecret!";

connectDB();

const app = express();

app.use(
  session({
    store: MongoStore.create({ mongoUrl: dbUrl, touchAfter: 24 * 60 * 60 }),
    name: "session",
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan("dev"));

app.use("/user", userRoute);
app.use("/basket", basketRoute);
app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.send("Hello from Webshop Rest API!");
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";
  res.status(statusCode).json({ error: err.message });
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

module.exports = server;
