const express = require("express");
const _getStockData = require("./public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");
const { next } = require("cheerio/lib/api/traversing");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(_bodyParser.urlencoded({ extended: true }));
app.use(_bodyParser.json());

app.get("/", getStockData, (req, res) => {
  // run code
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
app.post("/", getStockData, (req, res) => {
  next();
});

// listen for click?
app.post("/clicked", getStockData, (req, res) => {});

async function getStockData(req, res, next) {
  let arr = await _getStockData.getStockData();

  res.render("index", {
    stock: arr[1],
    selectValue: Number(req.body.numberofstockselect),
  });
  next();
}
