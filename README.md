# Calculator (VidMob)

## Description of the application:
A simple React application to calculate arithmetic expressions without the use of JavaScript's eval() function. 

The application is able to calculate: 
- + and - for whole numbers
- + and - for all integers
- * and / for all integers
- expressions within 1 layer of parentheses (not nested)

## Running the application:
`npm install` to download packages and `npm start` to run

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
- Building in additional function to handle nested (), i.e. ((3+4)*(35-3))
- Building capability to handle answers that are larger than JavaScript's max float number
- 
