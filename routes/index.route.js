const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");
const Index = require("../controllers/index.controller");

router.get("/search", catchAsync(Index.search));

router.post("/filter/:slug", catchAsync(Index.filterByCategory));

router.post("/checkout", isLoggedIn, catchAsync(Index.checkout));

module.exports = router;
