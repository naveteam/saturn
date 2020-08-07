import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { css, down, typography, variant } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'

const getIcon = checked => (checked ? 'checkbox_checked' : 'checkbox_outline')
const getVariant = (checked, disabled) => (disabled ? 'disabled' : checked ? 'checked' : 'base')

const Checkbox = ({ checked: propsChecked, color, disabled, onChange = () => {}, text, ...props }) => {
  const [checked, setChecked] = useState(propsChecked)

  return (
    <LabelContainer color={color} variant={getVariant(checked, disabled)}>
      <Icon icon={getIcon(checked)} height='24' />
      <Typography fontSize={3} lineHeight={3} fontWeight={0} marginLeft={3}>
        {text}
      </Typography>
      <Input
        type='checkbox'
        onChange={e => {
          setChecked(e.target.checked)
          onChange()
        }}
        defaultChecked={propsChecked}
        disabled={disabled}
        {...props}
      />
    </LabelContainer>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  text: 'Default Text'
}

const variants = variant({
  variants: {
    base: css`
      color: gray.800;

      svg path {
        fill: gray.700;
      }
    `,
    checked: css`
      color: gray.900;

      svg path {
        fill: blue.400;
      }
    `,
    disabled: css`
      color: gray.500 !important;
      cursor: not-allowed;

      svg path {
        fill: gray.400;
      }
    `
  },
  prop: 'variant'
})

const LabelContainer = styled.label`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin-right: 6;

  ${down(
    'sm',
    css`
      display: flex;
      margin-right: 0;
      margin-bottom: 4;
    `
  )}

  ${variants}
  ${typography}
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

export default Checkbox
