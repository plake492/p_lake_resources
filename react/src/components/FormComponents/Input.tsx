import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { checkIfAnyReactComponentType } from '../../utils/detectReactComponents'

import SvgSymbol from '../BaseComponents/SvgSymbol'
import FieldLabel from './helperComponents/FieldLabel'
import SuccessIcon from './helperComponents/SuccessIcon'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { InputPropTypes } from './types'
import { formEvents } from './utils/formEvents'
import { setStyles } from './utils/styleVars'

export default function Input({
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
  isBlock,
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
  type,
  maxlength,
  min,
  max,
  pattern,
  prependedIcon,
  prependedOnClick,
  appendedIcon,
  appendedOnClick,
  prependedIconSize = { width: '20', height: '20' },
  appendedIconSize = { width: '20', height: '20' },
  breakpoint,
  col = 12,
  styleConfig,
}: InputPropTypes): JSX.Element {
  // Set up function for handling styles
  const bem: Function = useBemify('input')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({ children, message, bem })

  // Set up id with reference to form
  const inputId: string = formGroupId ? `${formGroupId}__${id}` : id

  const columnClass: string = !!breakpoint
    ? `col-${breakpoint}-${col}`
    : `col-${col}`

  const events = formEvents<HTMLInputElement>({ onChange, onClick, onBlur })

  const styles = !!styleConfig && setStyles(styleConfig)

  return (
    <div
      className={bem(
        '',
        columnClass,
        wrapperClasses,
        [isBlock, 'block'],
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
        {prependedIcon ? (
          checkIfAnyReactComponentType(prependedIcon) ? (
            prependedIcon
          ) : (
            <SvgSymbol
              classes={bem('prepended-icon', [
                !!prependedOnClick,
                '--clickable',
              ])}
              onClick={prependedOnClick}
              icon={prependedIcon as string}
              {...prependedIconSize}
            />
          )
        ) : null}
        <input
          className={bem('field')}
          type={type}
          id={inputId}
          aria-label={ariaLabel ?? placeholder}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isDisabled}
          value={value}
          maxLength={maxlength}
          min={min}
          max={max}
          pattern={pattern}
          required={isRequired}
          autoFocus={shouldAutoFocus}
          autoComplete={autocomplete}
          {...events}
        />
        {appendedIcon ? (
          checkIfAnyReactComponentType(appendedIcon) ? (
            appendedIcon
          ) : (
            <SvgSymbol
              classes={bem('appended-icon', [!!appendedOnClick, '--clickable'])}
              onClick={appendedOnClick}
              icon={appendedIcon as string}
              {...appendedIconSize}
            />
          )
        ) : null}
        <SuccessIcon
          className={bem('success')}
          isSuccess={messages && isSuccess}
        />
      </div>
      {messages}
    </div>
  )
}
