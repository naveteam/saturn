import React, { useState, useRef, forwardRef } from 'react'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'

import Calendar from './Calendar'
import { TextField, Flex, Icon } from '..'

const Datepicker = forwardRef(({ placeholder, label, message, disabled, name, value, onChange, ...props }, ref) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const calendarRef = useRef(null)

  useClickOutside(() => showCalendar && setShowCalendar(false), calendarRef)
  useHotKey(() => showCalendar && setShowCalendar(false), 'Escape')

  return (
    <Flex flexDirection='column'>
      <TextField
        label={label}
        placeholder={placeholder}
        message={message}
        disabled={disabled}
        name={name}
        customSuffix={<Icon icon='event' />}
        mb={4}
        value={inputValue}
        onChange={onChange}
        ref={ref}
        onClick={() => setShowCalendar(true)}
      />
      {showCalendar && (
        <Calendar
          onChange={value => {
            setInputValue(new Intl.DateTimeFormat('pt-BR').format(value))
            setShowCalendar(false)
          }}
          calendarRef={calendarRef}
        />
      )}
    </Flex>
  )
})

Datepicker.defaultProps = {
  label: 'Datepicker',
  placeholder: 'DD/MM/YYYY'
}

export default Datepicker
