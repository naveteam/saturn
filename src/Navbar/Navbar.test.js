import React from 'react'
import { renderWithTheme } from '../../helpers/testTheme'

import Navbar from './Navbar'

describe('Navbar', () => {
  it('render without ´right´ prop', () => {
    const { container } = renderWithTheme(<Navbar />)
    expect(container).toMatchSnapshot()
  })
})
