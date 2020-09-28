import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { space, layout, variant, th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Caption } from '../'
import Icon from '../Iconography'

const Tooltip = forwardRef(({ children, tooltip, variant, ...props }, ref) => (
  <Wrapper direction={props.direction} ref={ref} {...props}>
    {children}

    {props.small ? (
      <SmallTip variant={variant}>
        {props.icon && <Icon color='white' icon={props.icon} />}
        {<Caption variant='sm'>{props.content}</Caption>}
      </SmallTip>
    ) : (
      <Tip variant={variant}>
        {props.icon && <Icon color='white' icon={props.icon} />}
        <Caption>{props.content}</Caption>
      </Tip>
    )}
  </Wrapper>
))

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
    left: calc(50% - 8px);
    height: 0px;
    width: 0px;
    position: absolute;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid ${({ variant }) => th.color(variant)};
    top: -10px;
  }
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
  variant: PropTypes.oneOf(['neutral', 'semantic', 'smaller'])
}

export default Tooltip
