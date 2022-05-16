const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL);

// Open connection to database
const Connect = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
};
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

// Allow reading environment variables
async function getStockData() {
  try {
    await Connect();

    const stockData = client.db("Stocks").collection("SandP500Stocks").find();

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
    return 0;
  }
}
module.exports = { getStockData };
