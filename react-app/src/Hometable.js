import React, { useState, useEffect } from "react";
import Select from "react-select";
import { SandPListData } from "./Backend/FetchBackendData";
import Dynamictable from "./homeComponents/Dynamictable";

const sandP500SelectOptions = [
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

const dowSelectOptions = [
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

/////////////////////////////////////////
function Hometable() {
  const [selectOption, setSelectOption] = useState(sandP500SelectOptions);
  const [selectValue, setSelectValue] = useState(1);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const resp = await fetch("http://localhost:4000/getworststockdata");
        const jsonData = await resp.json();

        if (resp.status !== 200) {
          throw Error(jsonData.message);
        }
        setData(jsonData);
        console.log(`set data to: ${data}`);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (error !== null) {
    console.log(`Error message ${error.message}`);
  }

  return (
    <>
      <h1>Stocks Info</h1>
      <h2>Number of stocks:</h2>
      <Select
        placeholder="Select number of stock to display"
        value={1}
        options={selectOption}
        onChange={(e) => setSelectValue(e.value)}
      ></Select>
      <button onClick={() => setSelectOption(sandP500SelectOptions)}>
        S&P500
      </button>
      <button onClick={() => setSelectOption(dowSelectOptions)}>DOW</button>
      <Dynamictable jsonData={data} numberOfStockToDisplay={selectValue} />
    </>
  );
}

export default Hometable;
