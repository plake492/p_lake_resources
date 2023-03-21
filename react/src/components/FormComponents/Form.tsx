import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import { isDOMTypeElement } from '../../utils/detectReactComponents'
import {
  IsIvalidErrorMessage,
  PasswordMatchErrorMessage,
  RequiredFieldErrorMessage,
} from './FormMessages'

import { useConfirmPasswordMatch } from './hooks/useConfirmPasswordMatch'
import { useFormFieldsValidation } from './hooks/useFormFieldsValidation'
import { InputPropTypes } from './Input'
import { validFormComponentChildren } from './utils/validFormComponentChildren'

interface FormPropTypes {
  /**
   *
   * A group of form elements
   * @TODO Create TextArea, Select, Option, Radio
   */
  children: React.ReactElement[]
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

export default function Form({
  children,
  onSubmit,
  noValidate,
  excludeFieldFromConfirmPassword,
  wrapperClasses,
  disableBtnError,
  disableSuccessIndicators,
  formId,
  autoComplete = 'off',
}: FormPropTypes): JSX.Element {
  // * CUSTOM HOOKS * //

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

  const bem = useBemify('form')

  const [formError, setFormError] = React.useState<boolean>(false)
  const [formSubmissionAttempted, setFormSubmitionAttemp] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    if (formError) {
      setFormError(
        missingRequiredValue || containesValidationError || passwordMatchError
      )
    }
  }, [containesValidationError, passwordMatchError])

  const reactId = React.useId()
  const formGroupId = formId ? formId + reactId : reactId

  /**
   * Validate the child prop requiremnts.
   * Run the onSubmit function prop
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setFormSubmitionAttemp(true)

    const formIsInvalid =
      missingRequiredValue || containesValidationError || passwordMatchError

    setFormError(formIsInvalid)

    onSubmit(event, !formIsInvalid)
  }

  return (
    <form
      className={bem('', wrapperClasses)}
      onSubmit={handleSubmit}
      noValidate={noValidate}
      id={formGroupId}
      autoComplete={autoComplete}
    >
      <>
        {children.map((el: JSX.Element, index: number) => {
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
          if (isRequired || shouldValidate) {
            updateRequiredFieldValue({ id, value })
          }

          const isValid = checkFieldValidation({
            id,
            value,
            validationType,
            isTouched,
            shouldValidate,
            isRequired,
          })

          const handleOnBlur = () => {
            setIsTouched(true)

            if (checkIfPasswordMatchIsNeeded({ id })) {
              handlePasswordMatchOnBlur({ id, value })
            }
          }

          const requiredFieldError: boolean =
            formSubmissionAttempted &&
            isRequired &&
            !!formItemValues[id] &&
            !formItemValues[id].value

          const props = {
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
              e.stopPropagation()
              handleOnBlur()
              onBlur && onBlur(e)
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (checkIfPasswordMatchIsNeeded({ id })) {
                handlePasswordsMatch({ id, value: e.target.value })
              }
              onChange && onChange(e)
            },
            isSuccess:
              !disableSuccessIndicators && isTouched && value && isValid,
            formGroupId,
            // For required fields with no value, pass an error state
            ...(isRequired && !value ? { hasError: formError } : {}),
            // Handle Password specific props
            ...(checkIfPasswordMatchIsNeeded({ id })
              ? {
                  hasError:
                    hasError || passwordMatchError || (!value && formError),
                  isValid: isValid && !passwordMatchError,
                  isSuccess:
                    !disableSuccessIndicators &&
                    isTouched &&
                    value &&
                    isValid &&
                    !passwordMatchError,
                }
              : { isValid }),
          }

          const messageLabel = !type ? 'Field' : label

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
      </>
    </form>
  )
}
