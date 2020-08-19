import React, { useState, forwardRef } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Flex, Box } from '../Grid'
import Typography from '../Typography'

const Switch = forwardRef(({ name, label, value, disabled, onChange, defaultChecked, checked, ...props }, ref) => {
  const [isEnabled, setIsEnabled] = useState(defaultChecked)
  return (
    <Flex alignItems='center' {...props}>
      <SwitchContainer enabled={isEnabled} disabled={disabled}>
        <HidenInput
          ref={ref}
          type='checkbox'
          name={name}
          id={name}
          value={value}
          onChange={e => {
            setIsEnabled(e.target.checked)
            if (onChange) onChange(e)
          }}
          disabled={disabled}
          defaultChecked={defaultChecked}
          checked={checked}
        />
        <Controller htmlFor={name} enabled={isEnabled} />
      </SwitchContainer>
      {label && <Typography color={disabled ? 'disabled' : 'gray.900'}>{label}</Typography>}
    </Flex>
  )
})

const colorVariants = variant({
  default: false,
  prop: 'enabled',
  variants: {
    true: css`
      background-color: primary;
    `,

    false: css`
      background-color: gray.700;
    `
  }
})

const positionVariant = variant({
  default: false,
  prop: 'enabled',
  variants: {
    true: css`
      left: 18px;
    `,
    false: css`
      left: 2px;
    `
  }
})

const SwitchContainer = styled.label`
  width: 32px;
  height: 16px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-right: 8px;

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: disabled;
          cursor: not-allowed;
        `
      : colorVariants}
`

const HidenInput = styled.input`
  display: none;
`

const Controller = styled(Box)`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;

  transition: all 0.3s ease-in-out;

  ${positionVariant}
`

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.any
}

export default Switch
