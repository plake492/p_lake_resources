import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { checkIfAnyReactComponentType } from '../../utils/detectReactComponents'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'

interface CheckboxPropTypes {
  label: string | React.ReactElement
  id: string
  value?: boolean
  placeholder?: string
  type?: 'checkbox'
  ariaLabel?: string
  wrapperClasses?: string
  message?: string | JSX.Element | string[]
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
  children?: React.ReactElement
  formGroupId?: string
}

export default function Checkbox({
  label,
  id,
  value,
  type = 'checkbox',
  placeholder,
  ariaLabel,
  message,
  isRequired,
  isBlock,
  isDisabled,
  isSuccess,
  hasError,
  onClick,
  onChange,
  onBlur,
  shouldAutoFocus,
  shouldHideStatus,
  children,
  formGroupId,
}: CheckboxPropTypes) {
  const bem = useBemify('checkbox')
  const labelIsReactEl = checkIfAnyReactComponentType(label)
  const Messages = useFormFieldMessages({
    message,
    children,
    bem,
    forceMessageClass: true,
  })
  const checkboxId = formGroupId ? `${formGroupId}__${id}` : id

  return (
    <div
      className={bem(
        '',
        [!shouldHideStatus && hasError, 'error'],
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isSuccess, 'success']
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
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            onClick && onClick(e)
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            onBlur && onBlur(e)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange && onChange(e)
          }
        />
        <div className={bem('box')}></div>
      </div>
      {labelIsReactEl ? (
        <span className={bem('label')}>
          {label}
          {Messages}
        </span>
      ) : (
        <>
          <div className={bem('label')}>
            <label htmlFor={checkboxId}>
              {isRequired ? <span>*</span> : null}
              {label}
              {Messages}
            </label>
          </div>
        </>
      )}
    </div>
  )
}
