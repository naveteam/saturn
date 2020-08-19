import React, { useRef, useState, useEffect, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'

import { Flex, Box } from '../Grid'
import { Typography, Caption } from '..'
import { ExpandMore, ExpandLess, Check } from '../../icons'

const Select = forwardRef(
  ({ label, options, optionLabel, optionValue, caption, error, disabled, quiet, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    const [filled, setFilled] = useState(false)
    const [optionSelected, setOptionSelected] = useState()
    const containerRef = useRef(null)

    const handleChange = option => {
      setOptionSelected(option)
      setFilled(true)
      setFocus(false)
    }

    const outsideAlerter = ref => {
      useEffect(() => {
        const handleClickOutside = event => {
          ref.current && !ref.current.contains(event.target) && setFocus(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [ref])
    }

    outsideAlerter(containerRef)

    return (
      <Wrapper ref={containerRef} disabled={disabled} error={error} focus={focus} quiet={quiet} {...props}>
        {!quiet && <Label>{label}</Label>}
        <Container tabIndex='0'>
          <SelectContainer
            className='selectContainer'
            focus={focus}
            quiet={quiet}
            error={error}
            disabled={disabled}
            onClick={() => !disabled && setFocus(!focus)}
          >
            <SelectBase tabIndex='-1' value={optionSelected} onChange={handleChange} filled={filled} ref={ref}>
              {disabled ? (
                <option value=''>{optionLabel}</option>
              ) : (
                options.map(option => (
                  <option key={option} value={option[optionValue]}>
                    {optionSelected || optionLabel}
                  </option>
                ))
              )}
            </SelectBase>
            {!disabled && focus ? <ExpandLess /> : <ExpandMore />}
          </SelectContainer>

          {focus && (
            <OptionsContainer>
              {options.map(option => (
                <div key={option} onClick={() => handleChange(option[optionValue])}>
                  <OptionContainer>
                    <OptionLabel>{option[optionLabel]}</OptionLabel>
                    {option[optionValue] === optionSelected && <IconCheck />}
                  </OptionContainer>
                </div>
              ))}
            </OptionsContainer>
          )}
        </Container>
        {!focus && <Message>{caption}</Message>}
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
      .selectContainer {
        border-style: solid;
        border-color: error;
        select {
          color: gray.900;
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
        cursor: default;
        border-color: gray.400;
        background-color: ${({ quiet }) => (quiet ? '#fff' : '#F5F5F5')};
        select {
          color: gray.400;
          background-color: ${({ quiet }) => (quiet ? '#fff' : '#F5F5F5')};
        }
        path {
          fill: gray.400;
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
      border-style: solid;
      border-color: blue.50;
      border-width: 2px;
      padding: 6px;
    `,
    false: css``
  }
})

const Wrapper = styled(Box)`
  ${disabledVariant}
  ${errorVariant}
`
const Label = styled(Typography)`
  font-size: 2;
  line-height: 1;
  font-weight: 1;
  margin-bottom: 3;
  color: gray.800;
`
const IconCheck = styled(Check)`
  padding: 0;
  fill: blue.100;
`
const Message = styled(Caption)`
  font-size: 1;
  line-height: 1;
  margin-top: 2;
  color: gray.800;
`
const OptionLabel = styled.option`
  color: gray.800;
  font-size: 3;
  line-height: 3;
`
const OptionContainer = styled(Flex)`
  flex: 1;
  justify-content: space-between;
  padding: 5px 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(78, 152, 237, 0.1);
  }
`
const OptionsContainer = styled.div`
  display: none;
`
const Container = styled.div`
  outline: none;
  &:focus {
    ${OptionsContainer} {
      border-width: 0;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
      max-height: 184px;
      margin-top: 8px;
      padding: 4px 0;
      padding-top: 4px;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow-y: scroll;
    }
  }
`

const SelectBase = styled.select`
  pointer-events: none;
  border: 0;
  font-size: 3;
  line-height: 3;
  color: ${({ filled }) => (filled ? '#212121' : '#757575')};
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
`
const SelectContainer = styled(Flex)`
  border-width: 1px;
  border-style: ${({ quiet }) => (quiet ? 'none' : 'solid')};
  border-color: black;
  border-radius: 2;
  padding: ${({ quiet, error }) => (quiet && !error ? '8px' : '7px')};
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${focusVariant}
`

export default Select
