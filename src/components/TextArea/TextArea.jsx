import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Flex, Box } from '../Grid'
import { Caption, Typography } from '..'

const TextArea = forwardRef(({ label, caption, placeholder, disabled, name, ...props }, ref) => {
  const [focus, setFocus] = useState(false)

  return (
    <Wrapper disabled={disabled} {...props}>
      <Label forwardedAs='label'>
        {label}
        <Container focus={focus}>
          <Input
            ref={ref}
            name={name}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={disabled}
            {...props}
          />
        </Container>
      </Label>
      <CaptionMessage>{caption}</CaptionMessage>
    </Wrapper>
  )
})

const errorVariant = variant({
  prop: 'error',
  default: false,
  variants: {
    true: css`
      label,
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
      p, label{
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
  ${errorVariant};
  ${disabledVariant};
`

const Label = styled(Typography)`
  display: block;
  font-size: 2;
  line-height: 1;
  font-weight: 1;
  color: gray.800;
`

const Container = styled(Flex)`
  border: 1px solid;
  border-color: gray.500;
  border-radius: 2;
  padding: 1px;
  margin: 3 0 2 0;
  min-height: 1;
  max-height: 90px;
  height: 100%;
  overflow-y: scroll;
  scrollbar-color: ${th.color('gray.500')};
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${th.color('gray.500')};
    border-radius: 8px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
  ${focusVariant}
`

const Input = styled.textarea`
  border: none;
  resize: none;
  font-size: 3;
  line-height: 3;
  padding: 3;
  background-color: transparent;
  font-family: 'Open Sans', sans-serif;
  height: calc(100% - 16px);
  width: 100%;
  color: gray.900;

  &::placeholder {
    color: gray.500;
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

const CaptionMessage = styled(Caption)`
  line-height: 1;
  font-size: 1;
  color: gray.800;
`

TextArea.defaultProps = {
  disabled: false
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  caption: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired
}

export default TextArea
