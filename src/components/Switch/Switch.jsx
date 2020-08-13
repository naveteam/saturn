import React, { useState, forwardRef } from 'react'
import styled, { css, keyframes } from '@xstyled/styled-components'
import { variant } from '@xstyled/styled-components'

import { Flex, Box } from '../Grid'
import Typography from '../Typography'

const Switch = forwardRef(({ name, label, value, disabled, ...props }, ref) => {
  const [isEnabled, setIsEnabled] = useState(false)
  return (
    <Flex {...props} alignItems='center'>
      <SwitchContainer enabled={isEnabled} disabled={disabled}>
        <HidenInput
          ref={ref}
          type='checkbox'
          name={name}
          id={name}
          value={value}
          onChange={e => setIsEnabled(e.target.checked)}
          disabled={disabled}
        />
        <Controller htmlFor={name} enabled={isEnabled} />
      </SwitchContainer>
      {label && <Typography>{label}</Typography>}
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
      animation: ${keyframes`from { left: 2px } to { right: 2px }`} 1s ease-out;
      right: 2px;
      transition: all 0.3s ease-in-out;
    `,
    false: css`
      animation: ${keyframes`from { right: 2px } to { left: 2px }`} 1s ease-out;
      left: 2px;
      transition: all 0.3s ease-in-out;
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

  transition: all 0.3s ease-in-out;

  ${positionVariant}
`

export default Switch
