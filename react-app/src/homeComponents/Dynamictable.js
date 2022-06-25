import React from "react";

function createTable(Data, selectValue) {
  let stockList = [];
  if (Data === null) return <></>;

  console.log(`Length Data in createtable: ${Data.length}`);
  for (let i = 0; i < selectValue; i++) {
    stockList.push(
      <tr>
        <th>{i + 1}</th>
        <th>{Data["stock"][`${i}`]["tickerSymbol"]}</th>
        <th>{Data["stock"][`${i}`]["currentPrice"]}</th>
        <th>{Data["stock"][`${i}`]["deltaPricePercentageFromHigh"]}</th>
      </tr>
    );
  }

  return stockList;
}

export default function Dynamictable({ jsonData, numberOfStockToDisplay }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Ticker Symbol</th>
            <th>Current Price</th>
            <th>% Down</th>
          </tr>
          {createTable(jsonData, numberOfStockToDisplay)}
        </thead>
      </table>
    </>
  );
}
