import React, { useState } from 'react';
import './input-box.scss';

export const InputBox = () => {

  const [inputValue, setInputValue] = useState("");
  const [answerValue, setAnswerValue] = useState("Answer: ");
  
  /************** INPUT VALIDATION ******************/
  const inputValidationCheck = input => {  
    // Output error message if input includes any alphabetical characters
    const regex = /[a-zA-Z]/;
    return regex.test(input);
  }


  /************** PARSING AND CALCULATING ******************/
  const parseAndCalculate = () => {

    //To follow the order of operations:
    //  Step 1: split on () --> evaluate and replace with answer
    //  Step 2: split on +/-  --> evaluate and replace with answer
    //  Step 3: evaluate entire expression (which should only contain +/-)
    
    let value = inputValue.slice();
    const multDivExp = /[-]?\d*\.?\d+\s*([*/])\s*([-]?\d*\.?\d+)/;
    const addSubtExp = /([+-]?\d*\.?\d+)\s*([+-])\s*([+-]?\d*\.?\d+)/;
    const parenExp = /\(([^\)]+)\)/;

    //Step 1, evaluate items between parentheses (if they exist)
    while (value.includes("(") && value.includes(")")) {
      value = solveAndCheck(value, parenExp);
      if (value === "Syntax Error") { 
        break; 
      }
    }

    //Step 2, evaluate expressions with * and / first (if they exist)
    while (value.includes("/") || value.includes("*")){
      value = solveAndCheck(value, multDivExp);
      if (value === "Syntax Error") { 
        break; 
      }
    }

    //While expression is not a standalone number/value, 
    while (value.search(/^\s*([+-]?\d*\.?\d+)\s*$/) === -1) {
      value = solveAndCheck(value, addSubtExp);
      if (value === "Syntax Error") { 
        break; 
      }
    }

    return setAnswerValue(`Answer: ${value}`);
  }

  const solveAndCheck = (value, regex) => {
    //replace the operators +-/* with the evaluated answer
    let newValue = value.replace( regex, exp => {
      exp = exp.replace("(","")
      exp = exp.replace(")","")
      return applyOperations(exp);
    })

    if(newValue === value || errorCheck(newValue)) {
      return "Syntax Error"
    } else {
      value = newValue;
    }

    return value;
  }

  const errorCheck = (value) => {
    if(value.includes("NaN") || value.includes("Syntax Error") || value.includes("undefined")) {
      console.log("error break")
      return true
    } else {
      return false;
    }    
  }

  const applyOperations = (expression) => {

    //checking for double operators
    //Parameters: "exp" is the entire expression, "op1" & "op2" are the 1st and 2nd operator, and "num" is the constant/number
    expression = expression.replace(/([+-])([+-])(\d|\.)/g, (exp, op1, op2, num) => { 
      return (op1 === op2 ? '+' : '-') + num; 
    });

    // regex to isolate expressions, i.e. "3+3"
    let expressionRegex = /([+-]?\d*\.?\d+)\s*([*/+-])\s*([+-]?\d*\.?\d+)/;
    // breaks up expression into 4 parts: for example, if expression was "a+b"
    // returns array: ["a+b", "a", "+", "b"]
    let expItems = expressionRegex.exec(expression);
        
    switch(expItems[2]) {
      case "/": 
        return parseFloat(expItems[1]) / parseFloat(expItems[3]);
      case "*": 
        return parseFloat(expItems[1]) * parseFloat(expItems[3]);
      case "-": 
        return parseFloat(expItems[1]) - parseFloat(expItems[3]);
      case "+": 
        return parseFloat(expItems[1]) + parseFloat(expItems[3]); 
      default:
        return "Syntax Error";
    }
  }



  /************** EVENT HANDLERS ******************/
  const handleChange = event => {
    setInputValue(event.target.value); 
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValidationCheck(inputValue)) {
      setAnswerValue(`Invalid Input`);
    } else {
      parseAndCalculate(inputValue)
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  //if validation suceessful, then pass to history box -- use Context?
  //if input invalid, unhide text that warns of invalid input - and highlight box red
  return ( 
    <div className="input-box">
      <input value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} type="text"></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <div className="answer">{answerValue} </div>
    </div>
  )
}

export default InputBox;