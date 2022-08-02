const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL);

let db = undefined;

// Open connection to database
async function Connect(stockCollection) {
  try {
    await client.connect();
    db = client.db("Stocks").collection(`${stockCollection}`);
    console.log(`Connected to ${db}`);
  } catch (e) {
    console.error(e);
  }
}
Connect().catch(console.error);

async function SplitAndSort2Arrays(arrayList) {
  if (arrayList.length == 0) return;

  let upFromLows = [];
  let downFromHighs = [];

  for (let i = 0; i < arrayList.length; i++) {
    const upFrom52WeekLow = {
      tickerSymbol: arrayList[i]["tickerSymbol"],
      currentPrice: arrayList[i]["currentPrice"],
      deltaPricePercentageFromLow: arrayList[i]["deltaPricePercentageFromLow"],
    };

    const downFrom52WeekHigh = {
      tickerSymbol: arrayList[i]["tickerSymbol"],
      currentPrice: arrayList[i]["currentPrice"],
      deltaPricePercentageFromHigh:
        arrayList[i]["deltaPricePercentageFromHigh"],
    };
    upFromLows.push(upFrom52WeekLow);
    downFromHighs.push(downFrom52WeekHigh);
  }

  // sort so highest can be on top
  upFromLows.sort((a, b) => {
    return a["deltaPricePercentageFromLow"] < b["deltaPricePercentageFromLow"]
      ? 1
      : -1;
  });
  //sort so lowest can be on top
  downFromHighs.sort((a, b) => {
    return a["deltaPricePercentageFromHigh"] > b["deltaPricePercentageFromHigh"]
      ? 1
      : -1;
  });
  return [upFromLows, downFromHighs];
}

// Reuturns the stock data sorted
async function getStockData(stockCollection) {
  try {
    await Connect(stockCollection);

    const stockData = db.find();
    let dataCursor = [];
    let upFromLows = [];
    let downFromHighs = [];

    await stockData.forEach((doc) => dataCursor.push(doc));
    // split the stock into two arrays
    let returnArray = await SplitAndSort2Arrays(dataCursor);
    upFromLows = returnArray[0];
    downFromHighs = returnArray[1];

    return [upFromLows, downFromHighs];
  } catch (err) {
    console.error(err);
  }
}
module.exports = { getStockData };
