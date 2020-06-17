import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { space, layout, flexbox, background, variant } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../'

const CustomButton = forwardRef(({ type, variant, children, color, fontSize, disabled, fontWeight, ...props }, ref) => {
  const nameColor = color.split('.') // Apenas para mostrar a variação de cores
  return (
    <Button
      type={type}
      color={color}
      colorVariant={nameColor}
      ref={ref}
      variant={disabled ? 'disabled' : variant}
      disabled={disabled}
      {...props}
    >
      <Typography
        color={variant === 'filled' || disabled ? 'white' : color}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </Typography>
    </Button>
  )
})

const Button = styled.button`
  width: 100%;
  border-width: 2px;
  border-radius: 4px;
  border-style: solid;
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
  ${({ color, colorVariant }) =>
    variant({
      variants: {
        filled: {
          backgroundColor: color,
          borderColor: color,
          '&:hover': {
            backgroundColor: `${colorVariant[0]}.600`,
            borderColor: `${colorVariant[0]}.600`
          },
          '&:active': {
            backgroundColor: `${colorVariant[0]}.800`,
            borderColor: `${colorVariant[0]}.800`
          }
        },
        outline: {
          backgroundColor: 'transparent',
          borderColor: color,
          '&:hover': {
            borderColor: `${colorVariant[0]}.600`
          },
          '&:active': {
            borderColor: `${colorVariant[0]}.800`
          }
        },
        text: {
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        },
        disabled: {
          backgroundColor: 'gray.500',
          borderColor: 'gray.500'
        }
      }
    })}
`
Button.defaultProps = {
  type: 'submit',
  variant: 'filled',
  color: 'gray.500'
}

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  fontString: PropTypes.string,
  fontWeight: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default CustomButton
