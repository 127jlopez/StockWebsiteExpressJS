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
async function getStockData(_dataBase) {
  try {
    // Need to check if updating database
    //
    await Connect();

    const stockData = _dataBase.collection("SandP500Stocks").find();

    let dataCursor = [];
    let upFromLows = [];
    let downFromHighs = [];

    await stockData.forEach((doc) => dataCursor.push(doc));

    // split the stock into two arrays
    let returnArray = await SplitAndSort2Arrays(dataCursor);
    upFromLows = returnArray[0];
    downFromHighs = returnArray[1];

    client.close();
    return [upFromLows, downFromHighs];
  } catch (err) {
    console.error(err);
    return 0;
  }
}
module.exports = { getStockData };
