const express = require("express");
//const _getStockData = require("./public/ParseFromDatabase.js");
//const _bodyParser = require("body-parser");
const _cors = require("cors");
//const _dotenv = require("dotenv").config();

//const dataBase = require("./public/lib/mongodb.js");

const app = express();
const port = 4000;

/*

let = todays MM/DD/YYYY & time HH:MM
let stock_closing_time = (if(monthrufriday)todays Date && time)
1. check the time with the closing date & closing time
    - should check if monday - friday after 1:30pm
    
2. should check the last time the sandp500.json was update

update if needed. by running 

index.js in pervious project

import { TickerSymbol } from "./lib/StockData.js";

import { DoesDocumentsExistList } from "./lib/mongodb.js";
let stockFile = "./lib/SandP500Stocks.txt";

// Get list of the Ticker Symbols
let numOfArrays = 4;
let stockList = await TickerSymbol(stockFile, numOfArrays);

let promises = [];
for (let i = 0; i < stockList.length; i++) {
  promises.push(DoesDocumentsExistList(stockList[i]));
}
await Promise.all(promises);
process.exit(1);

*/

app.set("view engine", "ejs");
app.use(express.static("public"));
//app.use(_cors);
//app.use(_bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Delilah!!!!");
  console.log("Set up home page");
});

//app.get("/BestStocks", getBestStockData, (req, res) => {});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

//app.post("/", getWorstStockData, (req, res) => {});

//app.post("/BestStocks", getBestStockData, (req, res) => {});

async function getWorstStockData(req, res, next) {
  console.log("Getting worst data");
  const _db = await dataBase.getDB();
  console.log(_db);
  let arr = await _getStockData.getStockData(_db);

  res.render("index", {
    stock: arr[1],
    selectValue: Number(req.body.numberofstockselect),
  });
  next();
}

async function getBestStockData(req, res, next) {
  const _db = await dataBase.getDB();
  console.log(_db);
  let arr = await _getStockData.getStockData(_db);

  res.render("index2", {
    stock: arr[0],
    selectValue: Number(req.body.numberofstockselect),
  });
  next();
}
