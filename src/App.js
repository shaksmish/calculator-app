import './styles.css'
import { useState, useEffect } from 'react';

function App() {

  const [prevState, setPrevState] = useState("");
  const [currState, setCurrState] = useState("");
  const [input, setInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState (false);

  function inputValue (e) {
    if (currState.includes('.') && e.target.innerText === '.') {
      return;
    }
    //if result is true, then clear the state and start a new calculation
    if (result) {
      setPrevState("");
    }
    //if the current state is empty, then set the current state to the value of the button that was clicked, 
    //otherwise append the value of the button to the current state
    currState
      ? setCurrState((prev) => prev + e.target.innerText)
      : setCurrState(e.target.innerText);
    setResult(false);

  }
    //the effect updates input to reflect the same value as currState
    useEffect (() => {
      setInput(currState)
    }, [currState]);
    //on reset, the initial state of the input field is "0"
    useEffect (() => {
      setInput("0");
    }, []);

  const operatorValue = (e) => {
    setResult(false);
    setOperator(e.target.innerText);

    if (currState === "") {
      return;
    }
    if(prevState !== "") {
      evaluate();
    } 
    else {
      setPrevState(currState);
      setCurrState("");
    }
  }

  const evaluate = (e) => {
    if (e?.target.innerText === "=") {
      setResult(true);
      setOperator(null);
    }

    let calValue;
    switch (operator) {
      case "/": 
        calValue = String(parseFloat(prevState) / parseFloat(currState));
        break;
      case "*": 
        calValue = String(parseFloat(prevState) * parseFloat(currState));
        break;
      case "-": 
        calValue = String(parseFloat(prevState) - parseFloat(currState));
        break;
      case "+": 
        calValue = String(parseFloat(prevState) + parseFloat(currState));
        break;
      default: return;
    }
      setInput("");
      setPrevState(calValue);
      setCurrState("");
    };

  function clearAll(e) {
    setPrevState("");
    setCurrState("");
    setInput("0");
  }

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
          onClick={(e) => inputValue(e)}
          key={i}>
          {i}
          </button>
      );
    }
    return digits;
  }
  
  return (
    <div className="container">
      <div className="heading-content">
      <h1 className="heading">Calculator</h1>
      <p>This is a basic calculator built using React. Give it a try!</p>
      </div>
      <div className="calculator">
      <div className="screen">
        {input!== "" || input === "0" ? input : prevState}  
       
      </div>

      <div className="operator">
        <button onClick={clearAll}>AC</button>
        <button onClick={operatorValue}>/</button>
        <button onClick={operatorValue}>*</button>
        <button onClick={operatorValue}>-</button>
        <button onClick={operatorValue}>+</button>
      </div>
      
      <div className="keypad">
        { createDigits() }
        <button onClick={inputValue}>.</button>
        <button onClick={inputValue}>0</button>
        <button onClick={evaluate}>=</button>
      </div>
    </div>
    </div>

  );
}

export default App;