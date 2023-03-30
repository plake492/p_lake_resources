import * as React from 'react'
import FieldLabel from './helperComponents/FieldLabel'
import { useBemify } from '../../hooks/useBemify'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'
import { CheckboxPropTypes } from './types'
import SuccessIcon from './helperComponents/SuccessIcon'

export default function Checkbox({
  type = 'checkbox',
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
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
  columnClass,
  fieldId,
  styles,
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

  const events = formEvents<HTMLInputElement>({ onChange, onClick, onBlur })

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        columnClass,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [isSuccess, 'success'],
        [!shouldHideStatus && hasError, 'error']
      )}
      style={{ ...(!!styles ? (styles as React.CSSProperties) : {}) }}
    >
      <div className={bem('field-wrapper')}>
        <input
          type={type}
          id={fieldId}
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
        <FieldLabel htmlFor={fieldId} isRequired={isRequired}>
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
