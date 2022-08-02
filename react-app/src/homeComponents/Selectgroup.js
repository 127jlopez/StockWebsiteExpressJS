import React, { useContext } from "react";
import Select from "react-select";
import { HomeContext } from "./ContextHome";

export default function Selectgroup() {
  const selectValue = useContext(HomeContext);
  const selectOption = useContext(HomeContext);
  const setSelectValue = useContext(HomeContext);

  return (
    <>
      <Select
        placeholder={selectValue.selectValue}
        value={1}
        options={selectOption.selectOption}
        onChange={(e) => setSelectValue.setSelectValue(e.value)}
      ></Select>
    </>
  );
}
