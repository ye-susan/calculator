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
    let constantList = inputValue.split(/[/+*-]+/);
    let operatorList = inputValue.split(/[\d\s]+/).filter((value) => {
      return value !== "";
    } );

    console.log(constantList)
    console.log(operatorList)
    return total;
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
