import * as React from 'react'
import FieldLabel from './FieldLabel'
import { useBemify } from '../../hooks/useBemify'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'

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
}: FormTypes.CheckboxPropTypes) {
  const bem = useBemify('checkbox')
  const messages = useFormFieldMessages({
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
      <div className={bem('label')}>
        <FieldLabel htmlFor={checkboxId} isRequired={isRequired} type="BUTT">
          {label}
          {messages}
        </FieldLabel>
      </div>
    </div>
  )
}
