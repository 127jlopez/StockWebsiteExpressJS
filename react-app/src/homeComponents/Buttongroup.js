import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { sandP500SelectOptions, dowSelectOptions } from "../Hometable";
import { HomeContext } from "./ContextHome";

export default function Buttongroup() {
  const setSelectOption = useContext(HomeContext);
  const dispatch = useContext(HomeContext);

  return (
    <>
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={() => {
            setSelectOption.setSelectOption(sandP500SelectOptions);
            dispatch.dispatch({ type: "SANDP" });
          }}
        >
          S&P500
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setSelectOption.setSelectOption(dowSelectOptions);
            dispatch.dispatch({ type: "DOW" });
          }}
        >
          DOW
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            dispatch.dispatch({ type: "WORST" });
          }}
        >
          Worst
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch.dispatch({ type: "BEST" });
          }}
        >
          Best
        </Button>
      </ButtonGroup>
    </>
  );
}
