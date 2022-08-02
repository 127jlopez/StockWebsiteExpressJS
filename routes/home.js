const express = require("express");
const router = express.Router();
const _parseFromDatabase = require("../public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");

router.use(_bodyParser.urlencoded({ extended: true }));

const dow = "DOWStocks";
const sandp = "SandP500Stocks";

router.get("/getworstdowdata", async (req, res) => {
  const arr = await _parseFromDatabase.getStockData(dow);

  if (arr === 0) {
    res.send({
      stock: "error",
    });
    res.status(500);
  } else {
    res.send({
      stock: arr[1],
    });
    res.status(200);
  }
});

router.get("/getbestdowdata", async (req, res) => {
  const arr = await _parseFromDatabase.getStockData(dow);

  if (arr === 0) {
    res.status(500);
    res.send({
      stock: "error",
    });
  } else {
    res.status(200);
    res.send({
      stock: arr[0],
    });
  }
});

router.get("/getworstsandp500data", async (req, res) => {
  const arr = await _parseFromDatabase.getStockData(sandp);

  res.send({
    stock: arr[1],
  });
  res.status(200);
});

router.get("/getbestsandp500data", async (req, res) => {
  const arr = await _parseFromDatabase.getStockData(sandp);

  if (arr === 0) {
    res.send({
      stock: "error",
    });
    res.status(500);
  } else {
    res.send({
      stock: arr[0],
    });
    res.status(200);
  }
});

module.exports = router;
