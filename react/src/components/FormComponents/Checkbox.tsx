import * as React from 'react'
import FieldLabel from './helperComponents/FieldLabel'
import { useBemify } from '../../hooks/useBemify'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'

export default function Checkbox({
  id,
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
  formGroupId,
  message,
  isRequired,
  isBlock,
  isReadOnly,
  isDisabled,
  isSuccess,
  hasError,
  shouldAutoFocus,
  shouldHideStatus,
  onClick,
  onChange,
  onBlur,
  children,
  type = 'checkbox',
}: FormTypes.CheckboxPropTypes) {
  // Set up function for handling styles
  const bem: Function = useBemify('checkbox')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({
    message,
    children,
    bem,
    forceMessageClass: true,
  })

  // Set up id with reference to form
  const checkboxId: string = formGroupId ? `${formGroupId}__${id}` : id

  const events = formEvents<HTMLInputElement>({ onChange, onClick, onBlur })

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [isSuccess, 'success'],
        [!shouldHideStatus && hasError, 'error']
      )}
    >
      <div className={bem('field-wrapper')}>
        <input
          type={type}
          id={checkboxId}
          className={bem('field')}
          aria-label={ariaLabel || placeholder}
          placeholder={placeholder}
          disabled={isDisabled}
          checked={value}
          required={isRequired}
          autoFocus={shouldAutoFocus}
          {...events}
        />
        <div className={bem('box')}></div>
      </div>
      <div className={bem('label')}>
        <FieldLabel htmlFor={checkboxId} isRequired={isRequired}>
          {label}
          {messages}
        </FieldLabel>
      </div>
    </div>
  )
}
