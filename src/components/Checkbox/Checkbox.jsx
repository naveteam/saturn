import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, down, typography } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'

const Checkbox = forwardRef(({ color, label, ...props }, ref) => {
  return (
    <LabelContainer color={color}>
      <Input type='checkbox' ref={ref} {...props} />
      <CheckedIcon icon='checkbox_checked' color='primary' />
      <UncheckedIcon icon='checkbox_outline' />
      {label && (
        <Typography fontSize={3} lineHeight={3} fontWeight={0} paddingLeft={3}>
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

const CheckedIcon = styled(Icon)`
  display: none;
`
const UncheckedIcon = styled(Icon)``

const LabelContainer = styled.label`
  display: inline-flex;
  vertical-align: top;
  position: relative;
  user-select: none;
  color: gray.800;
  min-height: 24px;

  ${down(
    'sm',
    css`
      display: flex;
    `
  )}

  & >
    input:checked:enabled
    ~ p {
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
  & ~ span,
  & ~ svg {
    cursor: pointer;
  }

  &:disabled ~ p,
  &:disabled ~ span,
  &:disabled ~ svg {
    cursor: not-allowed;
  }

  &:checked + ${CheckedIcon} {
    display: inherit;
    & + ${UncheckedIcon} {
      display: none;
    }
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

export default Checkbox
