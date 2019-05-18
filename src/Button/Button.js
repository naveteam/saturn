import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const defaultStyles = `
  border: 0;
  outline: none;
  height: 32px;
  font-weight: 500;
  transition: all .3s ease-in-out;
  width: 140px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
`

const Button = props => {
  const { variant, ...rest } = props
  if (variant === 'primary') {
    return <PrimaryButton {...rest} />
  }

  if (variant === 'secondary') {
    return <SecondaryButton {...rest} />
  }

  if (variant === 'ghost') {
    return <GhostButton {...rest} />
  }
  return <PrimaryButton {...rest} />
}

const PrimaryButton = styled.button`
  ${({ theme, aditionalStyles }) => {
    return `
      ${defaultStyles}
      background-color: ${theme.colors.blue};
      color: ${theme.colors.white};
      &:hover {
        background-color: ${theme.colors.darkBlue};
      }
      &:focus {
        box-shadow: 0 0 4px 4px rgba(0, 125, 254, 0.3);
      }
      &:disabled {
        background-color: ${theme.colors.grey};
        color: rgba(0, 0, 0, 0.3);
        &:hover {
          cursor: not-allowed;
        }
      }
      ${aditionalStyles ? aditionalStyles : ''}
    `
  }};
`

const SecondaryButton = styled.button`
  ${({ theme, aditionalStyles }) => {
    return `
      ${defaultStyles}
      background-color: ${theme.colors.white};
      color: ${theme.colors.blue};
      border: 1px solid ${theme.colors.blue};
      &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.blue};
      }
      &:focus {
        box-shadow: 0 0 4px 4px rgba(0, 125, 254, 0.3);
      }
      &:disabled {
        background-color: ${theme.colors.white};
        color: rgba(0, 0, 0, 0.3);
        border: 1px solid ${theme.colors.grey};
        &:hover {
          cursor: not-allowed;
        }
      }
      ${aditionalStyles ? aditionalStyles : ''}
    `
  }};
`

const GhostButton = styled.button`
  ${({ theme, aditionalStyles }) => {
    return `
      ${defaultStyles}
      background-color: ${theme.colors.white};
      color: ${theme.colors.blue};
      &:hover {
        background-color: ${theme.colors.grey};
      }
      &:focus {
        box-shadow: 0 0 4px 4px rgba(0, 125, 254, 0.3);
        :hover {
          background-color: ${theme.colors.white};
        }
      }
      &:disabled {
        background-color: ${theme.colors.white};
        color: rgba(0, 0, 0, 0.3);
        &:hover {
          cursor: not-allowed;
        }
      }
      ${aditionalStyles ? aditionalStyles : ''}
    `
  }};
`

Button.propTypes = {
  variant: PropTypes.string,
  aditionalStyles: PropTypes.string
}

export default Button
