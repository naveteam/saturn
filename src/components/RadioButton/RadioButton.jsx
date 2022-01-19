import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { typography } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../'
import { Flex } from '../Flex'
import { Icon } from '../Iconography'

const RadioButton = forwardRef(({ color, label, disabled, checked, name, onChange, value, ...props }, ref) => {
  return (
    <LabelContainer as='label' color={color} minHeight={24} {...props}>
      <Input
        type='radio'
        value={value}
        ref={ref}
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={onChange}
        {...props}
      />
      <CheckedIcon icon='radio_button_checked' color='primary' />
      <UncheckedIcon icon='radio_button_outline' />
      {label && (
        <Typography fontSize={3} lineHeight={3} fontWeight={0} paddingLeft={3}>
          {label}
        </Typography>
      )}
    </LabelContainer>
  )
})

const CheckedIcon = styled(Icon)`
  display: none;
`
const UncheckedIcon = styled(Icon)`
  & path {
    fill: gray.700;
  }
`
const LabelContainer = styled(Flex)`
  color: gray.800;

  & > input:checked:enabled ~ p {
    color: gray.900;
    ${typography}
  }
  ${typography}
`
const Input = styled.input`
  opacity: 0;
  margin: 0;
  height: 0;
  width: 0;

  & ~ p,
  & ~ svg {
    cursor: pointer;
  }

  &:disabled ~ p,
  &:disabled ~ svg {
    cursor: not-allowed;
  }

  &:checked + ${CheckedIcon} {
    display: inherit;
    & + ${UncheckedIcon} {
      display: none;
    }
  }

  &:disabled ~ svg path {
    fill: gray.400;
  }

  &:disabled ~ p {
    color: disabled;
  }
`

RadioButton.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
}

export default RadioButton
