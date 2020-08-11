import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, down, up, typography } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'

const Checkbox = forwardRef(({ color, label, ...props }, ref) => {
  return (
    <LabelContainer color={color}>
      <Input type='checkbox' ref={ref} {...props} />
      <Checkmark />
      {label && (
        <Typography fontSize={3} lineHeight={3} fontWeight={0} marginLeft={6}>
          {label}
        </Typography>
      )}
    </LabelContainer>
  )
})

Checkbox.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string
}

const LabelContainer = styled.label`
  display: inline-flex;
  vertical-align: top;
  position: relative;
  user-select: none;
  margin-left: 0;
  color: gray.800;
  min-height: 24px;
  min-width: 24px;

  ${down(
    'sm',
    css`
      display: flex;
    `
  )}

  &
    ~ input:checked
    p {
    color: gray.900;
  }
  ${typography}
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  cursor: pointer;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
  }

  &:checked + span svg {
    visibility: visible;
  }

  &:checked:disabled + span {
    background-color: gray.400;
  }

  &:checked:not(:disabled) + span {
    background-color: primary;
    border-color: primary;
  }

  &:disabled + span {
    border-color: gray.400;
  }

  &:disabled ~ p {
    color: disabled;
  }
`

const StyledCheckmark = styled.span`
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  border: solid 2px;
  border-color: gray.700;
  border-radius: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    visibility: hidden;
  }
`

const Checkmark = () => (
  <StyledCheckmark>
    <Icon icon='check' color='white' height='20' />
  </StyledCheckmark>
)

export default Checkbox
