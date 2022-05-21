const _tickerSymbol = require("./lib/StockData.js");
const _doesDocumentsExistList = require("./lib/mongodb.js");

let stockFile = "./lib/SandP500Stocks.txt";

// Get list of the Ticker Symbols
let numOfArrays = 4;
console.log("About to start updating");
StartUpdate();

async function StartUpdate() {
  console.log("about to get stock list");
  let stockList = await _tickerSymbol.TickerSymbol(stockFile, numOfArrays);
  console.log(stockList);

  let promises = [];
  for (let i = 0; i < stockList.length; i++) {
    console.log("pushed to update: " + i);

    promises.push(_doesDocumentsExistList.DoesDocumentsExistList(stockList[i]));
  }
  await Promise.all(promises);
}
process.exit(1);
