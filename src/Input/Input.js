import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from '../'
import modifiers from '../helpers/modifiers'

const Input = props => {
  const { label, ...rest } = props

  return (
    <Wrapper {...rest}>
      {label && <Label {...rest}>{label}</Label>}
      <InputContainer {...rest}>
        {rest.leftIcon && rest.leftIcon}
        <StyledInput disabled={rest.disabled} {...rest} />
        {rest.rightIcon && rest.rightIcon}
      </InputContainer>
      {rest.error && <Error>{rest.error}</Error>}
      {!rest.error && rest.caption && <Caption>{rest.caption}</Caption>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${props => modifiers(props)}
  ${({ theme: { colors }, disabled, error, verified }) => {
    if (disabled || error || verified) {
      return ''
    }
    return `
      &:focus-within {
        div {
          border: 1px solid ${colors.blue};
        }
        p:first-child {
          color: ${colors.blue};
        }
      }
    `
  }}
`

const InputContainer = styled.div`
  box-sizing: border-box;
  border-radius: 4px;
  transition: all 0.3s linear;
  display: flex;
  align-items: center;
  width: 328px;
  height: 36px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  ${({ theme: { colors }, ...props }) => {
    if (props.disabled) {
      return `
        border: 1px solid rgba(37, 37, 37, 0.3);
        background: ${colors.grey};`
    }
    if (props.error) {
      return `border: 1px solid ${colors.red};`
    }
    if (props.verified) {
      return `border: 1px solid ${colors.green};`
    }
  }}
`

const Label = styled(Typography)`
  margin: 0;
  margin-bottom: 5px;
  transition: all 0.3s linear;
  ${({ theme: { colors }, ...props }) => {
    if (props.disabled) {
      return `color: ${colors.mediumGrey};`
    }
    if (props.error) {
      return `color: ${colors.red};`
    }
  }}
`

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  border: none;
  outline: none;
  flex: 1;
  height: 100%;
  background: transparent;
  padding-left: ${props => (props.leftIcon ? '4px' : 0)};
  padding-right: ${props => (props.rightIcon ? '4px' : 0)};
  color: ${props => props.theme.colors.darkGrey};
  ::placeholder {
    color: rgba(37, 37, 37, 0.3);
  }
`

const Error = styled(Typography)`
  margin: 0;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
`

const Caption = styled(Typography)`
  margin: 0;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.mediumGrey};
  font-size: 12px;
`

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  caption: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  verified: PropTypes.bool
}

export default Input
