import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from 'src'

const Checkbox = props => {
  const { label, ...rest } = props

  return (
    <Wrapper {...rest}>
      <HiddenCheckbox {...props} />
      <StyledCheckbox {...props}>
        <Icon viewBox='0 0 24 24'>
          <polyline points={props.indeterminated ? '4 11 18 11 ' : '20 6 9 17 4 12'} />
        </Icon>
      </StyledCheckbox>
      {label && <Label {...rest}>{label}</Label>}
    </Wrapper>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string
}

export default Checkbox

const Wrapper = styled.div`
  display: flex;
`

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.colors.white};
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  cursor: ${props => (props.disabled ? '' : 'pointer')};
  width: 16px;
  height: 16px;
  background: ${props => (props.selected ? props.theme.colors.blue : props.theme.colors.white)};
  border: 1px solid ${props => (props.selected ? props.theme.colors.blue : props.theme.colors.mediumGrey)};
  border-radius: 2px;
  box-sizing: border-box;
  ${({ theme: { colors }, ...props }) => {
    if (props.disabled && props.selected) {
      return `
      background: rgba(37, 37, 37, 0.3);
      border: none;
      pointer-events: none`
    }
    if (props.selected) {
      return `
        background: ${colors.blue};
        border: none;`
    }
    if (props.disabled) {
      return `
        background: ${colors.grey};
        border: 1px solid rgba(37, 37, 37, 0.3);
        pointer-events: none`
    }
    if (props.indeterminated) {
      return `
        background: ${colors.darkGrey};
        border: 1px solid ${colors.darkGrey};`
    }
  }}

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${props => props.theme.colors.blue};
  }

  ${Icon} {
    visibility: ${props => (props.selected || props.indeterminated ? 'visible' : 'hidden')};
  }
`

const Label = styled(Typography)`
  margin: 0;
  margin-left: 10px;
  transition: all 0.3s linear;
  ${({ theme: { colors }, ...props }) => {
    if (props.disabled) {
      return 'color: rgba(37, 37, 37, 0.3)'
    }
    return `color: ${colors.DarkGrey}`
  }}
`
