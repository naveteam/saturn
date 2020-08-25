import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'

import { Icon } from '../Iconography'
import { Flex, Box } from '../Grid'
import { Caption, Typography } from '..'

const TextField = forwardRef(
  ({ label, message, prefix, suffix, placeholder, disabled, type, name, password, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    const [inputType, setInputType] = useState(type)

    return (
      <Wrapper disabled={disabled} {...props}>
        <Label>{label}</Label>
        <Container focus={focus}>
          {prefix && <Affix forwardedAs='span'>{prefix}</Affix>}
          <InputBase
            ref={ref}
            type={inputType}
            name={name}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={disabled}
          />
          {password && (
            <Icon
              onMouseOver={() => setInputType('text')}
              onMouseOut={() => setInputType('password')}
              icon='visibility'
              pr={3}
            />
          )}
          {suffix && <Affix forwardedAs='span'>{suffix}</Affix>}
        </Container>
        <Message>{message}</Message>
      </Wrapper>
    )
  }
)

const errorVariant = variant({
  prop: 'error',
  default: false,
  variants: {
    true: css`
      p {
        color: error;
      }
      div {
        border-color: error;
        span {
          color: error;
        }
      }
    `,
    false: css``
  }
})

const disabledVariant = variant({
  prop: 'disabled',
  default: false,
  variants: {
    true: css`
      p {
        color: disabled;
      }
      div {
        border-color: gray.400;
        background-color: gray.100;
        span {
          color: gray.400;
        }
      }
    `,
    false: css``
  }
})

const focusVariant = variant({
  prop: 'focus',
  default: false,
  variants: {
    true: css`
      border-color: blue.50;
      border-width: 2px;
      padding: 0;
    `,
    false: css``
  }
})

const Wrapper = styled(Box)`
  ${errorVariant}
  ${disabledVariant}
`
const Label = styled(Typography)`
  font-size: 2;
  line-height: 1;
  font-weight: 1;
  margin-bottom: 3;
`
const Container = styled(Flex)`
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 2;
  align-items: center;
  padding: 1px;
  ${focusVariant}
`
const Affix = styled(Typography)`
  font-size: 1;
  line-height: 1;
  margin: 0 3;
  pointer-events: none;
`
const InputBase = styled.input`
  border: 0;
  flex: 1;
  font-size: 3;
  line-height: 3;
  background-color: transparent;
  padding: 6px;
  &::placeholder {
    color: gray.600;
  }
  &:focus {
    outline: none;
  }

  &:disabled {
    ::placeholder {
      color: disabled;
    }
  }
`
const Message = styled(Caption)`
  font-size: 1;
  line-height: 1;
  margin-top: 2;
`

export default TextField
