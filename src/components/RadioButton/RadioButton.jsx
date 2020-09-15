import React, { forwardRef } from 'react'
import styled, { css, down, typography } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'

const RadioButton = forwardRef(({ color, label, ...props }, ref) => {
  return (
    <LabelContainer color={color}>
      <Input type='radio' ref={ref} {...props} />
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

export default RadioButton
