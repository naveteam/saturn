import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../'
import { Flex } from '../Grid'
import { Icon } from '../Iconography'

const RadioButton = forwardRef(
  (
    { name, label, value, disabled = false, onChange, defaultChecked = false, checked = false, color, id, ...props },
    ref
  ) => {
    return (
      <Flex alignItems='center' {...props}>
        <RadioButtonContainer disabled={disabled}>
          <HiddenInput
            ref={ref}
            type='radio'
            name={name}
            id={id}
            value={value}
            onChange={e => {
              if (onChange) onChange(e)
            }}
            disabled={disabled}
            defaultChecked={defaultChecked}
            checked={checked ? checked : undefined}
          />

          <CheckedIcon icon='radio_button_checked' color={disabled ? 'disabled' : 'primary'} />
          <UncheckedIcon icon='radio_button_outline' color={disabled ? 'disabled' : 'gray.800'} />
          {label && (
            <Typography
              fontSize={3}
              lineHeight={3}
              fontWeight={0}
              paddingLeft={3}
              color={disabled ? 'disabled' : color ? color : 'gray.800'}
            >
              {label}
            </Typography>
          )}
        </RadioButtonContainer>
      </Flex>
    )
  }
)

const CheckedIcon = styled(Icon)`
  opacity: 0;
  transition: opacity 0.2s linear;
`
const UncheckedIcon = styled(Icon)`
  opacity: 1;
  position: absolute;
  transition: opacity 0.2s linear;
`

const RadioButtonContainer = styled.label(
  ({ disabled }) => css`
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    ${disabled
      ? css`
          cursor: not-allowed;
        `
      : ''}
  `
)
const HiddenInput = styled.input`
  display: none;

  &:checked + ${CheckedIcon} {
    opacity: 1;

    & + ${UncheckedIcon} {
      opacity: 0;
    }
  }
`

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  color: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default RadioButton
