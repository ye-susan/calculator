# Calculator (VidMob)

## Running the application:
`npm install` to download packages and `npm start` to run

## Application Architecture

```
Calculator
│ README.md
└─App 
  └── InputBox
      Accepts inputs, validates them, and calculates answers
  └── DisplayHistory
      Records past validated expressions with the answers, can refill input box with historical expressions
```

### To Do
- [ ] validate input - accept only arithmetic operators and numbers
- [ ] splitting expressions into chunks
- [ ] calculating expressions based on PEMDAs order

- [ ] build history box