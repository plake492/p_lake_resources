import '../../assets/scss/form-components/index.scss'

import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { isDOMTypeElement } from '../../utils/detectReactComponents'
import { forceArray } from '../../utils/helpers'
import FieldLabel from './helperComponents/FieldLabel'
import {
  IsIvalidErrorMessage,
  PasswordMatchErrorMessage,
  RequiredFieldErrorMessage,
} from './helperComponents/FormMessages'
import { useConfirmPasswordMatch } from './hooks/useConfirmPasswordMatch'
import { useFormFieldsValidation } from './hooks/useFormFieldsValidation'
import { useStyleForm } from './hooks/useStyleForm'
import { FormPropTypes, InputPropTypes } from './types'
import { validFormComponentChildren } from './utils/validFormComponentChildren'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { setStyles } from './utils/styleVars'

export default function Form({
  children,
  onSubmit,
  noValidate,
  excludeFieldFromConfirmPassword,
  wrapperClasses,
  disableBtnError,
  disableSuccessIndicators,
  formId,
  formLabel,
  autoComplete = 'off',
  gap = 'md',
  rowGap,
  colGap,
  colorTheme = 'dark',
  styleOptions,
}: FormPropTypes): JSX.Element {
  // Handles password matching
  const {
    passwordMatchError,
    handlePasswordMatchOnBlur,
    checkIfPasswordMatchIsNeeded,
    updatePasswordValue,
    handlePasswordsMatch,
    passwordIDs,
  } = useConfirmPasswordMatch({ children, excludeFieldFromConfirmPassword })

  // Handles input and form validation
  const {
    missingRequiredValue,
    updateRequiredFieldValue,
    containesValidationError,
    checkFieldValidation,
    formItemValues,
  } = useFormFieldsValidation({ children })

  const formRef = React.useRef()
  useStyleForm({ formRef, styleOptions })

  // Set up function for handling styles
  const bem: Function = useBemify('form')

  const [formError, setFormError] = React.useState<boolean>(false)
  const [formSubmissionAttempted, setFormSubmitionAttemp] =
    React.useState<boolean>(false)

  React.useEffect((): void => {
    if (formError) {
      setFormError(
        missingRequiredValue || containesValidationError || passwordMatchError
      )
    }
  }, [containesValidationError, passwordMatchError])

  // Add a unique id that can be common to all form fields
  const reactId: string = React.useId()
  const formGroupId: string = formId ? formId + reactId : reactId

  /**
   * Validate the child prop requiremnts.
   * Run the onSubmit function prop
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // Set attempted submit flag on
    setFormSubmitionAttemp(true)

    const formIsInvalid: boolean =
      missingRequiredValue || containesValidationError || passwordMatchError

    // Set the error state
    setFormError(formIsInvalid)

    // Call the submit callback and pass the event, and the validation state
    onSubmit(event, !formIsInvalid)
  }

  // Force children to be an array
  const elements: React.ReactElement[] = forceArray(children)

  const gapClass =
    rowGap && colGap
      ? `g-col-${colGap} g-row-${rowGap}`
      : gap && rowGap && !colGap
      ? `g-row-${rowGap} g-col-${gap}`
      : gap && !rowGap && colGap
      ? `g-col-${colGap} g-row-${gap}`
      : `g-${gap}`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={noValidate}
      id={formGroupId}
      autoComplete={autoComplete}
      className={bem('', `--${colorTheme}`)}
      ref={formRef}
    >
      {formLabel ? <FieldLabel el="legend">{formLabel}</FieldLabel> : null}
      <div className={bem('field-wrapper', wrapperClasses, 'row', gapClass)}>
        {elements.map((el: JSX.Element, index: number) => {
          const {
            id,
            value,
            label,
            type,
            isRequired,
            shouldValidate,
            hasError,
            onChange,
            onBlur,
            validationType,
          }: InputPropTypes = el.props

          /**
           * If child is not a react component,
           * or if it's not on the list of
           * approved form child components,
           * simply return a clone of the child as is
           */
          if (
            isDOMTypeElement(el) ||
            !validFormComponentChildren.includes(el.type.name)
          ) {
            return (
              <React.Fragment key={index}>
                {React.cloneElement(el)}
              </React.Fragment>
            )
          }

          // Track if input has been selected and then unselected
          const [isTouched, setIsTouched] = React.useState<boolean>(false)

          // If needed, update the value of the password validation object
          if (checkIfPasswordMatchIsNeeded({ id })) {
            updatePasswordValue({ id, value })
          }

          // ************** VALIDATON **************//
          let isValid: boolean = true

          if (isRequired || shouldValidate) {
            updateRequiredFieldValue({ id, value })

            isValid = checkFieldValidation({
              id,
              value,
              validationType,
              isTouched,
              shouldValidate,
              isRequired,
              type,
            })
          }

          const requiredFieldError: boolean =
            formSubmissionAttempted &&
            isRequired &&
            !!formItemValues[id] &&
            !formItemValues[id].value

          // ************** ADDITIONAL PROPS ************* //
          // Add additional logic to onBlur
          const onBlurProp = (e: React.FocusEvent<HTMLInputElement>): void => {
            e.stopPropagation()

            setIsTouched(true)

            // Check if password match vaidation is needed
            if (checkIfPasswordMatchIsNeeded({ id })) {
              handlePasswordMatchOnBlur({ id, value })
            }

            onBlur && onBlur(e)
          }

          // Add additional logic to onChange
          const onChangeProp = (value: string | number, e?: any): void => {
            // Check if password match vaidation is needed
            if (checkIfPasswordMatchIsNeeded({ id })) {
              handlePasswordsMatch({ id, value })
            }
            return onChange && onChange(value, e)
          }

          // For required fields with no value, pass an error state
          const isSuccessProp: boolean =
            !disableSuccessIndicators &&
            isTouched && //! This does not allow success to appear when using autocomplete
            !!value &&
            isValid

          const isRequiredProp: {} = {
            ...(isRequired && !value ? { hasError: formError } : {}),
          }

          // * PASSWORD MATCH PROPS * //
          // Pasword error
          const passwordMatchHasError: boolean =
            hasError || passwordMatchError || (!value && formError)

          // Password is valide
          const passwordMatchIsValid: boolean = isValid && !passwordMatchError

          // Password match is successful
          const passwordMatchIsSucces: boolean =
            !disableSuccessIndicators &&
            isTouched &&
            !!value &&
            isValid &&
            !passwordMatchError

          // Handle Password specific props
          const passwordMatchProps: {} = {
            ...(checkIfPasswordMatchIsNeeded({ id })
              ? {
                  hasError: passwordMatchHasError,
                  isValid: passwordMatchIsValid,
                  isSuccess: passwordMatchIsSucces,
                }
              : {}),
          }

          const props = {
            formGroupId,
            isValid,
            isSuccess: isSuccessProp,
            onBlur: onBlurProp,
            onChange: onChangeProp,
            ...isRequiredProp,
            ...passwordMatchProps,
          }

          // * Additional Children * //
          // This will avoid using long labels for the error messages
          const messageLabel =
            !type || type === 'checkbox' || type === 'radio' ? 'Field' : label

          const newChildren = [
            !isValid ? <IsIvalidErrorMessage label={messageLabel} /> : null,

            requiredFieldError ? (
              <RequiredFieldErrorMessage label={messageLabel} />
            ) : null,
            /**
             * This assumes that the confirm password field
             * will be the last password field present
             */
            passwordMatchError && id === passwordIDs[1] ? (
              <PasswordMatchErrorMessage />
            ) : null,
          ]

          return (
            <React.Fragment key={id}>
              {React.cloneElement(el, props, ...newChildren)}
            </React.Fragment>
          )
        })}
      </div>

      <div className={bem('btn-wrapper')}>
        <button
          className={bem('submit-btn', [
            formError && !disableBtnError,
            'error',
          ])}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
