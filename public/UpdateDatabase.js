const _StockData = require("./lib/StockData.js");
let stockFile = "./lib/SandP500Stocks.txt";
let numOfArrays = 4;

const StartUpdate = async (_Mongod) => {
  if (_Mongod == undefined) return;

  try {
    if (CheckStartUpdateTime() == 0) return;
    let stockList = await _StockData.TickerSymbol(stockFile, numOfArrays);

    let promises = [];
    for (let i = 0; i < stockList.length; i++) {
      console.log("pushed to update: " + i);

      promises.push(_Mongod.DoesDocumentsExistList(stockList[i]));
    }
    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
};
StartUpdate().catch(console.error);

const CheckStartUpdateTime = async () => {
  try {
    let timeStamp = new Date().getTime();
    let day = new Date().getDay();

    let stockMarketCloseLocalTime = new Date();
    stockMarketCloseLocalTime.setHours(12, 30, 0, 0);

    if ((day != 0 || day != 6) && stockMarketCloseLocalTime < timeStamp)
      return 0;
    else {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
};
CheckStartUpdateTime().catch(console.error);

module.exports = { StartUpdate };
