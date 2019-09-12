import React from 'react'

import { renderWithTheme } from 'helpers/testTheme'

import Input from './Input'

describe('Input', () => {
  it('renders input with label', () => {
    const { container } = renderWithTheme(<Input label='Label' />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with caption', () => {
    const { container } = renderWithTheme(<Input caption='Caption' />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with left icon', () => {
    const { container } = renderWithTheme(
      <Input
        leftIcon={
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V14C16 11.34 10.67 10 8 10Z'
              fill='#7F7F7F'
            />
          </svg>
        }
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with right icon', () => {
    const { container } = renderWithTheme(
      <Input
        rightIcon={
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V14C16 11.34 10.67 10 8 10Z'
              fill='#7F7F7F'
            />
          </svg>
        }
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders disabled input', () => {
    const { container } = renderWithTheme(<Input disabled />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders error input', () => {
    const { container } = renderWithTheme(<Input error='error message' />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders verified input', () => {
    const { container } = renderWithTheme(<Input verified />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
