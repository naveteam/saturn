import React, { forwardRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'

import { Box } from '../Box'
import { Flex } from '../Flex'
import Typography from '../Typography'

const Switch = forwardRef(({ name, label, value, disabled, onChange, defaultChecked, id, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
    onChange && onChange(isChecked)
  }

  return (
    <Flex alignItems='center' {...props}>
      <SwitchContainer enabled={isChecked} disabled={disabled}>
        <HiddenInput
          ref={ref}
          type='checkbox'
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleOnChange}
          checked={isChecked}
        />
        <Controller enabled={isChecked} />
      </SwitchContainer>
      {label && <Typography color={disabled ? 'disabled' : 'gray.900'}>{label}</Typography>}
    </Flex>
  )
})

const colorVariants = ({ theme: { colors } }) =>
  variant({
    prop: 'enabled',
    variants: {
      true: {
        backgroundColor: colors.primary
      },

      false: {
        backgroundColor: colors.gray['700']
      }
    }
  })

const positionVariant = variant({
  prop: 'enabled',
  variants: {
    true: {
      left: '18px'
    },
    false: {
      left: '2px'
    }
  }
})

const SwitchContainer = styled.label(
  ({ disabled, theme }) => css`
    width: 32px;
    height: 16px;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-right: 8px;
    background-color: ${theme.colors.gray['700']};

    ${disabled
      ? css`
          background-color: ${theme.colors.disabled};
          cursor: not-allowed;
        `
      : colorVariants};
  `
)

const HiddenInput = styled.input`
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
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Switch
