import React from 'react'

import { renderWithTheme } from 'helpers/testTheme'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders input type checkbox not selected', () => {
    const { container } = renderWithTheme(<Checkbox label='Not Selected' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders input type checkbox selected', () => {
    const { container } = renderWithTheme(<Checkbox label='Selected' selected />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders input type checkbox disabled', () => {
    const { container } = renderWithTheme(<Checkbox label='Disabled' disabled />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders input type checkbox disable selected', () => {
    const { container } = renderWithTheme(<Checkbox label='Disabled Selected' disabled selected />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders input type checkbox indeterminated', () => {
    const { container } = renderWithTheme(<Checkbox label='Indeterminated' indeterminated />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
