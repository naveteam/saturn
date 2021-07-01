import React, { forwardRef } from 'react'
// import styled, { css } from '@xstyled/styled-components'
// import { space, layout, variant, th, flexboxes } from '@xstyled/system'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import { layout, space, flexbox, variant } from 'styled-system'

import { Typography, Flex } from '../'
import { Icon } from '../Iconography'

const Button = forwardRef(({ children, icon, direction, caption, captionColor, description, ...props }, ref) => (
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
          color={captionColor}
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

const colorVariants = props => {
  return variant({
    prop: 'variant',
    variants: {
      filled: {
        backgroundColor: `${({ colors }) => {
          console.log(colors[`${props.color}`])
          return `${colors[`${props.color}`]}`
        }}`,
        borderColor: `${({ colors }) => {
          console.log(colors[`${props.color}`])
          return `${colors[`${props.color}`]}`
        }}`,
        color: 'white'
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: `${({ colors }) => {
          console.log(colors[`${props.color}`])
          return `${colors[`${props.color}`]}`
        }}`,
        color: `${({ colors }) => {
          console.log(colors[`${props.color}`])
          return `${colors[`${props.color}`]}`
        }}`
      },
      text: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: `${({ colors }) => {
          console.log(colors[`${props.color}`])
          return `${colors[`${props.color}`]}`
        }}`
      }
    }
  })
}

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
  ${flexbox}
  ${props => colorVariants(props)}
  &:disabled {
    cursor: initial;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    ${props =>
      props.variant === 'filled' &&
      css`
        background-color: ${`${props.color}_hover`};
      `}
    ${props =>
      props.variant !== 'text' &&
      css`
        border-color: ${`${props.color}_hover`};
      `}
    ${props =>
      (props.variant === 'outlined' || props.variant === 'text') &&
      css`
        color: ${`${props.color}_hover`};
      `}
  }
  &:active {
    ${props =>
      props.variant === 'filled' &&
      css`
        background-color: ${`${props.color}_active`};
      `}
    ${props =>
      props.variant !== 'text' &&
      css`
        border-color: ${`${props.color}_active`};
      `}
    ${props =>
      (props.variant === 'outlined' || props.variant === 'text') &&
      css`
        color: ${`${props.color}_active`};
      `}
  }
  &:disabled {
    background-color: disabled;
    border-color: disabled;
    color: white;
  }
  ${StyledIcon} {
    /* fill: ${props.color};
    &:hover {
      fill: ${`${props.color}_hover`};
    }
    &:active {
      fill: ${`${props.color}_active`};
    }
    &:disabled {
      fill: disabled;
    } */
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
  captionColor: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
  width: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.string
  ]),
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  icon: PropTypes.string,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string
}

export default Button
