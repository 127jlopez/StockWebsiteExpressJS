import { getDataYahoo } from "./fetchData.js";
import { readFileSync } from "fs";
import { UpdateDocument } from "./mongodb.js";

// Return a list of ticker Symbols
export const TickerSymbol = async (stockFile, numOfArrays) => {
  let tickerSymbol = readFileSync(stockFile, "utf8");
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
};
/********************************************************/
// Returns JSON data from API
export const SchemaYahoo = async (symbol) => {
  return getDataYahoo(symbol);
};

// Get the most recent time
// TODO: Change the if statement to return TIME_SERIES_INTRDAY
export const DateString = async () => {
  let today = new Date();

  let hour = today.getHours();
  let minute = today.getMinutes();
  let day = today.getDate();

  if ((hour < "6") & (minute < "30") || hour >= "13") {
    // check the time of the day
    // will need to add checks for with month example if today is march 1
    // then will need to return feb 28 or feb 29 (leap year)
    return "TIME_SERIES_DAILY";
  } else {
    return "TIME_SERIES_DAILY";
  }
};

//
export const WriteData = async (symbol) => {
  if (symbol == undefined) return;
  try {
    let time = new Date();
    let timeStamp = `${time.getFullYear()}/${
      time.getMonth() + 1
    }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}}`;
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
    await UpdateDocument(symbol, newStockJSON);
    await new Promise((r) => setTimeout(r, 500));
  } catch (err) {
    err = err + " TickerSymbol: " + symbol;
    console.error(err);
  }
};
WriteData().catch(console.error);
