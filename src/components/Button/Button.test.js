import React from 'react'
import { renderWithTheme } from 'helpers/testTheme'

import Button from './Button'

describe('Button', () => {
  it('renders without pass children', () => {
    const { container } = renderWithTheme(<Button />)
    expect(container).toMatchSnapshot()
  })

  it('renders with primary variant', () => {
    const { container } = renderWithTheme(<Button variant='primary'>test</Button>)
    expect(container).toMatchSnapshot()
  })

  it('renders with secondary variant', () => {
    const { container } = renderWithTheme(<Button variant='secondary'>test</Button>)
    expect(container).toMatchSnapshot()
  })

  it('renders with ghost variant', () => {
    const { container } = renderWithTheme(<Button variant='ghost'>test</Button>)
    expect(container).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { container } = renderWithTheme(<Button disabled>test</Button>)

    expect(container.firstChild).toHaveAttribute('disabled')
    expect(container).toMatchSnapshot()
  })
})
