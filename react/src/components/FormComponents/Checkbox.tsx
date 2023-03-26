import * as React from 'react'
import FieldLabel from './helperComponents/FieldLabel'
import { useBemify } from '../../hooks/useBemify'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'
import { CheckboxPropTypes } from './types'
import SuccessIcon from './helperComponents/SuccessIcon'

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
  breakpoint,
  col,
  type = 'checkbox',
}: CheckboxPropTypes) {
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

  const colClass =
    col && breakpoint
      ? `col-${breakpoint}-${col}`
      : col
      ? `col-${col}`
      : 'col-12'

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        colClass,
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
        </FieldLabel>
        <div className={bem('message-wrapper')}>
          <SuccessIcon
            className={bem('success')}
            isSuccess={messages && isSuccess}
          />
          {messages}
        </div>
      </div>
    </div>
  )
}
