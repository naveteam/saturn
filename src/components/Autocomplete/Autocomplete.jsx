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
  ...rest
}) => {
  const [textFieldValue, setTextFieldValue] = useState('')
  const [selectedValue, setSelectedValue] = useState()
  const [optionsOpened, setOptionsOpened] = useState(false)
  const textFieldRef = useRef()
  const optionsRoot = useMemo(() => document.body, [document.body])
  // const optionsRoot = useMemo(() => {
  //   return textFieldRef?.current?.offsetParent
  // }, [textFieldRef?.current])

  const containerRef = useRef()
  const filteredOptions = useMemo(() => {
    if (!textFieldValue) return options
    return options.filter(op => getOptionLabel(op)?.toLowerCase().includes(textFieldValue.toLowerCase()))
  }, [textFieldValue, options])
  // Tem algum problema em usar options [] nesse array de deps?

  useEffect(() => {
    onChangeText && onChangeText(textFieldValue)
  }, [textFieldValue])

  useClickOutside(() => {
    if (!selectedValue || !textFieldValue) {
      setOptionsOpened(false)
      setTextFieldValue('')
      return selectedValue
    }
    // Values com mesmo valor podem acarretar problemas, a solução para isso seria ter um id unico em cada opção e controlar a previamente selecionada por esse id
    const currentSelected = options.find(op => getOptionValue(op) === selectedValue)
    setTextFieldValue(getOptionLabel(currentSelected))
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
    console.log(textFieldRef?.current.getBoundingClientRect())
    const { top, height, left, width } = textFieldRef?.current.getBoundingClientRect()
    return { top: `${top + height + 2}px`, left: `${left}px`, width: `${width}px` }
  }, [textFieldRef?.current, optionsOpened])

  return (
    <Flex ref={containerRef} position='relative' flexDirection='column'>
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
          <Options
            positions={positions}
            options={filteredOptions}
            getOptionLabel={getOptionLabel}
            onPickOption={onPickOption}
            loading={loading}
          />,
          optionsRoot
        )}
    </Flex>
  )
}

const Options = ({ options = [], getOptionLabel, onPickOption, loading, positions }) => {
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
          <OptionContainer isSelectable key={getOptionLabel(option)} onClick={() => onPickOption(option)}>
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
  /* left: 0; */
  /* top: 100%; */
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
  ${({ isSelectable }) =>
    isSelectable
      ? css`
          cursor: pointer;
          &:hover {
            background-color: ${({ theme }) => theme.colors.orange['50']};
          }
        `
      : css`
          opacity: 0.5;
        `}
`

export default Autocomplete
