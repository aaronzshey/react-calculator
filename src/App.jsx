import "./App.css";
//import Wrapper from "./components/Wrapper/Wrapper.jsx";
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

function App() {
  return (
    <>
      <CalculatorBody>
        <Screen value="09993923294393939" />
        <ButtonWrapper>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                value={btn}
                className={btn === "=" ? "equals" : ""}
                onClick={() => console.log(`${btn} clicked`)}
              />
            );
          })}
        </ButtonWrapper>
      </CalculatorBody>
    </>
  );
}

export default App;
