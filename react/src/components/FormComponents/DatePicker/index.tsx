import * as React from 'react'
import Calender from './Calender'
import { format, addMonths, subMonths } from 'date-fns'
import { useBemify } from '../../../hooks/useBemify'
import SvgSymbol from '../../BaseComponents/SvgSymbol'
import FadeInComponent from '../../BaseComponents/FadeInComponent'
import DatepickerInput from './DatepickerInput'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'

interface DatePickerProps {
  showTwoMonths?: boolean
  onChange?: (selectedDay: string) => void
  startDate?: Date
}

export default function DatePicker({
  startDate = new Date(),
  showTwoMonths,
  onChange,
  id,
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
  formGroupId,
  message,
  autocomplete,
  isRequired,
  isReadOnly,
  isDisabled,
  isSuccess,
  hasError,
  shouldAutoFocus,
  shouldHideStatus,
  isValid,
  onClick,
  onBlur,
  appendedIconSize = { width: '20', height: '20' },
  breakpoint,
  col = 12,
  styleConfig,
  forwardRef,
  children,
}: any): JSX.Element {
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false)
  const [currentFocusedDate, setCurrentFocusedDate] =
    React.useState<Date>(startDate)
  const [selectedDay, setSelectedDay] = React.useState<Date | string>(null)

  const bem = useBemify('datepicker')

  const calendarRef = React.useRef()

  useOnClickOutside({
    handler: () => {
      if (showDatePicker) {
        setShowDatePicker(false)
      }
    },
    reference: calendarRef,
  })

  const numCalendarsToDisplay: 1 | 2 = showTwoMonths ? 2 : 1

  React.useEffect((): void => {
    // const dateFomratted: string = format(new Date(startDate), 'MM/dd/yyyy')
    // setSelectedDay(dateFomratted)
  }, [])

  React.useEffect(() => {
    onChange(selectedDay as string)
  }, [selectedDay])

  const columnClass: string = !!breakpoint
    ? `col-${breakpoint}-${col}`
    : `col-${col}`

  return (
    <div className={columnClass + ' position-relative mb-md'}>
      <DatepickerInput
        type="text"
        appendedOnClick={() => setShowDatePicker((prev) => !prev)}
        id={id}
        label={label}
        value={value}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
        wrapperClasses={wrapperClasses}
        formGroupId={formGroupId}
        message={message}
        autocomplete={autocomplete}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isSuccess={isSuccess}
        hasError={hasError}
        shouldAutoFocus={shouldAutoFocus}
        shouldHideStatus={shouldHideStatus}
        isValid={isValid}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
        appendedIconSize={appendedIconSize}
        breakpoint={breakpoint}
        col={col}
        styleConfig={styleConfig}
        forwardRef={forwardRef}
        children={children}
      />
      <FadeInComponent trigger={showDatePicker}>
        <div
          className={bem()}
          style={
            {
              '--num-of-months-displayed': numCalendarsToDisplay,
            } as React.CSSProperties
          }
          ref={calendarRef}
        >
          <div className={bem('calendar-arrow-wrapper')}>
            <button
              onClick={() =>
                setCurrentFocusedDate((prev) => subMonths(prev, 1))
              }
            >
              <SvgSymbol
                viewBox="0 0 20 14"
                width="100%"
                height="100%"
                icon="arrow-left"
              />
            </button>
            <button
              onClick={() =>
                setCurrentFocusedDate((prev) => addMonths(prev, 1))
              }
            >
              <SvgSymbol
                viewBox="0 0 20 14"
                width="100%"
                height="100%"
                icon="arrow-right"
              />
            </button>
          </div>

          <div className={bem('calendar-wrapper')}>
            {[...Array(numCalendarsToDisplay)].map(
              (_: null, index: number): JSX.Element => (
                <Calender
                  key={index}
                  date={addMonths(currentFocusedDate, index)}
                  onChange={(v: Date) =>
                    setSelectedDay(format(v, 'MM/dd/yyyy'))
                  }
                  selectedDay={selectedDay}
                />
              )
            )}
          </div>
        </div>
      </FadeInComponent>
    </div>
  )
}
