import React, { useState, useCallback, useMemo, useRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'

import { Flex } from '../Grid'
import TextField from '../TextField'
import { Typography } from '../Typography'
import { useClickOutside } from '@naveteam/prometheus'

const Autocomplete = ({
  onChange,
  label,
  optionValue = 'value',
  optionLabel = 'label',
  options = [
    { label: 'TESTE', value: 1 },
    { label: 'teste2', value: 3 },
    { label: 'vacaria', value: 5 }
  ]
}) => {
  const [textFieldValue, setTextFieldValue] = useState('')
  const [selectedValue, setSelectedValue] = useState()
  const [optionsOpened, setOptionsOpened] = useState(false)

  const containerRef = useRef()

  const filteredOptions = useMemo(() => {
    if (!textFieldValue) return options
    return options.filter(op => op[optionLabel].toLowerCase().includes(textFieldValue.toLowerCase()))
  }, [textFieldValue, options])
  // Tem algum problema em usar options [] nesse array de deps?

  useClickOutside(() => {
    if (!selectedValue) return setTextFieldValue('')
    // Values com mesmo valor podem acarretar problemas, a solução para isso seria ter um id unico em cada opção e controlar a previamente selecionada por esse id
    const currentSelected = options.find(op => op[optionValue] === selectedValue)
    setTextFieldValue(currentSelected[optionLabel])
    setOptionsOpened(false)
  }, containerRef)

  const handleOpenOptions = useCallback(() => {
    setOptionsOpened(true)
  }, [])

  const handleCloseOptions = useCallback(() => {
    setOptionsOpened(false)
  }, [])

  const handleTextField = useCallback(e => {
    setTextFieldValue(e.target.value)
  }, [])

  const onPickOption = useCallback(
    option => {
      const value = option[optionValue]
      const label = option[optionLabel]
      setTextFieldValue(label)
      setSelectedValue(value)
      onChange && onChange(value)
      handleCloseOptions()
    },
    [onChange, optionValue, optionLabel]
  )

  return (
    <Flex ref={containerRef} position='relative' flexDirection='column'>
      <TextField onFocus={handleOpenOptions} onChange={handleTextField} value={textFieldValue} label={label} />
      {optionsOpened && <Options options={filteredOptions} optionLabel={optionLabel} onPickOption={onPickOption} />}
    </Flex>
  )
}

const Options = ({ options = [], optionLabel, onPickOption }) => {
  return (
    <Container>
      {options.length ? (
        options.map(option => (
          <OptionContainer isSelectable key={option[optionLabel]} onClick={() => onPickOption(option)}>
            <Typography as='span'>{option[optionLabel]}</Typography>
          </OptionContainer>
        ))
      ) : (
        <OptionContainer>
          <Typography fontStyle='italic' as='span'>
            Nenhuma opção encontrada
          </Typography>
        </OptionContainer>
      )}
    </Container>
  )
}

const Container = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  background-color: ${th.color('white')};
  left: 0;
  top: 100%;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  list-style-type: none;
`

const OptionContainer = styled.li`
  ${({ isSelectable }) =>
    isSelectable
      ? css`
          cursor: pointer;
          &:hover {
            background-color: ${({ theme }) => theme.colors.orange['50']};
          }
        `
      : css`
          text-align: center;
          opacity: 0.5;
        `}
`

export default Autocomplete
