import React, { useState } from 'react';
import './input-box.scss';

export const InputBox = () => {

  const [inputValue, setInputValue] = useState("");
  const [answerValue, setAnswerValue] = useState("Answer: ");
  
  /************** INPUT VALIDATION ******************/
  const inputValidationCheck = input => {  
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
    //const multDivExp = /[+-]?\d*\.?\d+\s*([*/])\s*([+-]?\d*\.?\d+)/;
    const multDivExp = /[-]?\d*\.?\d+\s*([*/])\s*([-]?\d*\.?\d+)/;
    const addSubtExp = /([+-]?\d*\.?\d+)\s*([+-])\s*([+-]?\d*\.?\d+)/;

    //while value is not standalone number - keep evaluating
    // while (value.search(/^\s*([+-]?\d*\.?\d+)\s*$/) === -1) {
      
      //Step 1, evaluate items between parentheses (if they exist)
      if (value.includes("(")) {
        let itemsInParen = value.split(/\(([^\)]+)\)/).filter( i => {
          return i !== "";
        }); //splitting based on items between parentheses

        console.log(`itemsInParen after split: ${itemsInParen}`); 
        let parenAnswer = 0;
        for (let item of itemsInParen) {
          console.log(`item in parens: ${item}`)
          item = item.replace(/[()]/,"");
          parenAnswer = applyOperations(item);
        }
        
        value = value.replace(/\(([^\)]+)\)/,parenAnswer)
        //console.log(`itemsInParen: ${itemsInParen}`); 
      }

      //Step 2, evaluate expressions with * and / first (if they exist)
      while (value.includes("/") || value.includes("*")){
        //replace the * and / expressions with the evaluated answers
        value = value.replace( multDivExp, function(exp) {
          return applyOperations(exp);
        })
        console.log(`value after calculating */ : ${value}`)
      }

      while (value.includes("+") || value.includes("-")){
        //replace the * and / expressions with the evaluated answers
        value = value.replace( addSubtExp, function(exp) {
          return applyOperations(exp);
        })
        console.log(`value after calculating +- : ${value}`)
      }
    
      if(value.includes("NaN") || value.includes("Syntax Error")) {
        return setAnswerValue(`Syntax Error`);
      } else {
        value = applyOperations(value).toString();
      }
      //console.log(`value type: ${typeof(value)}`)
    //} //for while loop

    return setAnswerValue(`Answer: ${value}`);
  }

  const applyOperations = (expression) => {

    //check if number is negative
    // if (expression[0] === "-" || expression[0] === "+") {
    //   console.log(typeof(expression))
    //   console.log("expression parsed: " + parseFloat(expression));
    //   return parseFloat(expression);
    // }

    //checking for double operators
    expression = expression.replace(/([+-])([+-])(\d|\.)/g, function (a, b, c, d) { 
      return (b === c ? '+' : '-') + d; 
    });

    let operator = expression.split(/[\d\s]+/).filter( op => { 
      return op !== "" && op !== "." && op !== "(" && op !== ")" 
    });

    //constants can have +/- in front 
    let constants = expression.split(/[/+*-]+/); 

    console.log("expression: " + expression);
    console.log("operator: " + operator);
    console.log("constants: " + constants)
    console.log(`constants[0]: ${constants[0]} constants[1]: ${constants[1]}`);

    //for returning standalone "expressions"
    if(!constants[1] || constants[1] === "") {
      console.log(`returning parsed orig expression`)
      return expression;
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