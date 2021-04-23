import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import { InputBox } from './input-box'

it('testing input and output DOM elements', () => {  
  const { getByTestId } = render(<InputBox />); 
  fireEvent.change(getByTestId('input-element'), {target: {value: ''}})
  expect(getByTestId('answer-element')).toHaveTextContent("Answer:")
});

test('component calculates 1+2 to 3', () => {
  const testExpression = '1+2'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("3")
})

test('component calculates 4*5/2 to 10', () => {
  const testExpression = '4*5/2'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("10")
})

test('component calculates -5+-8--11*2 to 9', () => {
  const testExpression = '-5+-8--11*2'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("9")
})

test('component calculates -.32       /.5 to -0.64', () => {
  const testExpression = '-.32       /.5'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("-0.64")
})

test('component calculates (4-2)*3.5 to 7', () => {
  const testExpression = '(4-2)*3.5'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("7")
})

test('component calculates 2+-+-4 to give Syntax Error', () => {
  const testExpression = '2+-+-4'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("Syntax Error")
})

test('component calculates 19 + cinnamon to give Invalid Input', () => {
  const testExpression = '19 + cinnamon'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("Invalid Input")
})

test('component calculates (8-3)*(5---3) to 10', () => {
  const testExpression = '(8-3)*(5---3)'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("10")
})

test('component calculates 0 to 0', () => {
  const testExpression = '0'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("0")
})

test('component calculates 350--*6 to give Syntax Error', () => {
  const testExpression = '350--*6'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("Syntax Error")
})

test('component calculates (8-3)/(5-3)*5-3.25 to 9.25', () => {
  const testExpression = '(8-3)/(5-3)*5-3.25'
  const { getByTestId } = render(<InputBox/>)

  fireEvent.change(getByTestId('input-element'), { target: { value: testExpression}});
  fireEvent.click(getByTestId("submit-button"))
  expect(getByTestId('answer-element')).toHaveTextContent("9.25")
})