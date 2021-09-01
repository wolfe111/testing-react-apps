// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import {render} from 'test/test-utils.js'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'


// we are defaulting the theme to light but are not defaulting the theme overacting object to anything
// so we need to do that
function renderWithTheme(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )

  return rtlRender(ui, {wrapper: Wrapper, ...options})
}


test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // render(<EasyButton>Easy</EasyButton>, {wrapper: ThemeProvider})
  // renderWithTheme(<EasyButton>Easy</EasyButton>)
  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})


test('renders with the dark styles for the dark theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // const Wrapper = ({children}) => (
  //    <ThemeProvider initialTheme={"dark"}>{children}</ThemeProvider>
  // )
  // renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: "dark"})
  render(<EasyButton>Easy</EasyButton>, {theme: "dark"})
  // render(<EasyButton>Easy</EasyButton>, 'dark')
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    backgroundColor: black;
    color: white;
  `)
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})


/* eslint no-unused-vars:0 */
