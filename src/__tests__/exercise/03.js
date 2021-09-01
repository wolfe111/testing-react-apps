// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here:
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const [decrement, increment] = container.querySelectorAll('button')
  // const message = container.firstChild.querySelector('div')
  // const increment = screen.getByText("Increment")
  const increment = screen.getByRole("button", {name: /increment/i})
  // const decrement = screen.getByText("Decrement")
  const decrement = screen.getByRole("button", {name: /decrement/i})

  const message = screen.getByText(/current count/i)


  expect(message).toHaveTextContent('Current count: 0')
  // fireEvent.click(increment)
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  // fireEvent.click(decrement)
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
