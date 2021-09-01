// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import faker from 'faker'
import { build, fake } from '@jackfranklin/test-data-bot'

import Login from '../../components/login'

// function buildLoginForm(overrides) {
//   return {
//     username: faker.internet.userName(),
//     password:faker.internet.password(),
//     ...overrides
//   }
// }

const userBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
  },
});

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  // let submittedData

  // const handleSubmit = data => (submittedData = data)
  // const {username: usernameText, password: passwordText} = buildLoginForm()
  const {username, password} = userBuilder()

  const handleSubmit = jest.fn()

  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText("Username")
  // const username = screen.getByRole('textbox', {'name': /username/i});
  const passwordInput = screen.getByLabelText("Password")
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  // expect(submittedData.username).toEqual('Bob')
  // expect(submittedData.password).toEqual('password')
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
