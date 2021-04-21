import React, { useState } from 'react';
import './input-box.scss';

export const InputBox = () => {

  const [inputValue, setInputValue] = useState("");
  const [answerValue, setAnswerValue] = useState("Answer: ");
  
  /************** INPUT VALIDATION ******************/
  const inputValidationCheck = input => {
    //pattern to match numbers, whitespace, and arithmetic operators (including single number without operator), excludes any alphabetical characters and expressions that end with operator
    // const regex = /^\s*([-+]?)(\d+)(?:\s*([-+*/^])\s*((?:\s[-+])?\d+)\s*)+$|(^[-+]*\d+)/;

    // (^\s*([-+]?)(^\d+$))  -- individual number alone
    
    // Output error message if input includes any alphabetical characters
    const regex = /[^a-zA-Z]/;
    return regex.test(input);
  }


  /************** PARSING AND CALCULATING ******************/
  const parseAndCalculate = () => {
   
    //To follow the order of operations (PEMDAS):
    //  Step 1: split on () --> evaluate and replace with answer
    //  Step 2: split on +/-  --> evaluate and replace with answer
    //  Step 3: evaluate entire expression and return answer

    let value = inputValue.slice();

    //Step 1, evaluate items between parentheses (if they exist)
    if (value.includes("(")) {
      let itemsInParen = value.split(/\(([^\)]+)\)/,).filter( i => {
        return i !== "";
      }); //splitting based on items between parentheses

      //console.log(`itemsInParen after split: ${itemsInParen}`); 
      let parenAnswer = 0;
      for (let item of itemsInParen) {
        // console.log(`item in parens: ${item}`)
        item = item.replace(/[()]/,"");
        parenAnswer = applyOperations(item);
      }
      
      value = value.replace(/\(([^\)]+)\)/,parenAnswer)
      console.log(`itemsInParen: ${itemsInParen}`); 
    }

    //Step 2, evaluate expressions with * and / first (if they exist)
    if (value.includes("/") || value.includes("*")){
      let list = inputValue.split(/[+-]+/);
      for (let item of list) {
        //console.log(item);
        value = value.replace(item, applyOperations(item))
        console.log(`value: ${value}`)
      }
    }
   
    value = applyOperations(value);
    return setAnswerValue(`Answer: ${value}`);
  }

  const applyOperations = (expression) => {
    let operator = expression.split(/[\d\s]+/).filter( op => { 
      return op !== "" && op !== "." && op !== "(" && op !== ")" 
    });
    let constants = expression.split(/[/+*-]+/); 
    console.log("expression: " + expression);
    console.log("operator: " + operator);
    console.log("constants: " + constants)

    if (!operator || operator == "") {
      return parseFloat(expression);
    }

    switch(operator[0]) {
      case "/": 
        return parseFloat(constants[0]) / parseFloat(constants[1]);
      case "*": 
        return parseFloat(constants[0]) * parseFloat(constants[1]);
      case "-": 
        return parseFloat(constants[0]) - parseFloat(constants[1]);
      case "+": 
        return parseFloat(constants[0]) + parseFloat(constants[1]); 
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
    if (inputValidationCheck(inputValue) !== true) {
      setAnswerValue(`Invalid Input: ${inputValue}`);
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