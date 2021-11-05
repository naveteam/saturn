import React, { useRef, useState, forwardRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { variant } from 'styled-system'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'
import PropTypes from 'prop-types'

import { Flex, Box } from '../Grid'
import { Typography, Caption, Icon } from '..'

const Select = forwardRef(
  (
    {
      clearValue,
      onClear,
      name,
      label,
      options,
      optionLabel,
      optionValue,
      onChange,
      placeholder,
      caption,
      error,
      disabled,
      quiet,
      resetValue,
      ...props
    },
    ref
  ) => {
    const [isOpened, setIsOpened] = useState(false)
    const [optionSelected, setOptionSelected] = useState({})
    const containerRef = useRef(null)

    const handleChange = (option, shouldValidate = true) => {
      setOptionSelected(option)
      setIsOpened(false)
      onChange && onChange(option, shouldValidate)
    }

    const clearValueFunction = e => {
      e.stopPropagation()
      onClear && onClear()
      setOptionSelected({})
    }

    useEffect(() => {
      if (!resetValue && resetValue === optionSelected[optionValue]) {
        return
      }

      if (!resetValue) {
        return handleChange({}, false)
      }

      const selectedOption = options.find(option => option[optionValue] === resetValue)

      if (!selectedOption) {
        return
      }

      handleChange(selectedOption, false)
    }, [resetValue])

    useClickOutside(() => isOpened && setIsOpened(false), containerRef)
    useHotKey(() => isOpened && setIsOpened(false), 'Escape')

    return (
      <Wrapper disabled={disabled} error={error} isOpened={isOpened} quiet={quiet} {...props}>
        {!quiet && (
          <Typography mb={3} fontSize={2} lineHeight={1} fontWeight={1} color='gray.800'>
            {label}
          </Typography>
        )}
        <Container ref={containerRef} tabIndex='0'>
          <SelectContainer
            isOpened={isOpened}
            quiet={quiet}
            error={error}
            disabled={disabled}
            onClick={() => !disabled && setIsOpened(!isOpened)}
          >
            <OverflowText lineHeight={3} fontSize={3} color={!!optionSelected[optionValue] ? 'gray.900' : 'gray.500'}>
              {optionSelected[optionLabel] || placeholder}
            </OverflowText>

            <SelectBase name={name} ref={ref} defaultValue={optionSelected[optionValue]}>
              <option value='' disabled>
                {placeholder}
              </option>
              {options.map((option, index) => (
                <option key={index} value={option[optionValue]}>
                  {option[optionLabel]}
                </option>
              ))}
            </SelectBase>
            <Flex justifyContent='center' alignItems='center'>
              {clearValue && optionSelected[optionValue] && (
                <>
                  <Icon icon='clear' size='sm' color='gray.800' onClick={clearValueFunction} />
                  <Box bg='gray.500' width='1px' height='24px' margin='0 8px 0px 12px'></Box>
                </>
              )}
              <Icon icon={!disabled && isOpened ? 'ExpandLess' : 'ExpandMore'} color='gray.800' />
            </Flex>
          </SelectContainer>

          {isOpened && (
            <OptionsContainer>
              {options.map((option, index) => (
                <OptionContainer key={`${option.value}.${index}`} onClick={() => handleChange(option)}>
                  <Typography as='span' lineHeight={3} fontSize={3} color='gray.800'>
                    {option[optionLabel]}
                  </Typography>
                  {option[optionValue] === optionSelected[optionValue] && <Icon icon='Check' color='blue.100' />}
                </OptionContainer>
              ))}
            </OptionsContainer>
          )}
        </Container>
        {caption && <Message isOpened={isOpened}>{caption}</Message>}
      </Wrapper>
    )
  }
)

const errorVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'error',
    variants: {
      true: {
        p: {
          color: colors.error
        },
        'div div': {
          borderStyle: 'solid',
          borderColor: colors.error,
          div: {
            border: 0
          }
        }
      },
      false: {}
    }
  })

const disabledVariant = ({ quiet, theme: { colors } }) =>
  variant({
    prop: 'disabled',
    variants: {
      true: {
        p: {
          color: 'disabled'
        },
        div: {
          cursor: 'default',
          borderColor: colors.gray['400'],
          backgroundColor: quiet ? colors['white'] : colors['gray.100'],
          select: {
            color: 'disabled',
            backgroundColor: quiet ? colors['white'] : colors['gray.100']
          },
          path: {
            fill: colors.gray['400']
          }
        }
      },
      false: {}
    }
  })

const isOpenedVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'isOpened',
    variants: {
      true: {
        borderStyle: 'solid',
        borderColor: colors.blue['50'],
        borderWidth: '2px',
        padding: '6px'
      },
      false: {}
    }
  })

const Wrapper = styled(Box)(
  ({ bg, backgroundColor }) => css`
    position: relative;
    background-color: transparent;
    ${disabledVariant}
    ${errorVariant}
    ${SelectContainer} {
      background: ${bg || backgroundColor};
    }
  `
)

const Message = styled(Caption)(
  ({ isOpened, theme: { colors } }) => css`
    font-size: 12px;
    line-height: 1;
    margin-top: 4px;
    color: ${colors.gray['800']};
    visibility: ${isOpened ? 'hidden' : 'visible'};
  `
)

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
  position: absolute;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme: { colors } }) => colors['white']};
`

const Container = styled.div(
  ({ theme: { colors } }) =>
    css`
      outline: none;
      &:focus {
        ${OptionsContainer} {
          border-width: 0;
          border-radius: 4px;
          box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
          max-height: 184px;
          margin-top: 8px;
          display: flex;
          flex: 1;
          flex-direction: column;
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
        }
      }
    `
)

const SelectBase = styled.select`
  display: none;
`

const SelectContainer = styled(Flex)(
  ({ quiet, error, theme: { colors } }) => css`
    border-width: 1px;
    border-style: ${quiet ? 'none' : 'solid'};
    border-color: ${colors.gray['500']};
    border-radius: 2px;
    padding: ${quiet && !error ? '8px' : '7px'};
    justify-content: space-between;
    align-items: center;
    height: 40px;
    cursor: pointer;
  `,
  isOpenedVariant
)

const OverflowText = styled(Typography)(
  ({ theme: { colors } }) => css`
    overflow: hidden;
    white-space: nowrap;
    max-width: calc(100% - 24px);
    text-overflow: ellipsis;
    color: ${colors.gray['800']} !important;
  `
)

Select.defaultProps = {
  clearValue: true,
  error: false,
  disabled: false,
  quiet: false,
  label: 'Select',
  placeholder: 'Selecione uma opção',
  optionLabel: 'label',
  optionValue: 'value',
  options: []
}

Select.propTypes = {
  clearValue: PropTypes.bool,
  onClear: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  caption: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  quiet: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default Select
