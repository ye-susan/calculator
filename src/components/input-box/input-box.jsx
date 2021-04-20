import React, { useState } from 'react';
import './input-box.scss';

export const InputBox = () => {

  const [inputValue, setInputValue] = useState("");

  const inputValidationCheck = input => {
    //pattern to match numbers, whitespace, and arithmetic operators (including single number without operator), excludes any alphabetical characters and expressions that end with operator
    const regex = /^\s*([-+]?)(\d+)(?:\s*([-+*/^])\s*((?:\s[-+])?\d+)\s*)+$|(^\s*([-+]?)(^\d+$))/;

    return regex.test(input);
  }

  const parseAndCalculate = () => {
    //remove extra spaces
    console.log("before: " + inputValue)
    setInputValue(inputValue.replace(/\s{2,}/, ""));
    console.log("after: " + inputValue)

    //replace items inside () with answer
  }
  const handleChange = e => {
    setInputValue(e.target.value); 
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValidationCheck(inputValue) !== true) {
  
      console.log("Invalid Input: " + inputValue);
    } else {
      parseAndCalculate(inputValue)
    }
    
  }
  //if validation suceessful, then pass to history box -- use Context?
  //if input invalid, unhide text that warns of invalid input - and highlight box red

  return ( 
    <div className="input-box">
      <input value={inputValue} onChange={handleChange} type="text"></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default InputBox;
