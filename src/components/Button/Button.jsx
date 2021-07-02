import React, { forwardRef } from 'react'

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
        backgroundColor: `${props.theme.colors[`${props.color}`]}`,
        borderColor: `${props.theme.colors[`${props.color}`]}`,
        color: 'white'
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: `${props.theme.colors[`${props.color}`]}`,
        color: `${props.theme.colors[`${props.color}`]}`
      },
      text: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: `${props.theme.colors[`${props.color}`]}`
      }
    }
  })
}

const StyledIcon = styled(Icon)`
  ${colorVariants}
`

const Base = styled.button(
  props => css`
    cursor: pointer;
    padding: 4px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 40px;
    ${layout}
    ${space}
    ${flexbox}
    ${colorVariants(props)}
    &:disabled {
      cursor: initial;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      ${props.variant === 'filled' &&
      css`
        background-color: ${props.theme.colors[`${props.color}_hover`]};
      `}
      ${props.variant !== 'text' &&
      css`
        border-color: ${props.theme.colors[`${props.color}_hover`]};
      `}
      ${(props.variant === 'outlined' || props.variant === 'text') &&
      css`
        color: ${props.theme.colors[`${props.color}_hover`]};
      `}
    }
    &:active {
      ${props.variant === 'filled' &&
      css`
        background-color: ${props.theme.colors[`${props.color}_active`]};
      `}
      ${props.variant !== 'text' &&
      css`
        border-color: ${props.theme.colors[`${props.color}_active`]};
      `}
      ${(props.variant === 'outlined' || props.variant === 'text') &&
      css`
        color: ${props.theme.colors[`${props.color}_active`]};
      `}
    }
    &:disabled {
      ${props.variant === 'filled' &&
      css`
        background-color: ${props.theme.colors.gray['500']};
        border-color: ${props.theme.colors.gray['500']};
        color: white;
      `}
      ${props.variant === 'outlined' &&
      css`
        border-color: ${props.theme.colors.gray['500']};
        color: ${props.theme.colors.gray['500']};
      `}
      ${props.variant === 'text' &&
      css`
        color: ${props.theme.colors.gray['500']};
      `}
    }
    ${StyledIcon} {
      fill: ${props.theme.colors[`${props.color}`]};
      &:hover {
        fill: ${props.theme.colors[`${props.color}_hover`]};
      }
      &:active {
        fill: ${props.theme.colors[`${props.color}_active`]};
      }
      &:disabled {
        fill: disabled;
      }
    }
  `
)

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
