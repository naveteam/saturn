import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, up, typography } from '@xstyled/styled-components'

import { Typography } from '../'

const Checkbox = forwardRef(({ color, label, ...props }, ref) => {
  return (
    <LabelContainer color={color}>
      <Input type='checkbox' ref={ref} {...props} />
      <CheckIcon />
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
  margin: 6;
  margin-left: 0;
  color: gray.800;
  min-height: 24px;
  min-width: 24px;

  ${up(
    'sm',
    css`
      display: flex;
      margin-right: 0;
      margin: 4;
    `
  )}

  &
    ~ input:checked
    p {
    color: gray.900;
    ${typography}
  }
  ${typography}
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;

  &:not(:disabled),
  &:not(:disabled) + span {
    cursor: pointer;
  }

  &:disabled,
  &:disabled + span {
    cursor: not-allowed;
  }

  &:checked:disabled + span {
    background-color: gray.400;
  }

  &:checked:not(:disabled) + span {
    background-color: blue.400;
    border-color: blue.400;
  }

  &:disabled + span {
    border-color: gray.400;
  }

  &:disabled ~ p {
    color: gray.500 !important;
  }

  &:checked ~ span:after {
    display: block;
    transform: translateX(-50%) translateY(calc(-50% - 2px)) rotate(45deg);
  }
`

const CheckIcon = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  border: solid 2px;
  border-color: gray.700;
  border-radius: 2;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    width: 7px;
    height: 15px;
    border: solid white;
    border-width: 0 3px 3px 0;
  }
`

export default Checkbox
