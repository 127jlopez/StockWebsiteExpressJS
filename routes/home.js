/*
    Home page contains a dynamic table for worst/best perform stocks for the S&P500.
    TODO. add functionallity to contain DOW, NasDaq
*/
const express = require("express");
const router = express.Router();
const _getStockData = require("../public/ParseFromDatabase.js");

router.get("/", getWorstStockData, (req, res) => {});

async function getWorstStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.render("index", {
    stock: arr[1],
    selectValue: Number(req.body.numberofstockselect),
  });
  next();
}

async function getBestStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.render("index2", {
    stock: arr[0],
    selectValue: Number(req.body.numberofstockselect),
  });
  next();
}
