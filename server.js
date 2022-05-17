const express = require("express");
const _getStockData = require("./public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(_bodyParser.urlencoded({ extended: true }));

app.get("/", getWorstStockData, (req, res) => {});

app.get("/BestStocks", getBestStockData, (req, res) => {});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});

app.post("/", getWorstStockData, (req, res) => {});

app.post("/BestStocks", getBestStockData, (req, res) => {});

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
