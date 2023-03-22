namespace FormTypes {
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
    formLabel?: string | JSX.Element
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

  export interface FormElementTypes<E> {
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
    onClick?: Function
    onChange?: Function
    onBlur?: React.FocusEventHandler<E>
    shouldAutoFocus?: boolean
    shouldHideStatus?: boolean
    children?: React.ReactElement
    formGroupId?: string
  }

  export interface InputPropTypes extends FormElementTypes<HTMLInputElement> {
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

  export interface CheckboxPropTypes
    extends FormElementTypes<HTMLInputElement> {
    type?: 'checkbox'
    value?: boolean
    onChange?: React.ChangeEventHandler
    isBlock?: boolean
  }

  export interface RadioButtonsPropTypes
    extends FormElementTypes<HTMLInputElement> {
    value?: string | number | undefined
    options?: { [key: string]: string | number }[]
    isVertical?: boolean
  }

  export interface RadioPropTypes {
    name: string
    id: string
    label: string
    value?: string | number | undefined
    checked?: string | number | undefined
    formGroupId?: string
    isDisabled?: boolean
    type?: 'radio'
    onChange?: Function
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
}
