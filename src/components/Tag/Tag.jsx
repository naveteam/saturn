import React, { useMemo, useCallback } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant, compose, color, layout, space, border } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography, Icon } from '../'

const Tag = ({ children, close, closable, variant, selected, disabled, value, onChange, onClose, type, ...props }) => {
  const tagVariant = useMemo(() => {
    if (disabled || selected === 'disabled' || variant === 'disabled') {
      return 'disabled'
    }

    if (type === 'selectable') {
      if (value) {
        return 'selected'
      } else {
        return 'unselected'
      }
    }

    if (variant) {
      return variant
    }

    if (selected === false || selected === 'unselected') {
      return 'unselected'
    }

    return 'selected'
  }, [variant, selected, type, disabled, value])

  const handleClick = useCallback(() => {
    if (disabled) {
      return
    }

    if ((closable || close) && onClose) {
      return onClose()
    }

    if (type === 'selectable' && onChange) {
      return onChange()
    }
  }, [type, closable, close, onClose, onChange])

  return (
    <Base selected={tagVariant} onClick={handleClick} {...props}>
      <Content>
        <Text padding={close || closable ? '3px 0 3px 4px' : '3px 4px 3px 4px'} lineHeight={1}>
          {children}
        </Text>
        {(close || closable) && <Icon icon='clear' color='white' height='16' />}
      </Content>
    </Base>
  )
}

const baseProps = compose(color, layout, space, border)

const selectedVariant = variant({
  default: true,
  prop: 'selected',
  key: 'tag',
  variants: {
    selected: css`
      background-color: ${({ color, colorScheme }) => th.color(colorScheme || color || 'primary')};
      border-color: ${({ color, colorScheme }) => th.color(colorScheme || color || 'primary')};
      p {
        color: white;
      }
    `,
    unselected: css`
      background-color: transparent;
      border-color: gray.600;
      p {
        color: gray.600;
      }
    `,
    disabled: css`
      background-color: disabled;
      border-color: disabled;
      cursor: not-allowed;
      p {
        color: white;
      }
    `
  }
})

const Base = styled.button`
  display: inline-block;
  border-radius: 1;
  border-width: 1px;
  border-style: solid;
  outline: none;
  cursor: pointer;
  ${baseProps};
  ${selectedVariant};
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled(Typography)`
  font-weight: 1;
  font-size: 1;
  line-height: 1;
`

Tag.defaultProps = {
  close: false
}

Tag.propTypes = {
  close: PropTypes.bool,
  color: PropTypes.string,
  colorScheme: PropTypes.string,
  type: PropTypes.oneOf(['info', 'selectable']),
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func
}

export default Tag
