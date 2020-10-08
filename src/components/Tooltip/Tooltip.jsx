import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { space, layout, variant, th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Caption } from '../'
import Icon from '../Iconography'

const Tooltip = forwardRef(({ children, variant, direction, ...props }, ref) => {
  console.log('props', props, 'variant:', variant, 'direction:', direction)
  return (
    <Wrapper ref={ref} {...props}>
      {children}

      {props.small ? (
        <SmallTip variant={variant} direction={direction}>
          {props.icon && <Icon color='white' icon={props.icon} />}
          {<Caption variant='sm'>{props.content}</Caption>}
        </SmallTip>
      ) : (
        <Tip variant={variant} direction={direction}>
          {props.icon && <Icon color='white' icon={props.icon} />}
          <Caption>{props.content}</Caption>
        </Tip>
      )}
    </Wrapper>
  )
})

const directionVariants = variant({
  default: 'up',
  prop: 'direction',
  variants: {
    'upper-left': css`
      :before {
        left: calc(25% - 8px);
      }
    `,
    up: css`
      :before {
        left: calc(50% - 8px);
      }
    `,
    'upper-right': css`
      :before {
        left: calc(75% - 8px);
      }
    `,
    left: css`
      :before {
        top: calc(50% - 6px);
        left: -10px;
        transform: rotate(270deg);
      }
    `,
    right: css`
      :before {
        top: calc(50% - 6px);
        right: -10px;
        transform: rotate(90deg);
      }
    `,
    'lower-left': css`
      :before {
        top: calc(100%);
        left: calc(25% - 8px);
        transform: rotate(180deg);
      }
    `,
    down: css`
      :before {
        top: calc(100%);
        left: calc(50% - 8px);
        transform: rotate(180deg);
      }
    `,
    'lower-right': css`
      :before {
        top: calc(100%);
        left: calc(75% - 8px);
        transform: rotate(180deg);
      }
    `
  }
})

const Tip = styled.div`
  visibility: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 101;
  padding: 8px;
  min-height: 16px;
  max-height: 32px;
  max-width: 143px;
  border-radius: 4px;
  margin: 10px;
  background-color: ${({ variant }) => th.color(variant)};
  border-color: ${({ variant }) => th.color(variant)};
  color: white;

  :before {
    content: '';
    height: 0px;
    width: 0px;
    position: absolute;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid ${({ variant }) => th.color(variant)};
    top: -10px;
  }
  ${directionVariants}
`

const SmallTip = styled(Tip)`
  padding: 4px 8px;
`
const Wrapper = styled.div`
  position: relative;
  :hover {
    ${Tip} {
      visibility: visible;
    }
  }
`
Tooltip.defaultProps = {
  variant: 'neutral'
}

Tooltip.propTypes = {
  color: PropTypes.string,
  content: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'upper-left', 'upper-right', 'lower-left', 'lower-right']),
  variant: PropTypes.oneOf(['neutral', 'smaller', 'informative', 'success', 'warning', 'error', 'support'])
}

export default Tooltip
