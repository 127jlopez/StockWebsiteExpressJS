const express = require("express");
const _ParseFromDatabase = require("./public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");
const _cors = require("cors");
const _DataBase = require("./public/lib/mongodb.js");
const _UpdateDatabase = require("./public/UpdateDatabase.js");

const app = express();
const port = 4000;

//_UpdateDatabase.StartUpdate(_DataBase);

const getWorstStockData = async (req, res, next) => {
  try {
    const _db = await _DataBase.getDB();
    let arr = await _ParseFromDatabase.getStockData(_db);
    if (arr == undefined) return;

    res.render("index", {
      stock: arr[1],
      selectValue: Number(req.body.numberofstockselect),
    });
    next();
  } catch (err) {
    console.error(err);
  }
};
getWorstStockData().catch(console.error);

const getBestStockData = async (req, res, next) => {
  try {
    const _db = await _DataBase.getDB();
    let arr = await _ParseFromDatabase.getStockData(_db);
    if (arr == undefined) return;

    res.render("index2", {
      stock: arr[0],
      selectValue: Number(req.body.numberofstockselect),
    });
    next();
  } catch (err) {
    console.error(err);
  }
};
getBestStockData().catch(console.error);
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
app.use(_cors);
app.use(_bodyParser.urlencoded({ extended: true }));

app.get("/", getWorstStockData, (req, res) => {
  res.render("index");
});

app.get("/BestStocks", getBestStockData, (req, res) => {});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.post("/", getWorstStockData, (req, res) => {});

app.post("/BestStocks", getBestStockData, (req, res) => {});
