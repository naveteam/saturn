import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, down, typography, variant } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'

const Checkbox = ({ checked, color, disabled, text, ...props }) => {
  const [selected, setSelected] = React.useState(checked)
  return (
    <LabelContainer color={color} variant={disabled ? 'disabled' : selected ? 'checked' : 'base'}>
      <Icon icon={selected ? 'checkbox_checked' : 'checkbox_outline'} height='24px' width='24px' />
      <Typography fontSize={3} lineHeight={3} fontWeight={0} marginLeft={3}>
        {text}
      </Typography>
      <Input
        type='checkbox'
        onChange={() => setSelected(current => !current)}
        defaultChecked={selected}
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
      ${typography}

      svg path {
        fill: gray.700;
      }
    `,
    checked: css`
      color: gray.900;
      ${typography}

      svg path {
        fill: blue.400;
      }
    `,
    disabled: css`
      color: gray.500;
      cursor: default;

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
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

export default Checkbox
