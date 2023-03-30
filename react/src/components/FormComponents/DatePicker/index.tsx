import * as React from 'react'
import { format, addMonths, subMonths } from 'date-fns'

import Calender from './Calender'
import SvgSymbol from '../../BaseComponents/SvgSymbol'
import FadeInComponent from '../../BaseComponents/FadeInComponent'

import { useBemify } from '../../../hooks/useBemify'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useFormFieldMessages } from '../hooks/useFormFieldMessages'
import { formEvents } from '../utils/formEvents'
import SuccessIcon from '../helperComponents/SuccessIcon'
import FieldLabel from '../helperComponents/FieldLabel'

interface DatePickerProps {
  showTwoMonths?: boolean
  onChange?: (selectedDay: string) => void
  startDate?: Date
}

export default function DatePicker({
  startDate = new Date(),
  showTwoMonths,
  onChange,
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
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
  columnClass,
  fieldId,
  forwardRef,
  children,
  styles,
}: any): JSX.Element {
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false)
  const [calendarPosition, setCalendarPosition] = React.useState<
    'top' | 'bottom'
  >('bottom')
  const [currentFocusedDate, setCurrentFocusedDate] =
    React.useState<Date>(startDate)

  const bem: Function = useBemify('datepicker')

  const calendarRef = React.useRef<HTMLDivElement>()
  const iconRef = React.useRef<HTMLDivElement>()

  const handleKeydown = (e: KeyboardEvent) => {
    if (document.activeElement === iconRef.current && e.key === 'Enter') {
      setShowDatePicker(true)
    }
    if (e.key === 'Escape') {
      setShowDatePicker(false)
    }
  }

  React.useEffect(() => {
    if (
      calendarRef.current?.getBoundingClientRect().bottom > window.outerHeight
    ) {
      setCalendarPosition('top')
    }
  }, [showDatePicker])

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({
    children,
    message,
    bem,
  })

  const events = formEvents<HTMLInputElement>({
    onChange,
    onClick,
    onBlur,
  })

  useOnClickOutside({
    handler: () => {
      if (showDatePicker) {
        setShowDatePicker(false)
      }
    },
    reference: calendarRef,
    exception: iconRef,
  })

  const numCalendarsToDisplay: 1 | 2 = showTwoMonths ? 2 : 1

  return (
    <div
      className={bem(
        '',

        columnClass,
        wrapperClasses,
        [showDatePicker, 'z-2'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && (hasError || !isValid), 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(!!styles ? (styles as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel
        className={bem('label')}
        htmlFor={fieldId}
        isRequired={isRequired}
      >
        {label}
      </FieldLabel>
      <div
        className={bem(
          'container',
          'position-relative',
          [isReadOnly, 'readonly'],
          [hasError || !isValid, 'error']
        )}
      >
        <input
          ref={forwardRef}
          className={bem('field')}
          type="text"
          id={fieldId}
          aria-label={ariaLabel ?? placeholder}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isDisabled}
          value={value}
          required={isRequired}
          autoFocus={shouldAutoFocus}
          autoComplete={autocomplete}
          {...events}
        />
        <div ref={iconRef} tabIndex={0}>
          <SvgSymbol
            classes={bem('appended-icon', '--clickable')}
            onClick={() => setShowDatePicker((prev) => !prev)}
            icon="download"
            {...appendedIconSize}
          />
        </div>
        {/* CALENDAR */}
        <FadeInComponent trigger={showDatePicker}>
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
                { dir: 'left', func: subMonths },
                { dir: 'right', func: addMonths },
              ].map(({ dir, func }) => (
                <button
                  type="button"
                  key={dir}
                  onClick={() => setCurrentFocusedDate((prev) => func(prev, 1))}
                >
                  <SvgSymbol
                    viewBox="0 0 20 14"
                    width="100%"
                    height="100%"
                    icon={`arrow-${dir}`}
                  />
                </button>
              ))}
            </div>

            <div className={bem('calendar-wrapper')}>
              {[...Array(numCalendarsToDisplay)].map(
                (_: null, index: number): JSX.Element => (
                  <Calender
                    key={index}
                    date={addMonths(currentFocusedDate, index)}
                    onChange={(v: Date): void =>
                      onChange(format(v, 'MM/dd/yyyy'))
                    }
                    selectedDay={value}
                  />
                )
              )}
            </div>
          </div>
        </FadeInComponent>
        {/* END OF CALENDAR */}
      </div>
      <div className={bem('message-wrapper')}>
        <SuccessIcon
          className={bem('success')}
          isSuccess={messages && isSuccess}
        />
        {messages}
      </div>
    </div>
  )
}
