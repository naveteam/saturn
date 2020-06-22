import React, { Fragment, useState, useMemo } from 'react'
import styled from 'styled-components'

import { Flex, Box, Paragraph } from '../index'

const Checkbox = ({ label, name, register, value, disabled }) => {
  // Just respected on uncontrolled components
  const [internalValue, setInternalValue] = useState(!!value)
  const indicatorValue = useMemo(() => (value !== undefined ? value : internalValue), [value, internalValue])

  const handleChange = event => setInternalValue(event.target.checked)

  return (
    <Fragment>
      {/* Invisible input to use the ref, only usefull at form's */}
      <input
        onChange={handleChange}
        style={{ display: 'block' }}
        type='checkbox'
        name={name}
        register={register}
        id='checkbox'
        checked={indicatorValue}
      />
      <Flex alignItems='center'>
        <label htmlFor='checkbox'>
          <Indicator
            disabled={disabled}
            checked={indicatorValue}
            height={18}
            width={18}
            margin='3px'
            borderRadius='5px'
          />
        </label>
        <Paragraph marginLeft='8px' color={disabled ? 'gray.500' : 'gray.800'}>
          {label}
        </Paragraph>
      </Flex>
    </Fragment>
  )
}

Checkbox.defaultProps = {}

const Indicator = styled(Box)`
  transition: all ease 0.1s;
  border-radius: 4px;

  ${({
    disabled,
    checked,
    theme: {
      colors: { blue, gray }
    }
  }) => `
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    background-color: ${checked ? (disabled ? gray['400'] : blue['400']) : 'transparent'};
    border: 2px solid ${disabled ? gray['400'] : checked ? blue['400'] : gray['700']};
  `}
`

export default Checkbox
