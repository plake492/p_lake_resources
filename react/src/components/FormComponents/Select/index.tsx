import * as React from 'react'
import { useBemify } from '../../../hooks/useBemify'
import FieldLabel from '../helperComponents/FieldLabel'
import SuccessIcon from '../helperComponents/SuccessIcon'
import { useFormFieldMessages } from '../hooks/useFormFieldMessages'
import { OptionPropTypes, SelectPropTypes } from '../types'
import { formEvents } from '../utils/formEvents'

const Option = function ({
  value,
  label,
  disabled,
  selected,
}: OptionPropTypes): JSX.Element {
  return (
    <option disabled={disabled} value={value ?? label} selected={selected}>
      {label}
    </option>
  )
}

export default function Select({
  label,
  value,
  placeholder,
  wrapperClasses,
  message,
  name,
  width,
  isBlock,
  isDisabled,
  isReadOnly,
  isSuccess,
  isRequired,
  shouldHideStatus,
  hasError,
  onChange,
  onClick,
  onBlur,
  children,
  options,
  removePlaceholder,
  fieldId,
  columnClass,
  forDatePicker,
  hideLabel,
}: SelectPropTypes) {
  // Give the placeholder a standard format
  const formatPlaceholder: string = placeholder ?? '--select--'

  // Add a placeholder option unless disabled
  const optionsList: OptionPropTypes[] = !removePlaceholder
    ? [{ label: formatPlaceholder, value: '', isPlaceholder: true }, ...options]
    : options

  // This allows us to set a value when the select el is clicked in the even
  // that the defualt placeholder has been disabled
  const handleOnClick = (v: string): void => {
    if (removePlaceholder && onChange) {
      onChange(v)
    }
    if (onClick) {
      onClick(v)
    }
  }
  // Set up function for handling styles
  const bem: Function = useBemify('select')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  const events = formEvents<HTMLSelectElement>({
    onClick: handleOnClick,
    onChange,
    onBlur,
  })

  return (
    <fieldset
      className={bem(
        '',
        columnClass,
        wrapperClasses,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && hasError, 'error'],
        [!shouldHideStatus && isSuccess, 'success'],
        [forDatePicker, '--date-picker']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
      }}
    >
      <div className={bem('label-wrapper', [hideLabel, '--hidden'])}>
        <FieldLabel
          className={bem('label')}
          isRequired={isRequired}
          el="legend"
        >
          {label}
        </FieldLabel>
        <SuccessIcon className={bem('success')} isSuccess={isSuccess} />
      </div>
      <div
        className={bem(
          'container',
          [isReadOnly, 'readonly'],
          [hasError, 'error']
        )}
      >
        <select
          id={fieldId}
          name={name ?? fieldId}
          className={bem('field', [!value, '--unselected'])}
          {...events}
        >
          {optionsList.map(
            (option: OptionPropTypes, index: number): JSX.Element => (
              <Option
                key={option.label + index}
                disabled={option.isPlaceholder && !!value}
                {...option}
              />
            )
          )}
        </select>
      </div>
      <div className={bem('message-wrapper')}>{messages}</div>
    </fieldset>
  )
}
