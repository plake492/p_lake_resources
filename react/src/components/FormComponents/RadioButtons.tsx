import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import FieldLabel from './FieldLabel'
import { useFormFieldMessages } from './hooks/useFormFieldMessages'

const Radio = function ({
  name,
  id,
  label,
  value,
  checked,
  formGroupId,
  isDisabled,
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
  onChange,
  options,
  id,
  value,
  label,
  isRequired,
  isDisabled,
  isSuccess,
  hasError,
  shouldHideStatus,
  message,
  children,
  isVertical,
  formGroupId,
}: FormTypes.RadioButtonsPropTypes): JSX.Element {
  const bem = useBemify('radio-buttons')

  const checked: string | number | undefined = value
  const name: string = id

  const messages = useFormFieldMessages({
    message,
    children,
    bem,
    forceMessageClass: true,
  })

  return (
    <div
      className={bem(
        '',
        [!shouldHideStatus && hasError, 'error'],
        [isDisabled, 'disabled'],
        [isSuccess, 'success']
      )}
    >
      <div className={bem('label')}>
        <FieldLabel isRequired={isRequired} el="p">
          {label}
        </FieldLabel>
      </div>
      {messages}
      <div
        onChange={onChange}
        className={bem('radios', [isVertical, '--vertical'])}
      >
        {options.map(({ id, label, value }: any) => (
          <Radio
            key={id}
            id={id}
            label={label}
            value={value}
            name={name}
            checked={checked}
            formGroupId={formGroupId}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  )
}
