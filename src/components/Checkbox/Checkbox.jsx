import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, down, typography } from '@xstyled/styled-components'

import { Typography } from '../'
import { Flex } from '../Grid'
import { Icon } from '../Iconography'

const Checkbox = forwardRef(
  (
    { name, label, value, disabled = false, onChange, defaultValue = false, checked, color, colorIcon, id, ...props },
    ref
  ) => {
    return (
      <CheckboxContainer disabled={disabled} {...props}>
        <HiddenInput
          ref={ref}
          type='checkbox'
          name={name}
          id={id}
          value={value}
          onChange={e => onChange && onChange(e)}
          disabled={disabled}
          defaultValue={defaultValue}
          checked={checked}
        />

        <CheckedIcon icon='checkbox_checked' color={disabled ? 'disabled' : colorIcon ?? color ?? 'primary'} />
        <UncheckedIcon icon='checkbox_outline' color={disabled ? 'disabled' : 'gray.800'} />
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
      </CheckboxContainer>
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

const CheckboxContainer = styled.label(
  ({ disabled }) => css`
    height: 24px;
    display: inline-flex;
    vertical-align: top;
    position: relative;
    user-select: none;
    align-items: center;
    cursor: pointer;
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

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  color: PropTypes.string,
  colorIcon: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Checkbox
