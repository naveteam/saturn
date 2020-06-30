import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'

import { Flex, Box } from '../Grid'
import { Typography } from '../'

const Input = forwardRef(({ label, message, prefix, suffix, error, placeholder, width }, ref) => {
  const [focus, setFocus] = useState(false)
  return (
    <Wrapper error={error} width={width}>
      <Label>{label}</Label>
      <Container focus={focus}>
        {prefix && <Affix forwardedAs='span'>{prefix}</Affix>}
        <InputBase ref={ref} placeholder={placeholder} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        {suffix && <Affix forwardedAs='span'>{suffix}</Affix>}
      </Container>
      <Message>{message}</Message>
    </Wrapper>
  )
})

const errorVariant = variant({
  prop: 'error',
  default: false,
  variants: {
    true: css`
      p {
        color: red.400;
      }
      div {
        border-color: red.400;
        span {
          color: red.400;
        }
      }
    `
  }
})

const focusVariant = variant({
  prop: 'focus',
  default: false,
  variants: {
    true: css`
      border-color: blue.50;
      border-width: 2px;
      padding: 3px;
    `
  }
})

const Wrapper = styled(Box)`
  ${errorVariant}
`
const Label = styled(Typography)`
  font-size: 2;
  line-height: 1;
  font-weight: 1;
  margin-bottom: 2;
`
const Container = styled(Flex)`
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 2;
  padding: 2;
  align-items: center;
  ${focusVariant}
`
const Affix = styled(Typography)`
  font-size: 1;
  line-height: 1;
  margin: 0 2;
  pointer-events: none;
`
const InputBase = styled.input`
  border: 0;
  flex: 1;
  font-size: 3;
  line-height: 3;
  &::placeholder {
    color: gray.600;
  }
`
const Message = styled(Typography)`
  font-size: 1;
  line-height: 1;
  margin-top: 2;
`

export default Input
