import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import FieldLabel from './helperComponents/FieldLabel'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'
import { RadioButtonsPropTypes, RadioPropTypes } from './types'
import SuccessIcon from './helperComponents/SuccessIcon'

const Radio = function ({
  name,
  id,
  label,
  value,
  checked,
  formGroupId,
  isDisabled,
  events,
  type = 'radio',
}: RadioPropTypes): JSX.Element {
  // If no value is provided, the label will also be the value
  const radioValue: string | number = value ?? label

  const radioButtonId: string = formGroupId ? `${formGroupId}__${id}` : id

  const bem = useBemify('radio')

  return (
    <div className={bem('')}>
      <div className={bem('field-wrapper')}>
        <input
          className={bem('field')}
          type={type}
          id={radioButtonId}
          name={name}
          value={radioValue}
          defaultChecked={checked === radioValue}
          disabled={isDisabled}
          {...events}
        />
        <div className={bem('circle')}></div>
      </div>
      <label className={bem('label')} htmlFor={radioButtonId}>
        {label}
      </label>
    </div>
  )
}

export default function RadioButtons({
  label,
  value,
  options,
  wrapperClasses,
  formGroupId,
  message,
  isRequired,
  isDisabled,
  isSuccess,
  isReadOnly,
  hasError,
  shouldHideStatus,
  isVertical,
  onChange,
  onClick,
  onBlur,
  fieldId,
  styles,
  children,
}: RadioButtonsPropTypes): JSX.Element {
  // Set up function for handling styles
  const bem: Function = useBemify('radio-buttons')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({
    message,
    children,
    bem,
    forceMessageClass: true,
  })

  // Renaming value allows the Form wrapper to stil
  // recieve a value prop to this child component
  const checked: string | number | undefined = value

  const events = formEvents<HTMLInputElement>({
    onChange,
    onClick,
    onBlur,
  })

  return (
    <fieldset
      className={bem(
        '',
        wrapperClasses,
        [isDisabled, 'disabled'],
        [isSuccess, 'success'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && hasError, 'error']
      )}
      style={{
        ...(!!styles ? (styles as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel className={bem('label')} isRequired={isRequired} el="legend">
        {label}
      </FieldLabel>
      <div className={bem('radios', [isVertical, '--vertical'])}>
        {options.map(({ id, label, value }: any) => (
          <Radio
            key={id}
            id={id}
            label={label}
            value={value}
            name={fieldId}
            checked={checked}
            formGroupId={formGroupId}
            isDisabled={isDisabled}
            events={events}
          />
        ))}
      </div>
      <div className={bem('message-wrapper')}>
        <SuccessIcon className={bem('success')} isSuccess={isSuccess} />
        {messages}
      </div>
    </fieldset>
  )
}
