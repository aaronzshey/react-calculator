import React, { useState } from "react";
import "./App.css";
import CalculatorBody from "./components/CalculatorBody/CalculatorBody.jsx";
import Screen from "./components/Screen/Screen.jsx";
import ButtonWrapper from "./components/ButtonWrapper/ButtonWrapper.jsx";
import Button from "./components/Button/Button.jsx";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0,
  });
  //setCalc is a setter function for the object calc, which becomes the object passed to useState()
  //thus, we can use calc.sign, calc.num, etc. to access the values of the object

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log(calc.num.length);
    //!calc.num.length necessary because length is undefined for ints
    if (!calc.num.length || calc.num.length < 15) {
      console.log("Wtf");
      setCalc({
        ...calc, //spread operator to copy the old state
        num: calc.num + value,
        /*
          calc.num === 0 && value === "0" // if the current value is 0 and the button clicked is 0, set num to 0
            ? "0"
            : calc.num % 1 === 0 // if the current value is an integer, add the value to the end of the number
              ? Number(calc.num + value) // if the current value is a decimal, add the value to the end of the number
              : calc.num + value,
              */
        result: calc.result, // if there is no sign, set the result to 0
      });
    }
  };

  const decimalClickHandler = (element) => {
    element.preventDefault();
    const value = element.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (element) => {
    element.preventDefault();
    const value = element.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  return (
    <>
      <CalculatorBody>
        <Screen value={calc.num} />
        <ButtonWrapper>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                value={btn}
                className={btn === "=" ? "equals" : ""}
                onClick={numClickHandler}
              />
            );
          })}
        </ButtonWrapper>
      </CalculatorBody>
    </>
  );
};

export default App;
