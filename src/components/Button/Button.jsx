import React, { forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { layout, variant, th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography } from '../'

const Button = forwardRef(({ children, ...props }, ref) => (
  <Base ref={ref} {...props}>
    <Typography fontSize={2} fontWeight={1} lineHeight={3}>
      {children}
    </Typography>
  </Base>
))

const colorVariants = variant({
  default: 'filled',
  key: 'button',
  variants: {
    filled: css`
      background-color: ${({ color }) => th.color(color)};
      border-color: ${({ color }) => th.color(color)};
      color: white;
      &:hover {
        background-color: ${({ color }) => th.color(`${color}_hover`)};
        border-color: ${({ color }) => th.color(`${color}_hover`)};
      }
      &:active {
        background-color: ${({ color }) => th.color(`${color}_active`)};
        border-color: ${({ color }) => th.color(`${color}_active`)};
      }
      &:disabled {
        background-color: disabled;
        border-color: disabled;
        color: white;
      }
    `,
    outlined: css`
      background-color: transparent;
      border-color: ${({ color }) => th.color(color)};
      color: ${({ color }) => th.color(color)};
      &:hover {
        border-color: ${({ color }) => th.color(`${color}_hover`)};
        color: ${({ color }) => th.color(`${color}_hover`)};
      }
      &:active {
        border-color: ${({ color }) => th.color(`${color}_active`)};
        color: ${({ color }) => th.color(`${color}_active`)};
      }
      &:disabled {
        border-color: disabled;
        color: disabled;
      }
    `,
    text: css`
      background-color: transparent;
      border-color: transparent;
      color: ${({ color }) => th.color(color)};
      &:hover {
        color: ${({ color }) => th.color(`${color}_hover`)};
      }
      &:active {
        color: ${({ color }) => th.color(`${color}_active`)};
      }
      &:disabled {
        color: disabled;
      }
    `
  }
})

const Base = styled.button`
  cursor: pointer;
  padding: 2;
  border-width: 1px;
  border-style: solid;
  border-radius: 2;
  min-height: 40px;
  ${layout}
  ${colorVariants}
  &:disabled {
    cursor: initial;
  }
  &:focus {
    outline: none;
  }
`

Button.defaultProps = {
  color: 'primary',
  variant: 'filled',
  width: 1
}

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
  width: PropTypes.oneOfType([PropTypes.arrayOf([PropTypes.number]), PropTypes.number])
}

export default Button
