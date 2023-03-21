import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { checkIfAnyReactComponentType } from '../../utils/detectReactComponents'

import SvgSymbol from '../BaseComponents/SvgSymbol'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'

export interface InputPropTypes {
  label: string | JSX.Element
  id: string
  value?: string | number
  placeholder?: string
  ariaLabel?: string
  wrapperClasses?: string
  message?: string | JSX.Element | string[]
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
  shouldHideStatus?: boolean
  prependedIcon?: string | JSX.Element
  prependedOnClick?: React.MouseEventHandler
  appendedIcon?: string | JSX.Element
  appendedOnClick?: React.MouseEventHandler
  prependedIconSize?: { width: string; height: string }
  appendedIconSize?: { width: string; height: string }
  shouldValidate?: boolean
  isValid?: boolean
  validationType?: 'email' | 'password' | 'text' | Function
  children?: React.ReactElement
  rows?: number
  formGroupId?: string
}

export default function Textarea({
  label,
  id,
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
  prependedIcon,
  prependedOnClick,
  appendedIcon,
  appendedOnClick,
  prependedIconSize = { width: '20', height: '20' },
  appendedIconSize = { width: '20', height: '20' },
  isValid,
  children,
  rows = 6,
  formGroupId,
}: InputPropTypes): JSX.Element {
  const bem: Function = useBemify('textarea')
  const labelIsReactEl = checkIfAnyReactComponentType(label)
  const Messqages = useFormFieldMessages({ children, message, bem })
  const textareaId = formGroupId ? `${formGroupId}__${id}` : id

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
      {labelIsReactEl ? (
        label
      ) : (
        <label className={bem('label')} htmlFor={textareaId}>
          {isRequired ? <span>*</span> : null}
          {label}
        </label>
      )}
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
          onClick={(e: React.MouseEvent<HTMLTextAreaElement>) =>
            onClick && onClick(e)
          }
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
            onBlur && onBlur(e)
          }
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange && onChange(e)
          }
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
        {isSuccess ? (
          <div
            className={bem('success')}
            style={{ color: 'var(--bg-green-20)' }}
          >
            <SvgSymbol
              icon="success"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            />
          </div>
        ) : null}
      </div>
      {Messqages}
    </div>
  )
}
