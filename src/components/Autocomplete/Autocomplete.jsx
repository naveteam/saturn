import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from '@xstyled/styled-components'
import { th, positioning, layout } from '@xstyled/system'

import { Flex } from '../Grid'
import TextField from '../TextField'
import { Typography } from '../Typography'

import { useClickOutside } from '@naveteam/prometheus'

const Autocomplete = ({
  label,
  loading,
  options = [
    { label: 'TESTE', value: 1 },
    { label: 'teste2', value: 3 },
    { label: 'vacaria', value: 5 }
  ],
  onChange,
  onChangeText,
  getOptionValue = op => op.value,
  getOptionLabel = op => op.label,
  minChar = 0,
  ...rest
}) => {
  const [textFieldValue, setTextFieldValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)
  const [optionsOpened, setOptionsOpened] = useState(false)

  const textFieldRef = useRef()
  const optionsRef = useRef()
  const containerRef = useRef()

  const optionsRoot = useMemo(() => document.body, [document.body])

  const filteredOptions = useMemo(() => {
    if (!textFieldValue) return options
    return options.filter(op => getOptionLabel(op)?.toLowerCase().includes(textFieldValue.toLowerCase()))
  }, [textFieldValue, options])
  // Tem algum problema em usar options [] nesse array de deps?

  useEffect(() => {
    onChangeText && onChangeText(textFieldValue)
  }, [textFieldValue])

  useClickOutside(
    () => {
      if (!selectedValue || !textFieldValue) {
        setOptionsOpened(false)
        setSelectedValue(null)
        setTextFieldValue('')
        return selectedValue
      }
      // Values com mesmo valor podem acarretar problemas, a solução para isso seria ter um id unico em cada opção e controlar a previamente selecionada por esse id
      const currentSelected = options.find(op => getOptionValue(op) === selectedValue)
      setTextFieldValue(getOptionLabel(currentSelected))
      setOptionsOpened(false)
    },
    optionsRef,
    containerRef
  )

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
      const value = getOptionValue(option)
      const label = getOptionLabel(option)
      setTextFieldValue(label)
      setSelectedValue(value)
      onChange && onChange(value)
      handleCloseOptions()
    },
    [onChange, getOptionLabel, getOptionValue]
  )

  const positions = useMemo(() => {
    if (!textFieldRef?.current || !optionsOpened) {
      return {}
    }
    const bodyRect = document.body.getBoundingClientRect()
    const { top, height, left, width } = textFieldRef?.current.getBoundingClientRect()
    return { top: `${top - bodyRect.top + height + 2}px`, left: `${left}px`, width: `${width}px` }
  }, [textFieldRef?.current, optionsOpened])

  return (
    <Flex ref={containerRef} flexDirection='column'>
      <TextField
        ref={textFieldRef}
        onFocus={handleOpenOptions}
        onChange={handleTextField}
        value={textFieldValue}
        label={label}
        {...rest}
      />
      {optionsOpened &&
        containerRef?.current &&
        ReactDOM.createPortal(
          <div ref={optionsRef}>
            <Options
              textFieldValue={textFieldValue}
              minChar={minChar}
              positions={positions}
              options={filteredOptions}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              onPickOption={onPickOption}
              loading={loading}
              selectedValue={selectedValue}
            />
          </div>,
          optionsRoot
        )}
    </Flex>
  )
}

const Options = ({
  options = [],
  textFieldValue,
  getOptionLabel,
  getOptionValue,
  onPickOption,
  loading,
  positions,
  selectedValue,
  minChar
}) => {
  if (textFieldValue.length < minChar) {
    return (
      <Container {...positions}>
        <OptionContainer>
          <Typography fontStyle='italic' as='span'>
            Digite mais informações para realizar a busca
          </Typography>
        </OptionContainer>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container {...positions}>
        <OptionContainer>
          <Typography fontStyle='italic' as='span'>
            Carregando...
          </Typography>
        </OptionContainer>
      </Container>
    )
  }

  return (
    <Container {...positions}>
      {options.length ? (
        options.map(option => (
          <OptionContainer
            isSelectable
            selected={selectedValue === getOptionValue(option)}
            key={getOptionLabel(option)}
            onClick={() => onPickOption(option)}
          >
            <Typography as='span'>{getOptionLabel(option)}</Typography>
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
  width: 100%;
  max-height: 11.5rem;
  overflow-y: auto;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  list-style-type: none;
  z-index: 2;

  ${layout}
  ${positioning}
`

const OptionContainer = styled.li`
  padding: 0.5rem;
  ${({ isSelectable, theme, selected }) =>
    isSelectable
      ? css`
          cursor: pointer;
          background-color: ${selected ? theme.colors.gray['100'] : 'transparent'};
          &:hover {
            background-color: ${theme.colors.gray['200']};
          }
        `
      : css`
          opacity: 0.5;
        `}
`

export default Autocomplete
