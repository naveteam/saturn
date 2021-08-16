import React from 'react'
import styled, { css } from 'styled-components'
import { variant, compose, color, layout, space, border } from 'styled-system'
import PropTypes from 'prop-types'
import { Typography } from '../'
import { Icon } from '../Iconography'

const Tag = ({ children, close, ...props }) => (
  <Base {...props}>
    <Content>
      <Text padding={close ? '3px 0 3px 4px' : '3px 4px 3px 4px'} lineHeight={1}>
        {children}
      </Text>
      {close && <Icon icon='clear' color='white' height='16' />}
    </Content>
  </Base>
)

const baseProps = compose(color, layout, space, border)

const selectedVariant = ({ theme: { colors }, color }) =>
  variant({
    default: true,
    prop: 'selected',
    key: 'tag',
    variants: {
      true: {
        backgroundColor: colors[color],
        borderColor: colors[color],
        cursor: 'pointer',
        p: {
          color: 'white'
        }
      },
      false: {
        backgroundColor: 'transparent',
        borderColor: colors.gray['600'],
        cursor: 'pointer',
        p: {
          color: colors.gray['600']
        }
      },
      disabled: {
        backgroundColor: 'disabled',
        borderColor: 'disabled',
        cursor: 'default',
        p: {
          color: 'white'
        }
      }
    }
  })

const Base = styled.div(
  props => css`
    display: inline-block;
    border-radius: ${props.theme.space[1]}px;
    border-width: 1px;
    border-style: solid;
    ${border}
    ${baseProps}
  ${selectedVariant(props)}
  `
)

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled(Typography)(
  ({ theme: { fontWeights, lineHeights, fontSizes } }) => css`
    font-weight: ${fontWeights[1]};
    font-size: ${fontSizes[1]}px;
    line-height: ${lineHeights[1]};
  `
)

Tag.defaultProps = {
  selected: true,
  close: false,
  color: 'primary'
}

Tag.propTypes = {
  selected: PropTypes.oneOf([true, false, 'disabled']),
  close: PropTypes.bool,
  color: PropTypes.string
}

export default Tag
