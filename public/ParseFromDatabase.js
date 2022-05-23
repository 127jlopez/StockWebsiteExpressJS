const SplitAndSort2Arrays = async (arrayList) => {
  if (arrayList == undefined) return;
  try {
    let upFromLows = [];
    let downFromHighs = [];

    for (let i = 0; i < arrayList.length; i++) {
      const upFrom52WeekLow = {
        tickerSymbol: arrayList[i]["tickerSymbol"],
        currentPrice: arrayList[i]["currentPrice"],
        deltaPricePercentageFromLow:
          arrayList[i]["deltaPricePercentageFromLow"],
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
      return a["deltaPricePercentageFromHigh"] >
        b["deltaPricePercentageFromHigh"]
        ? 1
        : -1;
    });
    return [upFromLows, downFromHighs];
  } catch (err) {
    console.error(err);
  }
};
SplitAndSort2Arrays().catch(console.error);

// Reuturns the stock data sorted
const getStockData = async (_dataBase) => {
  if (_dataBase == undefined) return;
  try {
    // Need to check if updating database
    //
    const stockData = _dataBase.collection("SandP500Stocks").find();

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
};
getStockData().catch(console.error);

module.exports = { getStockData };
