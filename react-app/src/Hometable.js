import React, { useState, useEffect, useReducer } from "react";

import Dynamictable from "./homeComponents/Dynamictable";
import Selectgroup from "./homeComponents/Selectgroup";
import Buttongroup from "./homeComponents/Buttongroup";
import { HomeContext } from "./homeComponents/ContextHome";

/// Bootstrap

import "bootstrap/dist/css/bootstrap.min.css";

export const sandP500SelectOptions = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 505,
    label: "All",
  },
];

export const dowSelectOptions = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 30,
    label: "All",
  },
];

const initalReducerState = {
  worstOrBest: "worst",
  stockIndex: "sandp500",
};

const reducer = (stockState, action) => {
  switch (action.type) {
    case "DOW":
      return {
        worstOrBest: stockState.worstOrBest,
        stockIndex: "dow",
      };
    case "SANDP":
      return {
        worstOrBest: stockState.worstOrBest,
        stockIndex: "sandp500",
      };
    case "WORST":
      return {
        worstOrBest: "worst",
        stockIndex: stockState.stockIndex,
      };
    case "BEST":
      return {
        worstOrBest: "best",
        stockIndex: stockState.stockIndex,
      };
    default:
      return stockState;
  }
};

/////////////////////////////////////////
function Hometable() {
  const [selectOption, setSelectOption] = useState(sandP500SelectOptions);
  const [selectValue, setSelectValue] = useState(1);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // these two will dedicate which data will be displayed
  const [stockState, dispatch] = useReducer(reducer, initalReducerState);

  useEffect(() => {
    async function getData() {
      try {
        const resp = await fetch(
          `http://localhost:4000/get${stockState.worstOrBest}${stockState.stockIndex}data`
        );
        const jsonData = await resp.json();

        if (resp.status !== 200) {
          throw Error(jsonData.message);
        }
        setData(jsonData);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    }

    getData();
  }, [stockState.worstOrBest, stockState.stockIndex]);

  if (error !== null) {
    console.log(`Error message: ${error.message}`);
  }

  return (
    <>
      <HomeContext.Provider
        value={{
          selectOption,
          setSelectOption,
          selectValue,
          setSelectValue,
          data,
          setData,
          stockState,
          dispatch,
        }}
      >
        <h1>Stocks Info</h1>
        <h2>Number of stocks:</h2>
        <Selectgroup />
        <Buttongroup />
        <Dynamictable />
      </HomeContext.Provider>
    </>
  );
}

export default Hometable;
