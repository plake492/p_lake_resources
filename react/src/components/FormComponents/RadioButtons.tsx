import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import FieldLabel from './helperComponents/FieldLabel'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'
import { formEvents } from './utils/formEvents'

const Radio = function ({
  name,
  id,
  label,
  value,
  checked,
  formGroupId,
  isDisabled,
  onChange,
  type = 'radio',
}: FormTypes.RadioPropTypes): JSX.Element {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange && onChange((e.target as HTMLInputElement).value)
          }
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
  id,
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
  children,
}: FormTypes.RadioButtonsPropTypes): JSX.Element {
  // Set up function for handling styles
  const bem: Function = useBemify('radio-buttons')

  // Get messages as needed
  const messages: JSX.Element = useFormFieldMessages({
    message,
    children,
    bem,
    forceMessageClass: true,
  })

  // Set up id with reference to form
  const radioGroupId: string = formGroupId ? `${formGroupId}__${id}` : id

  // Renaming value allows the Form wrapper to stil
  // recieve a value prop to this child component
  const checked: string | number | undefined = value

  const events = formEvents({ onChange, onClick, onBlur })

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
            name={radioGroupId}
            checked={checked}
            formGroupId={formGroupId}
            isDisabled={isDisabled}
            {...formEvents}
          />
        ))}
      </div>
      {messages}
    </fieldset>
  )
}
