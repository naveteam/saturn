import PropTypes from 'prop-types'
import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { borders, variant } from 'styled-system'

import { Flex, Box } from '../Grid'
import { Caption, Typography } from '../Typography'

const TextField = forwardRef(
  (
    {
      borderColor,
      customPrefix,
      customSuffix,
      label,
      message,
      prefix,
      suffix,
      placeholder,
      disabled,
      type,
      name,
      defaultValue,
      value,
      onChange,
      inputProps,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false)
    return (
      <Wrapper disabled={disabled} {...props}>
        <Label>{label}</Label>
        <Container focus={focus} borderColor={borderColor}>
          {prefix ? <Affix forwardedAs='span'>{prefix}</Affix> : customPrefix}
          <InputBase
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={disabled}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            {...inputProps}
          />

          {suffix ? <Affix forwardedAs='span'>{suffix}</Affix> : customSuffix}
        </Container>
        {message && <Message>{message}</Message>}
      </Wrapper>
    )
  }
)

TextField.propTypes = {
  borderColor: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  customPrefix: PropTypes.object,
  customSuffix: PropTypes.object,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  inputProps: PropTypes.object
}

TextField.defaultProps = {
  borderColor: 'black'
}

const errorVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'error',
    default: false,
    variants: {
      true: {
        p: {
          color: colors.error
        },
        div: {
          borderColor: colors.error,
          span: {
            color: colors.error
          }
        }
      },
      false: {}
    }
  })

const disabledVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'disabled',
    default: false,
    variants: {
      true: {
        '*': {
          color: `${colors.disabled} !important`
        },
        div: {
          borderColor: colors.gray['400'],
          backgroundColor: colors.gray['100'],
          span: {
            color: colors.gray['400']
          }
        }
      },
      false: {}
    }
  })

const focusVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'focus',
    variants: {
      true: {
        borderColor: colors.blue['50'],
        borderWidth: '2px',
        padding: 0
      }
    }
  })

const Wrapper = styled(Box)`
  ${errorVariant}
  ${disabledVariant}
`
const Label = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`
const Container = styled(Flex)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  align-items: center;
  padding: 1px;
  width: 100%;
  ${borders}
  ${focusVariant}
`
const Affix = styled(Typography)`
  font-size: 14px;
  line-height: 24px;
  margin: 0 8px;
  pointer-events: none;
`
const InputBase = styled.input`
  border: 0;
  flex: 1;
  font-size: 16px;
  line-height: 24px;
  background-color: transparent;
  padding: 6px;
  overflow: hidden;
  width: 100%;

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
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`

export default TextField
