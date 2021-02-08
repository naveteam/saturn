import React, { useState, useEffect } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant, compose, color, layout, space, border } from '@xstyled/system'
import PropTypes from 'prop-types'
import { Typography } from '../'
import { Icon } from '../Iconography'

const Tag = ({ children, close, variant, selected, ...props }) => {
  const [tagVariant, setTagVariant] = useState('selected')

  useEffect(() => {
    if (variant) {
      return setTagVariant(variant)
    }

    if (selected === 'disabled') {
      return setTagVariant('disabled')
    }

    if (selected === false || selected === 'unselected') {
      return setTagVariant('unselected')
    }

    return setTagVariant('selected')
  }, [variant, selected])

  return (
    <Base selected={tagVariant} {...props}>
      <Content>
        <Text padding={close ? '3px 0 3px 4px' : '3px 4px 3px 4px'} lineHeight={1}>
          {children}
        </Text>
        {close && <Icon icon='clear' color='white' height='16' />}
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
      p {
        color: white;
      }
    `
  }
})

const Base = styled.div`
  display: inline-block;
  border-radius: 1;
  border-width: 1px;
  border-style: solid;
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
  variant: PropTypes.oneOf(['selected', 'unselected', 'disabled']),
  close: PropTypes.bool,
  color: PropTypes.string,
  colorScheme: PropTypes.oneOf(['primary', 'secondary'])
}

export default Tag
