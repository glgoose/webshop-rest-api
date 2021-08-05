const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Index = require("../controllers/index.controller");

router.get("/search", catchAsync(Index.search));

router.post("/filter/:slug", catchAsync(Index.filterByCategory));

module.exports = router;
