import React, { useState } from "react";
import "./App.css";
import CalculatorBody from "./components/CalculatorBody/CalculatorBody.jsx";
import Screen from "./components/Screen/Screen.jsx";
import ButtonWrapper from "./components/ButtonWrapper/ButtonWrapper.jsx";
import Button from "./components/Button/Button.jsx";
import ThemeToggleWrapper from "./components/ThemeToggleWrapper/ThemeToggleWrapper.jsx";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton.jsx";

import { PiSun } from "react-icons/pi";
import { PiMoon } from "react-icons/pi";
import { PiMoonStars } from "react-icons/pi";

//TODO: ADD "warning" toast when an unsupported action is performed

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const themeValues = [
  {
    theme: "themeToggleButton light",
    icon: <PiSun />,
  },
  {
    theme: "themeToggleButton dark",
    icon: <PiMoon />,
  },
  {
    theme: "themeToggleButton oled",
    icon: <PiMoonStars />,
  },
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0,
  });

  let [theme, setTheme] = useState({
    theme: "light",
  });
  //setCalc is a setter function for the object calc, which becomes the object passed to useState()
  //thus, we can use calc.sign, calc.num, etc. to access the values of the object

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    //!calc.num.length necessary because length is undefined for ints
    if (!calc.num.length || calc.num.length < 15) {
      //console.log("Wtf");
      setCalc({
        ...calc, //spread operator to copy the old state
        num:
          calc.num === 0 && value === "0"
            ? 0
            : calc.num === 0 && value !== "0"
              ? value
              : calc.num + value,
        /*
          calc.num === 0 && value === "0" // if the current value is 0 and the button clicked is 0
            ? "0" //set num to 0
            : calc.num % 1 === 0 // if the current value is an integer
              ? Number(calc.num + value) // mathematically
              : calc.num + value,
              */
        result: !calc.sign ? 0 : calc.result, // if there is no sign, set the result to 0
      });
    }
  };

  const decimalClickHandler = (element) => {
    element.preventDefault();
    const value = element.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num, // if the current value does not include a decimal, add a decimal, otherwise don't
    });
  };

  const resetClickHandler = (element) => {
    element.preventDefault();
    setCalc({
      ...calc,
      num: 0,
      result: 0,
    });
  };

  const signClickHandler = (element) => {
    element.preventDefault();
    const value = element.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.num ? calc.num : calc.result, //only accept the result if there is no result and there is a number
      num: 0, //reset the number
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        a = Number(a);
        b = Number(b);

        if (sign === "+") {
          return a + b;
        } else if (sign === "-") {
          return a - b;
        } else if (sign === "X") {
          return a * b;
        } else {
          return a / b;
        }
      };

      setCalc({
        ...calc,
        result:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : math(calc.result, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
    });
  };

  const percentClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num / 100 : 0,
      res: calc.res ? calc.res / 100 : 0,
    });
  };

  /*
  the icons I'm using render like this:
  <svg>
    <path>
    </path>
  </svg>

  When you click on a button, sometimes the click is captured by the svg, and sometimes it's captured by the path.
  Thus, I have to identify the click receptor and act accordingly to find the theme className of the parent button
  */
  const themeToggleHandler = (element) => {
    element.preventDefault();
    const el = element.target;
    const clickReceived = el.nodeName;
    const parent = el.parentElement;
    //console.log(el);
    //console.log(clickReceived);
    // console.log(parent);

    const themeMode =
      clickReceived === "svg"
        ? el.parentElement.className
        : clickReceived === "path"
          ? parent.parentElement.className
          : clickReceived === "button"
            ? el.className
            : "Error";

    document.body.className = themeMode.split(" ")[1];

    //TODO: replace with warning toast
  };

  return (
    <>
      <CalculatorBody>
        <Screen value={calc.num ? calc.num : calc.result} />
        <ButtonWrapper>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                value={btn}
                className={btn === "=" ? "equals" : ""}
                onClick={
                  btn === "."
                    ? decimalClickHandler
                    : btn === "C"
                      ? resetClickHandler
                      : btn === "+" || btn === "-" || btn === "X" || btn === "/"
                        ? signClickHandler
                        : btn === "="
                          ? equalsClickHandler
                          : btn === "+-"
                            ? invertClickHandler
                            : btn === "%"
                              ? percentClickHandler
                              : numClickHandler
                }
              />
            );
          })}
        </ButtonWrapper>
      </CalculatorBody>

      <ThemeToggleWrapper>
        {themeValues.map((info, i) => {
          return (
            <ThemeToggleButton
              key={i}
              className={info.theme}
              onClick={themeToggleHandler}
            >
              {info.icon}
            </ThemeToggleButton>
          );
        })}
      </ThemeToggleWrapper>
    </>
  );
};

export default App;
