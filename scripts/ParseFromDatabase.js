import { MongoClient } from "mongodb";
import dotenv from "dotenv";
/* 
Need to make this into a function that returns both arrays.
Need to make this write/update a JSON file as well (Well be used as backup in another part)
*/

const SplitAndSort2Arrays = async (arrayList) => {
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
};
// Allow reading environment variables
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

await client.connect();

const stockData = client.db("Stocks").collection("SandP500Stocks").find();
let dataCursor = [];
let upFromLows = [];
let downFromHighs = [];

await stockData.forEach((doc) => dataCursor.push(doc));

// split the stock into two arrays
let returnArray = await SplitAndSort2Arrays(dataCursor);
upFromLows = returnArray[0];
downFromHighs = returnArray[1];
exit(1);
