import React, { useState } from 'react';
import './input-box.scss';

export const InputBox = () => {

  const [inputValue, setInputValue] = useState("");

  const inputValidationCheck = input => {
    //pattern to match numbers, whitespace, and arithmetic operators (including single number without operator), excludes any alphabetical characters and expressions that end with operator
    const regex = /^\s*([-+]?)(\d+)(?:\s*([-+*/^])\s*((?:\s[-+])?\d+)\s*)+$|(^\s*([-+]?)(^\d+$))/;

    // (^\s*([-+]?)(^\d+$))  -- individual number alone

    return regex.test(input);
  }

  const parseAndCalculate = () => {
    let total = 0;
    // let constantList = inputValue.split(/[/+*-]+/);
    // let operatorList = inputValue.split(/[\d\s]+/).filter((value) => {
    //   return value !== "";
    // } );
    
    //  To follow the order of operations (PEMDAS):
    //split on () --> evaluate and replace with answer
    //split on +/-  --> evaluate and replace with answer
    //evaluate entire expression and return answer

    //Calculate / and *
    let list = inputValue.split(/[+-]+/);
    // console.log(list)    

    console.log('answer: '+applyOperation(list[0]))
    return total;
  }

  const applyOperation = (expression) => {
    let operator = expression.split(/[\d\s]+/).filter( value => { return value !== ""});
    let constants = expression.split(/[/+*-]+/);

    //can't use switch b/c it uses the strict comparison
    if(operator == "/") {
      return constants[0] / constants[1];
    } else if (operator == "*") {
      return constants[0] * constants[1]; 
    } else if (operator == "+") {
      return constants[0] + constants[1]; 
    } else if (operator == "-") {
      return constants[0] - constants[1]; 
    } else {
      return "Syntax Error"
    }
 
  }

  /************** EVENT HANDLERS ******************/
  const handleChange = event => {
    setInputValue(event.target.value); 
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValidationCheck(inputValue) !== true) {
      console.log("Invalid Input: " + inputValue);
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
    </div>
  )
}

export default InputBox;
