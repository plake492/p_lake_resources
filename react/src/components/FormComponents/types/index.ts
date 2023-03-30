import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react'

export type InputTypes =
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

export type rowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

interface FormFieldEventHandlers<T> {
  onChange?: (v: string | number | boolean, e?: React.ChangeEvent) => void
  onClick?: (v: string | number | boolean, e?: React.MouseEvent) => void
  onBlur?: React.FocusEventHandler<T>
}

export interface FormPropTypes {
  /**
   *
   * A group of form elements
   * @TODO Create TextArea, Select, Option, Radio
   */
  children: React.ReactElement[] | React.ReactElement
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    isSuccess: boolean
  ) => void
  hasError?: boolean
  isSuccess?: boolean
  noValidate?: boolean
  wrapperClasses?: string
  disableBtnError?: boolean
  disableSuccessIndicators?: boolean
  formId?: string
  formLabel?: string | JSX.Element
  autoComplete?: 'on' | 'off'
  gap?: rowSize
  rowGap?: rowSize
  colGap?: rowSize
  colorTheme?: 'dark' | 'light'
  styleOptions?: { [key: string]: string }
  /**
   *
   * A form id's with a password field that should be excluded from the
   * password confirmation check, this would most commonly apply
   * to a form contianing (Old | Previous) password, New password, and
   * Confirm new Password fields, where the (Old | Previous) password would be excluded
   */
  excludeFieldFromConfirmPassword?: string | undefined
}

export interface FormElementTypes<T> extends FormFieldEventHandlers<T> {
  label: string | JSX.Element
  id: string
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
  shouldAutoFocus?: boolean
  shouldHideStatus?: boolean
  children?: React.ReactElement
  formGroupId?: string
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  styleConfig?: { [key: string]: string }
  columnClass?: string
  fieldId?: string
  styles?: { [key: string]: string }
  events?: any // TODO CHANGE THIS
  forwardRef?: any // TODO CHANGE THIS
}

export interface InputPropTypes extends FormElementTypes<HTMLInputElement> {
  type: InputTypes
  wrapperClasses?: string
  value?: string | number
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

export interface TextAreaPropTypes
  extends FormElementTypes<HTMLTextAreaElement> {
  wrapperClasses?: string
  value?: string | number
  maxlength?: number
  autocomplete?: 'off' | 'on'
  width?: string
  isBlock?: boolean
  shouldValidate?: boolean
  isValid?: boolean
  validationType?: 'email' | 'password' | 'text' | Function
  rows?: number
}

export interface CheckboxPropTypes extends FormElementTypes<HTMLInputElement> {
  type?: 'checkbox'
  value?: boolean
  isBlock?: boolean
}

export interface RadioButtonsPropTypes
  extends FormElementTypes<HTMLInputElement> {
  value?: string | number | undefined
  options?: RadioPropTypes[]
  isVertical?: boolean
}

export interface RadioPropTypes {
  id: string
  label: string
  name?: string
  value?: string | number | undefined
  checked?: string | number | undefined
  formGroupId?: string
  isDisabled?: boolean
  type?: 'radio'
  events?: {
    onBlur: FocusEventHandler<HTMLInputElement>
    onClick: MouseEventHandler<HTMLInputElement>
    onChange: ChangeEventHandler<HTMLInputElement>
  }
}

export interface SelectPropTypes extends FormElementTypes<HTMLSelectElement> {
  name?: string
  wrapperClasses?: string
  isBlock?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  shouldHideStatus?: boolean
  hasError?: boolean
  isSuccess?: boolean
  isRequired?: boolean
  width?: string
  options?: OptionPropTypes[]
  placeholder?: string
  removePlaceholder?: boolean
  value?: string
}

export interface OptionPropTypes {
  label: string
  value?: string
  disabled?: boolean
  selected?: boolean
  isPlaceholder?: boolean
}
