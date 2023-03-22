import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import FieldLabel from './helperComponents/FieldLabel'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'

const Option = function ({
  value,
  label,
  disabled,
  selected,
}: FormTypes.OptionPropTypes): JSX.Element {
  return (
    <option disabled={disabled} value={value ?? label} selected={selected}>
      {label}
    </option>
  )
}

export default function Select({
  id,
  label,
  value,
  placeholder,
  wrapperClasses,
  formGroupId,
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
  removePlaceholder,
  options,
}: FormTypes.SelectPropTypes) {
  // Set up function for handling styles
  const bem: Function = useBemify('select')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  // Set up id with reference to form
  const selectId: string = formGroupId ? `${formGroupId}__${id}` : id

  // Give the placeholder a standard format
  const formatPlaceholder: string = placeholder
    ? `--${placeholder.replace(/-/g, '')}--`
    : '--select option--'

  // Add a placeholder option unless disabled
  const optionsList: FormTypes.OptionPropTypes[] = !removePlaceholder
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

  const events = formEvents<HTMLSelectElement>({
    onClick: handleOnClick,
    onChange,
    onBlur,
  })

  return (
    <fieldset
      className={bem(
        '',
        wrapperClasses,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && hasError, 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel className={bem('label')} isRequired={isRequired} el="legend">
        {label}
      </FieldLabel>
      <div
        className={bem(
          'container',
          [isReadOnly, 'readonly'],
          [hasError, 'error']
        )}
      >
        <select
          id={selectId}
          name={name ?? id}
          className={bem('field', [!value, '--unselected'])}
          {...events}
        >
          {optionsList.map(
            (option: FormTypes.OptionPropTypes, index: number): JSX.Element => (
              <Option
                key={option.label + index}
                disabled={option.isPlaceholder && !!value}
                {...option}
              />
            )
          )}
        </select>
      </div>
      {messages}
    </fieldset>
  )
}