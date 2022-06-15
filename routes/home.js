/*
    Home page contains a dynamic table for worst/best perform stocks for the S&P500.
    TODO. add functionallity to contain DOW, NasDaq
*/
const express = require("express");
const router = express.Router();
const _getStockData = require("../public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");

router.use(_bodyParser.urlencoded({ extended: true }));

router.get("/", getWorstStockData, (req, res) => {});

// Will Update
router.post("/", getWorstStockData, (req, res) => {});

async function getWorstStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.render("index.ejs", {
    stock: arr[1],
    selectValue: Number(req.body.numberofstockselect),
  });
  res.status(200);
  next();
}

async function getBestStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.render("index2", {
    stock: arr[0],
    selectValue: Number(req.body.numberofstockselect),
  });
  res.status(200);
  next();
}

module.exports = router;
