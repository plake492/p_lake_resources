import { addMonths, format, subMonths } from 'date-fns'
import * as React from 'react'
import { useBemify } from '../../../hooks/useBemify'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { CalendarWrapperProps } from '../types'
import Calender from './Calender'

function ArrowRight() {
  return (
    <svg
      id="arrow-right"
      viewBox="0 0 20 14"
      fill="currentColor"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 7L0.999969 7M19 7L13 1M19 7L13 13"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg
      id="arrow-left"
      viewBox="0 0 20 14"
      fill="currentColor"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7h18M1 7l6 6M1 7l6-6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default function CalendarWrapper({
  showDatePicker,
  setShowDatePicker,
  iconRef,
  showTwoMonths,
  startDate,
  value,
  onChange,
  monthAndYearAreSelectable,
}: CalendarWrapperProps) {
  const [currentFocusedDate, setCurrentFocusedDate] =
    React.useState<Date>(startDate)

  const [calendarPosition, setCalendarPosition] = React.useState<
    'top' | 'bottom'
  >('bottom')

  const calendarRef = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (
      calendarRef.current?.getBoundingClientRect().bottom > window.outerHeight
    ) {
      setCalendarPosition('top')
    }
  }, [showDatePicker])

  useOnClickOutside({
    handler: () => {
      if (showDatePicker) {
        setShowDatePicker(false)
      }
    },
    reference: calendarRef,
    exception: iconRef,
  })

  const bem: Function = useBemify('datepicker')

  const numCalendarsToDisplay: 1 | 2 = showTwoMonths ? 2 : 1

  return (
    <div
      className={bem('wrapper', calendarPosition)}
      style={
        {
          '--num-of-months-displayed': numCalendarsToDisplay,
        } as React.CSSProperties
      }
      ref={calendarRef}
    >
      <div className={bem('calendar-arrow-wrapper')}>
        {[
          { id: 1, Component: ArrowLeft, func: subMonths },
          { id: 2, Component: ArrowRight, func: addMonths },
        ].map(({ id, Component, func }) => (
          <button
            type="button"
            key={id}
            onClick={() => setCurrentFocusedDate((prev) => func(prev, 1))}
          >
            <Component />
          </button>
        ))}
      </div>

      <div className={bem('calendar-wrapper')}>
        {[...Array(numCalendarsToDisplay)].map(
          (_: null, index: number): JSX.Element => (
            <Calender
              key={index}
              date={addMonths(currentFocusedDate, index)}
              onChange={(v: Date): void => onChange(format(v, 'MM/dd/yyyy'))}
              selectedDay={value}
              setCurrentFocusedDate={setCurrentFocusedDate}
              monthAndYearAreSelectable={monthAndYearAreSelectable}
            />
          )
        )}
      </div>
    </div>
  )
}
