const _FetchData = require("./fetchData.js");
const _Fs = require("fs");

// Return a list of ticker Symbols
const TickerSymbol = async (stockFile, numOfArrays) => {
  if (stockFile == undefined) return;
  try {
    console.log("parsing file: " + stockFile);
    let tickerSymbol = _Fs.readFileSync(stockFile, "utf8");
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
  } catch (err) {
    console.error(err);
  }
};
TickerSymbol().catch(console.error);

const SchemaYahoo = async (symbol) => {
  try {
    return _FetchData.getDataYahoo(symbol);
  } catch (err) {
    console.error(err);
  }
};
SchemaYahoo().catch(console.error);

const WriteData = async (symbol, _Mongod) => {
  if (symbol == undefined) return;
  try {
    let timeStamp = `${getDate()} ${getTimeHHMM}`;
    console.log(`timestamp: ${timeStamp}`);

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
    await _Mongod.UpdateDocument(symbol, newStockJSON); // I will have to deal with this should not be here
    // need to refactor this file with mongod
    await new Promise((r) => setTimeout(r, 500));
  } catch (err) {
    err = err + " TickerSymbol: " + symbol;
    console.error(err);
  }
};
WriteData().catch(console.error);

const getDate = async () => {
  try {
    let todaysDateTime = new Date();
    let date = `${todaysDateTime.getFullYear()}/${
      todaysDateTime.getMonth() + 1
    }/
  ${todaysDateTime.getDate()}`;
    return date;
  } catch (err) {
    console.error(err);
  }
};
getDate().catch(console.error);

const getTimeHHMM = async () => {
  try {
    let todaysDateTime = new Date();
    let time = `${todaysDateTime.getHours()}:${todaysDateTime.getMinutes()}`;
    return time;
  } catch (err) {
    console.error(err);
  }
};
getTimeHHMM().catch(console.error);

module.exports = { TickerSymbol, SchemaYahoo, WriteData, getDate, getTimeHHMM };
