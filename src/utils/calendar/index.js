export const CURRENT_YEAR = new Date().getFullYear()

export const CURRENT_MONTH = new Date().getMonth() + 1

export const WEEK_DAYS = {
  Domingo: 'Dom',
  Segunda: 'Seg',
  Terça: 'Tue',
  Quarta: 'Qua',
  Quinta: 'Qui',
  Sexta: 'Sex',
  Sabado: 'Sab'
}

export const CALENDAR_MONTHS = {
  Janeiro: 'Jan',
  Fevereiro: 'Fev',
  Março: 'Mar',
  Abril: 'Abr',
  Maio: 'Mai',
  Junho: 'Jun',
  Julho: 'Jul',
  Agosto: 'Ago',
  Setembro: 'Set',
  Outubro: 'Out',
  Novembro: 'Nov',
  Dezembro: 'Dez'
}

export const CALENDAR_WEEKS = 6

export const getMonthName = month => Object.values(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))]

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0

  if (month === 2) {
    return leapYear ? 29 : 28
  }

  return months30.includes(month) ? 30 : 31
}

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return new Date(`${year}-${month}-1`).getDay() + 1
}

export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]'
  const isValidDate = date && !Number.isNaN(date.valueOf())

  return isDate && isValidDate
}

export const isSameMonth = (date, compareDate = new Date()) => {
  if (!(isDate(date) && isDate(compareDate))) return false

  const basedateMonth = compareDate.getMonth() + 1
  const basedateYear = compareDate.getFullYear()

  const dateMonth = date.getMonth() + 1
  const dateYear = date.getFullYear()

  return basedateMonth === dateMonth && basedateYear === dateYear
}

export const isSameDay = (date, compareDate = new Date()) => {
  if (!(isDate(date) && isDate(compareDate))) return false

  const basedateDate = compareDate.getDate()
  const basedateMonth = compareDate.getMonth() + 1
  const basedateYear = compareDate.getFullYear()

  const dateDate = date.getDate()
  const dateMonth = date.getMonth() + 1
  const dateYear = date.getFullYear()

  return basedateDate === dateDate && basedateMonth === dateMonth && basedateYear === dateYear
}

export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12
  const prevMonthYear = month > 1 ? year : year - 1

  return { month: prevMonth, year: prevMonthYear }
}

export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1
  const nextMonthYear = month < 12 ? year : year + 1

  return { month: nextMonth, year: nextMonthYear }
}

export const getCalendarDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  const monthDays = getMonthDays(month, year)
  const monthFirstDay = getMonthFirstDay(month, year)

  const daysFromPrevMonth = monthFirstDay - 1

  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays)

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year)
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year)

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear)

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth)
    return [prevMonthYear, prevMonth, day]
  })

  const thisMonthDates = [...new Array(monthDays)].map((_, index) => {
    const day = index + 1
    return [year, month, day]
  })

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, index) => {
    const day = index + 1
    return [nextMonthYear, nextMonth, day]
  })

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates]
}

export const getCalendarMonths = (year = CURRENT_YEAR) => {
  const calendarMonths = [...new Array(20)].map((_, index) => {
    const monthDate = index <= 12 ? new Date(year, index) : new Date(year + 1, index - 12)
    return monthDate
  })

  return calendarMonths
}
