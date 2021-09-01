// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {renderHook, act as renderHookAct} from '@testing-library/react-hooks'


// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

function CounterTest() {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <button onClick={() => {increment()}}>+</button>
      <button onClick={() => {decrement()}}>-</button>
      <p>Count: {count}</p>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component

  render(<CounterTest/>)
  // 🐨 get the elements you need using screen
  // const increment = screen.getByText('+')
  const increment = screen.getByRole('button', {name: '+'})
  const decrement = screen.getByText('-')
  // 🐨 assert on the initial state of the hook
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(increment)
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
  userEvent.click(decrement)
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
})


test('tests useCounter with TestComponent', () => {
  let result
  function TestComponent(props) {
    result = useCounter()
    return null
  }
  render(<TestComponent/>)

  expect(result.count).toEqual(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toEqual(1)
  act(() => {
    result.decrement()
  })
  expect(result.count).toEqual(0)
})

// The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.
// i.e. it copies the results to all the objects made the this object. This means you do not need to do what you do in setup2
// as all the targets (hookValue) are updated with the new values. 
// either way is acceptable
function setup(props) {
    const results = {}
    function TestComponent(props) {
      console.log('setUp', results)
      Object.assign(results, useCounter(props))
      return null
  }

  render(<TestComponent {...props}/>)
  return results
}

// you can't use result = useCounter(props) here! 
// This is because even though you are reassigning result to be the new value,
// hookValue (1 below) is still pointing at the old value and hasn't been updated with the re-render
function setup2(props) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
}

render(<TestComponent {...props}/>)
return result
}


test('allows customization of the initial count', () => {
  const hookValue = setup({initialCount: 100})

  expect(hookValue.count).toEqual(100)
  act(() => {
    hookValue.increment()
  })
  console.log('hookValue', hookValue)

  expect(hookValue.count).toEqual(101)
})


test('allows customization of the step', () => {
  // 1) here
  const hookValue = setup2({step: 100})
  expect(hookValue.current.count).toEqual(0)
  act(() => {
    hookValue.current.increment()
  })
  expect(hookValue.current.count).toEqual(100)
})

// Uses a different act function to the test above as its using a different render
test('allows customization of the step with renderHook', () => {
  const {result} = renderHook(() => useCounter({step: 100}))
  expect(result.current.count).toEqual(0)
  renderHookAct(() => {
    result.current.increment()
  })
  expect(result.current.count).toEqual(100)
})



/* eslint no-unused-vars:0 */
