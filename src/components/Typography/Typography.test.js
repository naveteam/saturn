import React from 'react'

import { renderWithTheme } from 'helpers/testTheme'

import Typography from './Typography'

describe('Typography', () => {
  it('renders without pass children', () => {
    const { container } = renderWithTheme(<Typography />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it("renders <p> tag if no 'as'", () => {
    const { container } = renderWithTheme(<Typography>font</Typography>)

    expect(container.firstChild).toMatchSnapshot()
  })

  it("renders <h1> element if passed as 'as'", () => {
    const { container } = renderWithTheme(<Typography as='h1'>font</Typography>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with red color', () => {
    const { container } = renderWithTheme(<Typography color='red'>font</Typography>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom font-size of 40px', () => {
    const { container } = renderWithTheme(<Typography fontSize='40px'>font</Typography>)
    expect(container.firstChild).toMatchSnapshot()
  })
})
