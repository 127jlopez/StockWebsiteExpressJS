/*
    Home page contains a dynamic table for worst/best perform stocks for the S&P500.
    TODO. add functionallity to contain DOW, NasDaq
*/
const express = require("express");
const router = express.Router();
const _getStockData = require("../public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");

router.use(_bodyParser.urlencoded({ extended: true }));

router.get("/getworststockdata", getWorstStockData, (req, res) => {
  //res.send("ExpressJS is connected to ReactJS");
});

router.get("/getbeststockdata", getBestStockData, (req, res) => {
  res.send("ExpressJS is connected to ReactJS");
});

// Will Update to return S&P500, DOW, & NasDaq stock list
router.post("/getworststockdata", getWorstStockData, (req, res) => {});
router.post("/getbeststockdata", getBestStockData, (req, res) => {});

router.patch("/getworststockdata", getWorstStockData, (req, res) => {});
router.patch("/getbeststockdata", getBestStockData, (req, res) => {});

async function getWorstStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.send({
    stock: arr[1],
  });
  res.status(200);
  next();
}

async function getBestStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.send({
    stock: arr[0],
  });
  res.status(200);
  next();
}

module.exports = router;
