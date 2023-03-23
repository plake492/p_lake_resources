import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'

import FieldLabel from './helperComponents/FieldLabel'
import SuccessIcon from './helperComponents/SuccessIcon'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { TextAreaPropTypes } from './types'
import { formEvents } from './utils/formEvents'

export default function Textarea({
  id,
  label,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
  formGroupId,
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
}: TextAreaPropTypes): JSX.Element {
  // Set up function for handling styles
  const bem: Function = useBemify('textarea')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  // Set up id with reference to form
  const textareaId: string = formGroupId ? `${formGroupId}__${id}` : id

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
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && (hasError || !isValid), 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel
        className={bem('label')}
        htmlFor={textareaId}
        isRequired={isRequired}
      >
        {label}
      </FieldLabel>
      <div
        className={bem(
          'container',
          [isReadOnly, 'readonly'],
          [hasError || !isValid, 'error']
        )}
      >
        <textarea
          className={bem('field')}
          id={textareaId}
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
        <SuccessIcon
          className={bem('success')}
          isSuccess={messages && isSuccess}
        />
      </div>
      {messages}
    </div>
  )
}
