# Calculator (VidMob)

## Description of the application:
A simple React application to calculate arithmetic expressions without the use of JavaScript's eval() function.

The application is able to calculate: 
- + and - for whole numbers
- + and - for all integers
- * and / for all integers
- expressions within 1 layer of parentheses (not nested)
- and includes tests to check the correctness of the component's outputs for given expressions
## Running the application:
`npm install` to download packages and `npm start` to run
`npm test` to run React Library Test/Jest tests
## Application Architecture

```
Calculator
│ README.md
└─App 
  └── InputBox
      (Accepts inputs, validates them, and calculates answers)
  └── DisplayHistory
      (Records past validated expressions with the answers, can refill input box with historical expressions)
```

### Future To Do / Improving the Application 
- Build additional function to handle nested parentheses, i.e. ((3+4)*(35-3))
- Build capability to handle answers that are larger than JavaScript's max float number
- Set types explicitly for variables that can have null values
- Improve logic to be less sensitive (to solve) edge cases such as "30*+5"
- Add more test cases
