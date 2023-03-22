import * as React from 'react'

interface FormEventPropTypes<T> {
  onChange?: Function
  onClick?: Function
  onBlur?: React.FocusEventHandler<T>
}

export const formEvents = <K>({
  onChange,
  onClick,
  onBlur,
}: FormEventPropTypes<K>) => {
  const handleOnClick = (e: React.MouseEvent<K>): void =>
    onClick && onClick((e.target as K | any).value)

  const handleOnChange = (e: React.ChangeEvent<K>): void =>
    onChange && onChange((e.target as K | any).value)

  return {
    onChange: handleOnChange,
    onClick: handleOnClick,
    onBlur: onBlur,
  }
}
