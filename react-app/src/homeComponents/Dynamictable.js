import React, { useContext } from "react";
import { HomeContext } from "./ContextHome";

import Table from "react-bootstrap/Table";

function createTable(Data, selectValue) {
  let stockList = [];

  const deltaPricePercentageFromHIGH = "deltaPricePercentageFromHigh";
  const deltaPricePercentageFromLOW = "deltaPricePercentageFromLow";
  let highOrLow = deltaPricePercentageFromHIGH;
  if (Data === null) return <></>;

  if (selectValue > Data["stock"].length) selectValue = Data["stock"].length;

  if (Data["stock"][0]["deltaPricePercentageFromHigh"] === undefined)
    highOrLow = deltaPricePercentageFromLOW;

  for (let i = 0; i < selectValue; i++) {
    stockList.push(
      <tr key={i}>
        <th>{i + 1}</th>
        <th>{Data["stock"][`${i}`]["tickerSymbol"]}</th>
        <th>{Data["stock"][`${i}`]["currentPrice"]}</th>
        <th>{Data["stock"][`${i}`][`${highOrLow}`]}</th>
      </tr>
    );
  }

  return stockList;
}

export default function Dynamictable() {
  const selectValue = useContext(HomeContext);
  const data = useContext(HomeContext);

  if (data.data === null) return;

  let downOrUp = "% Down";
  if (data.data["stock"][0]["deltaPricePercentageFromHigh"] === undefined)
    downOrUp = "% Up";

  return (
    <>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>{downOrUp}</th>
          </tr>
          {createTable(data.data, selectValue.selectValue)}
        </thead>
      </Table>
    </>
  );
}
