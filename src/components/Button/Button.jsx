import React, { forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { space, layout, variant, th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography, Flex } from '../'
import { Icon } from '../Iconography'

const Button = forwardRef(({ children, icon, direction, caption, description, ...props }, ref) => (
  <Base ref={ref} {...props}>
    <Container flexDirection={description ? 'column' : direction}>
      {icon && (
        <StyledIcon
          icon={icon}
          mr={direction === 'row' ? 3 : 0}
          ml={direction === 'row-reverse' ? 3 : 0}
          mb={direction === 'column' ? 3 : 0}
          fill={props.variant === 'filled' ? 'white' : props.color}
        />
      )}
      {caption && (
        <Typography
          fontSize={2}
          fontWeight={1}
          lineHeight={3}
          mb={direction === 'column' && (description || children) ? 3 : 0}
        >
          {caption}
        </Typography>
      )}
      {description && (
        <Typography px={7} fontSize={2} fontWeight={0} lineHeight={3}>
          {description}
        </Typography>
      )}
      {children}
    </Container>
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
      ${StyledIcon} {
        fill: ${({ color }) => th.color(color)};
        &:hover {
          fill: ${({ color }) => th.color(`${color}_hover`)};
        }
        &:active {
          fill: ${({ color }) => th.color(`${color}_active`)};
        }
        &:disabled {
          fill: disabled;
        }
      }
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

const StyledIcon = styled(Icon)`
  ${colorVariants}
`

const Base = styled.button`
  cursor: pointer;
  padding: 2;
  border-width: 1px;
  border-style: solid;
  border-radius: 2;
  min-height: 40px;
  ${layout}
  ${space}
  ${colorVariants}
  &:disabled {
    cursor: initial;
  }
  &:focus {
    outline: none;
  }
`

const Container = styled(Flex)`
  justify-content: center;
  align-items: center;
`

Button.defaultProps = {
  color: 'primary',
  variant: 'filled',
  width: 1,
  direction: 'row'
}

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
  width: PropTypes.oneOfType([PropTypes.arrayOf([PropTypes.number]), PropTypes.number]),
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  icon: PropTypes.string,
  caption: PropTypes.string,
  description: PropTypes.string
}

export default Button
