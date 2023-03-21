export interface FormPropTypes {
  /**
   *
   * A group of form elements
   * @TODO Create TextArea, Select, Option, Radio
   */
  children: React.ReactElement[] | React.ReactElement
  onSubmit: Function
  hasError?: boolean
  isSuccess?: boolean
  noValidate?: boolean
  wrapperClasses?: string
  disableBtnError?: boolean
  disableSuccessIndicators?: boolean
  formId?: string
  autoComplete?: 'on' | 'off'
  /**
   *
   * A form id's with a password field that should be excluded from the
   * password confirmation check, this would most commonly apply
   * to a form contianing (Old | Previous) password, New password, and
   * Confirm new Password fields, where the (Old | Previous) password would be excluded
   */
  excludeFieldFromConfirmPassword?: string | undefined
}

export interface FormElementTypes {
  label: string | JSX.Element
  id: string
  value?: string | number
  placeholder?: string
  ariaLabel?: string
  wrapperClasses?: string
  message?: string | JSX.Element | string[]
  maxlength?: number
  isRequired?: boolean
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

export interface InputPropTypes extends FormElementTypes {
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
  wrapperClasses?: string
  maxlength?: number
  min?: number
  max?: number
  pattern?: string
  autocomplete?: 'off' | 'on'
  width?: string
  isBlock?: boolean
  prependedIcon?: string | JSX.Element
  prependedOnClick?: React.MouseEventHandler
  appendedIcon?: string | JSX.Element
  appendedOnClick?: React.MouseEventHandler
  prependedIconSize?: { width: string; height: string }
  appendedIconSize?: { width: string; height: string }
  shouldValidate?: boolean
  isValid?: boolean
  validationType?: 'email' | 'password' | 'text' | Function
}

export interface TextAreaPropTypes extends FormElementTypes {
  wrapperClasses?: string
  maxlength?: number
  autocomplete?: 'off' | 'on'
  width?: string
  isBlock?: boolean
  shouldValidate?: boolean
  isValid?: boolean
  validationType?: 'email' | 'password' | 'text' | Function
  rows?: number
}

export interface CheckboxPropTypes extends FormElementTypes {
  type?: 'checkbox'
}
