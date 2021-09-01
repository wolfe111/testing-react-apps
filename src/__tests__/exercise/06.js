// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {
  render,
  screen,
  act,
} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'


jest.mock('react-use-geolocation')

const getCurrentPosition = jest.fn()
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition,
  }
})

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

let setReturnValue
function useMockCurrentPosition() {
  const state = React.useState([])
  setReturnValue = state[1]
  return state[0]
}


test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const fakePosition = {
    coords: {
      latitude: 10,
      longitude: 20,
    },
  }
  //
  // 🐨 create a deferred promise here
  // const {promise, resolve, reject} = deferred()

  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)
  // 🐨 so call mockImplementation on getCurrentPosition
  // 🐨 the first argument of your mock should accept a callback
  // 🐨 you'll call the callback when the deferred promise resolves
  // 💰 promise.then(() => {/* call the callback with the fake position */})
  // callback is calling a state updater function within a third party component that we are using
  // which is trigger an update to the state. React wasn't expecting this to happen and it wants to make sure
  // that we were expecting this to happen. We have to ensure that all the side effects caused by the state update 
  // are flushed before we continue on with our test. There might be a small amount of time between our state updating 
  // which is affect our test

  // exercise 1
  // getCurrentPosition.mockImplementation(callback => {
  //   promise.then(() => {
  //     callback(fakePosition)
  //   })
  // })

  //
  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)
  // 🐨 verify the loading spinner is showing up
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // resolve()
  //
  // 🐨 resolve the deferred promise
  // 🐨 wait for the promise to resolve
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)
  // 🐨 verify the latitude and longitude appear correctly
  // what thi sys is that its going to do all the things (calling the getCurrentPosition callback)
  // once this whole thing resolves then I will flush all the side effects that happened during that time
  // await act(async () => {
  //   // resolve()
  //   // await promise
  //   setReturnValue([fakePosition])
  // })


  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/Latitude/i).textContent).toEqual('Latitude: 10')
  expect(screen.getByText(/Longitude/i).textContent).toEqual('Longitude: 20')
    // expect(screen.getByText(/Longitude: 20/i)).not.toBeInTheDocument()
})


test('displays the alert when getting users location errors', async () => {
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => {
    setReturnValue([null, {message: 'some error'}])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/some error/i)).toBeInTheDocument()
})


/*
eslint
  no-unused-vars: "off",
*/
