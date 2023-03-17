import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { checkForAnyTypes } from '../../utils/detectReactComponents'
import FadeInComponent from '../BaseComponents/FadeInComponent'
import SvgSymbol from '../BaseComponents/SvgSymbol'

interface InputPropTypes {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  label: string | JSX.Element
  id: string
  value?: string | number
  placeholder?: string
  ariaLabel?: string
  wrapperClasses?: string
  message?: string | JSX.Element
  maxlength?: number
  min?: number
  max?: number
  pattern?: string
  autocomplete?: 'off' | 'on'
  width?: string
  isRequired?: boolean
  isBlock?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  isSuccess?: boolean
  hasError?: boolean
  onClick?: React.MouseEventHandler
  onChange?: React.ChangeEventHandler
  onBlur?: React.FocusEventHandler
  shouldAutoFocus?: boolean
  prependedIcon?: string | JSX.Element
  prependedOnClick?: React.MouseEventHandler
  appendedIcon?: string | JSX.Element
  appendedOnClick?: React.MouseEventHandler
  prependedIconSize?: { width: string; height: string }
  appendedIconSize?: { width: string; height: string }
}

export default function Input({
  label,
  type,
  id,
  value,
  placeholder,
  ariaLabel,
  wrapperClasses,
  message,
  maxlength,
  min,
  max,
  pattern,
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
  prependedIcon,
  prependedOnClick,
  appendedIcon,
  appendedOnClick,
  prependedIconSize = { width: '20', height: '20' },
  appendedIconSize = { width: '20', height: '20' },
}: InputPropTypes): JSX.Element {
  const bem: Function = useBemify('input')

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [hasError, 'error'],
        [isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
      }}
    >
      <div className={bem('label')}>
        {checkForAnyTypes(label) ? (
          label
        ) : (
          <label htmlFor={id}>
            {isRequired ? <span>*</span> : null}
            {label}
          </label>
        )}
      </div>
      <div className={bem('container', [isReadOnly, 'readonly'])}>
        {prependedIcon ? (
          checkForAnyTypes(prependedIcon) ? (
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
          id={id}
          aria-label={ariaLabel || placeholder}
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
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
        />
        {appendedIcon ? (
          checkForAnyTypes(appendedIcon) ? (
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
      </div>
      <FadeInComponent trigger={!!message} timeout={100}>
        <div className={bem('message')}>
          {checkForAnyTypes(message) ? message : <span>{message}</span>}
        </div>
      </FadeInComponent>
    </div>
  )
}
