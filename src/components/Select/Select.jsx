import React, { useRef, useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'

import { Flex, Box } from '../Grid'
import { Typography, Caption } from '..'
import { Icon } from '..'

const Select = forwardRef(
  ({ label, options, optionLabel, optionValue, caption, error, disabled, quiet, ...props }, ref) => {
    const [isOpened, setIsOpened] = useState(false)
    const [optionSelected, setOptionSelected] = useState()
    const containerRef = useRef(null)

    const handleChange = option => {
      setOptionSelected(option)
      setIsOpened(false)
    }

    useClickOutside(() => isOpened && setIsOpened(false), containerRef)
    useHotKey(() => isOpened && setIsOpened(false), 'Escape')

    return (
      <Wrapper disabled={disabled} error={error} isOpened={isOpened} quiet={quiet} {...props}>
        {!quiet && <Label>{label}</Label>}
        <Container ref={containerRef} tabIndex='0'>
          <SelectContainer
            className='selectContainer'
            isOpened={isOpened}
            quiet={quiet}
            error={error}
            disabled={disabled}
            onClick={() => !disabled && setIsOpened(!isOpened)}
          >
            <SelectBase value={optionSelected} onChange={handleChange} ref={ref}>
              {disabled ? (
                <option value=''>{optionLabel}</option>
              ) : (
                options.map(option => (
                  <option key={option[optionLabel]} value={option[optionValue]}>
                    {optionSelected || optionLabel}
                  </option>
                ))
              )}
            </SelectBase>
            <Icon icon={!disabled && isOpened ? 'ExpandLess' : 'ExpandMore'} color='gray.800' />
          </SelectContainer>

          {isOpened && (
            <OptionsContainer>
              {options.map(option => (
                <div key={option[optionValue]} onClick={() => handleChange(option[optionValue])}>
                  <OptionContainer>
                    <OptionLabel>{option[optionLabel]}</OptionLabel>
                    {option[optionValue] === optionSelected && <Icon icon='Check' color='blue.100' />}
                  </OptionContainer>
                </div>
              ))}
            </OptionsContainer>
          )}
        </Container>
        {!isOpened && caption && <Message>{caption}</Message>}
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
        background-color: ${({ quiet }) => (quiet ? th('white') : th.color('gray.100'))};
        select {
          color: disabled;
          background-color: ${({ quiet }) => (quiet ? th('white') : th.color('gray.100'))};
        }
        path {
          fill: gray.400;
        }
      }
    `,
    false: css``
  }
})

const isOpenedVariant = variant({
  prop: 'isOpened',
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
const Message = styled(Caption)`
  font-size: 1;
  line-height: 1;
  margin-top: 2;
  color: gray.800;
`
const OptionLabel = styled.option`
  color: gray.800;
  font-family: 'Open Sans';
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
  background: white;
  color: ${({ value }) => (value ? th('colors.gray.900') : th('colors.gray.600'))};
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
  ${isOpenedVariant}
`

export default Select
