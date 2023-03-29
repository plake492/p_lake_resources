import * as React from 'react'
import {
  format,
  getDaysInMonth,
  getMonth,
  getDate,
  getYear,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import { dayNamesLetter } from '../utils/dateHelpers'
import { useBemify } from '../../../hooks/useBemify'

interface CalendarProps {
  date: Date
  selectedDay: Date | string
  onChange: (v: Date) => void
}

interface SelectedDateObj {
  year: null | number
  month: null | number
  dayOfMonth: null | number
}

export default function Calender({ date, selectedDay, onChange }: CalendarProps) {
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = React.useState<number>(0)
  const [firstDayOfMonth, setFirstDayOfMonth] = React.useState<number>(null)
  const [lastOfMonth, setLastOfMonth] = React.useState<number>(null)

  const [month, setMonth] = React.useState<number>(getMonth(date))
  const [year, setYear] = React.useState<number>(getDate(date))

  const [selectedDate, setSelectedDate] = React.useState<SelectedDateObj>({
    year: null,
    month: null,
    dayOfMonth: null,
  })

  const bem = useBemify('calendar')

  React.useEffect((): void => {
    setSelectedDate({
      year: getYear(selectedDay as Date),
      month: getMonth(selectedDay as Date),
      dayOfMonth: getDate(selectedDay as Date),
    })
  }, [selectedDay])

  React.useEffect((): void => {
    const firstOfMonth: number = parseInt(format(startOfMonth(date), 'i'))
    setFirstDayOfMonth(firstOfMonth === 7 ? 0 : firstOfMonth)

    const lastOfMonth: number = parseInt(format(endOfMonth(date), 'i'))
    setLastOfMonth(lastOfMonth === 7 ? 0 : lastOfMonth)

    setNumberOfDaysInMonth(getDaysInMonth(date))
    setMonth(getMonth(date))
    setYear(getYear(date))
  }, [date])

  const isMonthAndYear: boolean = selectedDate.year === year && selectedDate.month == month

  return (
    <section
      className={bem()}
      style={
        {
          '--first-day-of-month': firstDayOfMonth,
          '--last-day-of-month': lastOfMonth,
        } as React.CSSProperties
      }
    >
      <div className={bem('month-year-display')}>
        <p>{format(date, 'MMM yyyy')}</p>
      </div>
      <div className={bem('day-name-wrapper')}>
        {dayNamesLetter.map((day, index) => (
          <p key={day + index} className={bem('day-name')}>
            {day}
          </p>
        ))}
      </div>
      <div className={bem('days-wrapper')}>
        {numberOfDaysInMonth &&
          [...Array(numberOfDaysInMonth)].map((_, index) => {
            const date = new Date(year, month, index + 1)
            const isSelectedDate = isMonthAndYear && index + 1 === selectedDate.dayOfMonth

            return (
              <span
                onClick={() => onChange(date)}
                className={bem('day', [isSelectedDate, 'selected'])}
              >
                {index + 1}
              </span>
            )
          })}
      </div>
    </section>
  )
}