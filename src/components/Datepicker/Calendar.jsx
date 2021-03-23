import React, { useState, useEffect } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'

import { Flex, Icon, Typography } from '..'

import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  getPreviousMonth,
  getNextMonth,
  getMonthName,
  getCalendarDays,
  isSameDay,
  getCalendarMonths,
  isSameMonth
} from '../../utils'

const Calendar = ({ month, year, value, onChange, calendarRef, ...props }) => {
  const [calendarValue, setCalendarValue] = useState(value)
  const [showMonths, setShowMonths] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(CURRENT_MONTH)
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR)
  const [monthName, setMonthName] = useState(getMonthName(CURRENT_MONTH))
  const [calendarDays, setCalendarDays] = useState([])
  const [calendarMonths, setCalendarMonths] = useState([])

  useEffect(() => {
    const yearMonths = getCalendarMonths(currentYear)
    const monthDays = getCalendarDays(currentMonth, currentYear).map(date => new Date(date.join('-')))

    setCalendarMonths(yearMonths)
    setCalendarDays(monthDays)
  }, [currentYear, currentMonth])

  const handleNext = () => {
    if (showMonths) {
      setCurrentYear(currentYear + 1)
      return
    }

    const { month: nextMonth, year: nextMonthYear } = getNextMonth(currentMonth, currentYear)
    setCurrentMonth(nextMonth)
    setCurrentYear(nextMonthYear)
    setMonthName(getMonthName(nextMonth))
  }

  const handlePrevious = () => {
    if (showMonths) {
      setCurrentYear(currentYear - 1)
      return
    }

    const { month: previousMonth, year: previousMonthYear } = getPreviousMonth(currentMonth, currentYear)
    setCurrentMonth(previousMonth)
    setCurrentYear(previousMonthYear)
    setMonthName(getMonthName(previousMonth))
  }

  const handleMonthClick = calendarMonth => {
    const selectedMonth = calendarMonth.getMonth() + 1
    const selectedMonthYear = calendarMonth.getFullYear()

    setCurrentMonth(selectedMonth)
    setMonthName(getMonthName(selectedMonth))
    setCurrentYear(selectedMonthYear)
    setShowMonths(false)
  }

  const handleDateSelection = date => {
    setCalendarValue(date)
    onChange(date)
  }

  return (
    <CalendarWrapper alignItems='center' flexDirection='column' ref={calendarRef} {...props}>
      <Flex alignItems='center' justifyContent='space-between' width='100%' mb={4}>
        <GhostButton onClick={handlePrevious}>
          <Icon icon='arrow_back_ios' size='sm' />
        </GhostButton>
        <GhostButton onClick={() => setShowMonths(!showMonths)}>
          <Typography color='primary' fontWeight={1} fontSize={2}>
            {showMonths ? currentYear : `${monthName} de ${currentYear}`}
          </Typography>
          <Icon icon={showMonths ? 'arrow_drop_up' : 'arrow_drop_down'} size='md' />
        </GhostButton>
        <GhostButton onClick={handleNext}>
          <Icon icon='arrow_forward_ios' size='sm' />
        </GhostButton>
      </Flex>

      {showMonths ? (
        <MonthsContainer>
          {calendarMonths?.map((calendarMonth, index) => {
            return (
              <CalendarButton
                key={index}
                isToday={isSameMonth(calendarMonth, new Date())}
                onClick={() => handleMonthClick(calendarMonth)}
                isMonthButton={true}
              >
                <Typography fontSize={3} color={calendarMonth.getFullYear() === currentYear ? 'gray.800' : 'gray.500'}>
                  {getMonthName(calendarMonth.getMonth() + 1)}
                </Typography>
              </CalendarButton>
            )
          })}
        </MonthsContainer>
      ) : (
        <DaysContainer>
          {calendarDays?.map((day, index) => {
            return (
              <CalendarButton
                key={index}
                isToday={isSameDay(day, new Date())}
                isSelected={isSameDay(calendarValue, day)}
                onClick={() => handleDateSelection(day)}
              >
                <Typography
                  fontSize={3}
                  color={
                    isSameDay(calendarValue, day)
                      ? 'white'
                      : day.getMonth() + 1 === currentMonth
                      ? 'gray.800'
                      : 'gray.500'
                  }
                >
                  {day.getDate()}
                </Typography>
              </CalendarButton>
            )
          })}
        </DaysContainer>
      )}
    </CalendarWrapper>
  )
}

const CalendarWrapper = styled(Flex)`
  width: 208px;
  padding: 3;
  box-shadow: 0px 2px 4px 0px #212121;
  border-radius: 3;
`

const GhostButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 4px;
  row-gap: 4px;
`

const MonthsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 4px;
`

const CalendarButton = styled(GhostButton)(
  ({ isToday, isSelected, isMonthButton }) => css`
    text-align: center;
    border-width: ${isToday ? '1px' : 'none'};
    border-style: ${isToday ? 'solid' : 'none'};
    border-color: ${isToday ? th.color('gray.800') : 'none'};
    border-radius: 1;
    background-color: ${isSelected ? 'primary' : 'transparent'};
    padding: 0;
    min-height: 24px;
    min-width: ${isMonthButton ? 40 : 24}px;

    :hover {
      background-color: ${!isSelected && 'rgba(21, 101, 192, 0.1)'};
    }
  `
)

export default Calendar
