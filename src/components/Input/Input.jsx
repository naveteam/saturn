import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { space, layout, flexbox, border, typography } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../'

const Input = forwardRef(
  ({ name, label, message, placeholder, value, onChange, prefix, suffix, error, disabled }, ref) => {
    return (
      <Container display='flex' flexDirection='column' alignItems='stretch' justifyContent='center' disabled={disabled}>
        {label && (
          <Label htmlFor={name} mb='3' fontSize={2} color={error ? 'error' : 'gray.800'} fontWeight={1} lineHeight={1}>
            {label}
          </Label>
        )}
        <Border
          borderRadius={4}
          borderColor={error ? 'error' : 'gray.600'}
          borderWidth='1px'
          borderStyle='solid'
          p='3'
          display='flex'
          error={error}
        >
          {prefix && <Typography mr={3}>{prefix}</Typography>}
          <InputBase
            ref={ref}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            border='none'
            fontSize={2}
            color='gray.900'
            backgroundColor='white'
            flex='1'
            disabled={disabled}
          />
          {suffix && (
            <Typography ml={3} color={error ? 'error' : 'gray.800'}>
              {suffix}
            </Typography>
          )}
        </Border>
        {message && (
          <Info mt='2' fontSize={1} lineHeight={1} color={error ? 'error' : 'gray.800'}>
            {message}
          </Info>
        )}
      </Container>
    )
  }
)

const Container = styled.div`
  ${layout}
  ${flexbox}
  ${({ disabled, theme }) =>
    disabled &&
    `
    border-color: ${theme.colors.gray[400]};
    ${Border} {
      background-color: ${theme.colors.gray[100]};
    }
    ${Label}, ${Info} {
      color: ${theme.colors.gray[500]}
    }
  `}
`

const Label = styled(Typography)`
  ${space}
`

const Border = styled.div`
  ${space}
  ${border}
  ${layout}
`

const InputBase = styled.input`
  ${space}
  ${border}
  ${typography}
  ${flexbox}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
    }
  }
`

const Info = styled(Typography)`
  ${space}
`

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

export default Input
