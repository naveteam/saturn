import React, { useState, forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { variant } from 'styled-system'
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

const errorVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'error',
    variants: {
      true: {
        'label, p': {
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
    variants: {
      true: {
        'p, label': {
          color: colors.disabled
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

const focusVariant = ({ theme: { colors, space } }) =>
  variant({
    prop: 'focus',
    variants: {
      true: {
        borderColor: colors.blue['50'],
        borderWidth: space[1],
        padding: space[0]
      },
      false: {}
    }
  })

const Wrapper = styled(Box)`
  ${errorVariant};
  ${disabledVariant};
`

const Label = styled(Typography)(
  ({ theme: { colors, fontWeights, fontSizes, lineHeights } }) => css`
    display: block;
    font-size: ${fontSizes[2]}px;
    line-height: ${lineHeights[1]};
    font-weight: ${fontWeights[1]};
    color: ${colors.gray['800']};
  `
)

const Container = styled(Flex)(
  ({ theme }) => css`
    border: 1px solid;
    border-color: ${theme.colors.gray['500']};
    border-radius: 4px;
    padding: 1px;
    margin: ${theme.space[3]}px ${theme.space[0]}px ${theme.space[2]}px ${theme.space[0]}px;
    min-height: 2px;
    max-height: 90px;
    height: 100%;
    ${focusVariant}
  `
)

const Input = styled.textarea(
  ({ theme: { colors, fontSizes, lineHeights, space } }) => css`
    border: none;
    resize: none;
    font-size: ${fontSizes[3]}px;
    line-height: ${lineHeights[3]};
    padding: ${space[3]}px;
    background-color: transparent;
    font-family: 'Open Sans', sans-serif;
    height: calc(100% - 16px);
    width: 100%;
    color: ${colors.gray['900']};
    overflow-y: scroll;

    scrollbar-color: ${colors.gray['500']};

    scrollbar-width: thin;
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.gray['500']};
      border-radius: 8px;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
    }

    &::placeholder {
      color: ${colors.gray['500']};
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      ::placeholder {
        color: ${colors.disabled};
      }
    }
  `
)

const CaptionMessage = styled(Caption)(
  ({ theme: { colors, lineHeights, fontSizes } }) => css`
    line-height: ${lineHeights[1]};
    font-size: ${fontSizes[1]}px;
    color: ${colors.gray['800']};
  `
)

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
