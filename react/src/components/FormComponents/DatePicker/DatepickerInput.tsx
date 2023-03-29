import * as React from 'react'
import { useBemify } from '../../../hooks/useBemify'

import SvgSymbol from '../../BaseComponents/SvgSymbol'
import FieldLabel from '../helperComponents/FieldLabel'
import SuccessIcon from '../helperComponents/SuccessIcon'
import { useFormFieldMessages } from '../hooks/useFormFieldMessages'
import { formEvents } from '../utils/formEvents'
import { setStyles } from '../utils/styleVars'

export default function DatepickerInput({
  id,
  label,
  value,
  type = 'text',
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
  onChange,
  onBlur,
  children,
  appendedOnClick,
  appendedIconSize = { width: '20', height: '20' },
  styleConfig,
  forwardRef,
}: any) {
  // Set up function for handling styles
  const bem: Function = useBemify('input')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  // Set up id with reference to form
  const inputId: string = formGroupId ? `${formGroupId}__${id}` : id

  const events = formEvents<HTMLInputElement>({ onChange, onClick, onBlur })

  const styles = !!styleConfig && setStyles(styleConfig)

  return (
    <div
      className={bem(
        '',
        'mb-none',
        wrapperClasses,
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && (hasError || !isValid), 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(!!styleConfig ? (styles as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel
        className={bem('label')}
        htmlFor={inputId}
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
        <input
          ref={forwardRef}
          className={bem('field')}
          type={type}
          id={inputId}
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
        <SvgSymbol
          classes={bem('appended-icon', '--clickable')}
          onClick={appendedOnClick}
          icon="download"
          {...appendedIconSize}
        />
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
