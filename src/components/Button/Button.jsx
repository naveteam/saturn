import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { space, layout, flexbox, background, variant } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../'

const CustomButton = forwardRef(({ type, variant, children, color, fontSize, fontWeight, ...props }, ref) => {
  return (
    <Button type={type} color={color} ref={ref} variant={variant} {...props}>
      <Typography color={color} fontSize={fontSize} fontWeight={fontWeight}>
        {children}
      </Typography>
    </Button>
  )
})

const Button = styled('button')(
  {
    width: '100%',
    border: 0,
    borderRadius: 4,
    transition: 'all .5s ease-in-out',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  variant({
    prop: 'variant',
    variants: {
      filled: {
        backgroundColor: 'blue.500',
        '&:hover': {
          bg: 'blue.600'
        },
        '&:active': {
          bg: 'blue.800'
        }
      },
      outline: {
        border: '1px solid blue',
        bg: 'white',
        '&:hover': {
          borderColor: 'blue.600'
        },
        '&:active': {
          borderColor: 'blue.800'
        }
      },
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent'
      },
      disabled: {
        backgroundColor: 'gray.500',
        '&:hover': {
          cursor: 'not-allowed'
        }
      }
    }
  })
)

Button.defaultProps = {
  type: 'submit',
  variant: 'filled',
  color: 'white'
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
