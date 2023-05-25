import * as React from 'react'
import { useBemify } from '../../../hooks/useBemify'

import FieldLabel from '../helperComponents/FieldLabel'
import SuccessIcon from '../helperComponents/SuccessIcon'
import { useFormFieldMessages } from '../hooks/useFormFieldMessages'
import { TextAreaPropTypes } from '../types'
import { formEvents } from '../utils/formEvents'

export default function Textarea({
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
  message,
  autocomplete,
  width,
  isRequired,
  isBlock,
  isReadOnly,
  isDisabled,
  isSuccess,
  hasError,
  onClick,
  onChange,
  onBlur,
  shouldAutoFocus,
  shouldHideStatus,
  isValid,
  children,
  rows = 6,
  columnClass,
  fieldId,
  styles,
}: TextAreaPropTypes): JSX.Element {
  // Set up function for handling styles
  const bem: Function = useBemify('textarea')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  const events = formEvents<HTMLTextAreaElement>({
    onChange,
    onClick,
    onBlur,
  })

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        columnClass,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && (hasError || !isValid), 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
        ...(!!styles ? (styles as React.CSSProperties) : {}),
      }}
    >
      <div className={bem('label-wrapper')}>
        <FieldLabel
          className={bem('label')}
          htmlFor={fieldId}
          isRequired={isRequired}
        >
          {label}
        </FieldLabel>
        <SuccessIcon className={bem('success')} isSuccess={isSuccess} />
      </div>
      <div
        className={bem(
          'container',
          [isReadOnly, 'readonly'],
          [hasError || !isValid, 'error']
        )}
      >
        <textarea
          className={bem('field')}
          id={fieldId}
          aria-label={ariaLabel || placeholder}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isDisabled}
          value={value}
          required={isRequired}
          autoFocus={shouldAutoFocus}
          autoComplete={autocomplete}
          rows={rows}
          {...events}
        />
      </div>
      <div className={bem('message-wrapper')}>{messages}</div>
    </div>
  )
}
