const _getDataYahoo = require("./fetchData.js");
const _readFileSync = require("fs");
const _UpdateDocument = require("./mongodb.js");

// Return a list of ticker Symbols
async function TickerSymbol(stockFile, numOfArrays) {
  console.log("parsing file: " + stockFile);
  let tickerSymbol = _readFileSync.readFileSync(stockFile, "utf8");
  let tickerSymbolList = tickerSymbol.split("\n");
  tickerSymbolList.sort();

  const chunkSize = Math.ceil(tickerSymbolList.length / numOfArrays);
  let tickerSplit = [];
  let counter = 0;
  for (let i = 0; i < tickerSymbolList.length; i += chunkSize) {
    tickerSplit[counter] = tickerSymbolList.slice(i, i + chunkSize);
    counter++;
  }
  return tickerSplit;
}
/********************************************************/
// Returns JSON data from API
async function SchemaYahoo(symbol) {
  return _getDataYahoo.getDataYahoo(symbol);
}

//
async function WriteData(symbol) {
  if (symbol == undefined) return;
  try {
    let time = new Date();

    let timeStamp = `${time.getFullYear()}/${time.getMonth() + 1}/
    ${time.getDate()} 
    ${time.getHours()}:${time.getMinutes()}}`;

    const stockData = await SchemaYahoo(symbol);

    const fiftyTwoWeekLowChangePercent =
      stockData["quoteResponse"]["result"]["0"]["fiftyTwoWeekLowChangePercent"];
    const fiftyTwoWeekHighChangePercent =
      stockData["quoteResponse"]["result"]["0"][
        "fiftyTwoWeekHighChangePercent"
      ];
    const currentPrice =
      stockData["quoteResponse"]["result"]["0"]["regularMarketPrice"];

    const newStockJSON = {
      tickerSymbol: symbol,
      currentPrice: currentPrice,
      deltaPricePercentageFromLow: fiftyTwoWeekLowChangePercent,
      deltaPricePercentageFromHigh: fiftyTwoWeekHighChangePercent,
      lastUpdateTime: timeStamp,
    };
    await _UpdateDocument.UpdateDocument(symbol, newStockJSON);
    await new Promise((r) => setTimeout(r, 500));
  } catch (err) {
    err = err + " TickerSymbol: " + symbol;
    console.error(err);
  }
}
WriteData().catch(console.error);

module.exports = { TickerSymbol, SchemaYahoo, WriteData };
