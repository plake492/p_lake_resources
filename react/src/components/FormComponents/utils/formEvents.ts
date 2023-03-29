import * as React from 'react'

export type HTMLFormEventElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

interface FormEventPropTypes<T> {
  onChange: (v: string | number | boolean, e?: React.ChangeEvent) => void
  onClick: (v: string | number | boolean, e?: React.MouseEvent) => void
  onBlur: React.FocusEventHandler<T>
}

export const formEvents = <T extends HTMLFormEventElements>({
  onChange,
  onClick,
  onBlur,
}: FormEventPropTypes<T>) => {
  const handleOnClick = (event: React.MouseEvent<T>): void =>
    onClick && onClick((event.target as T).value, event)

  const handleOnChange = (event: React.ChangeEvent<T>): void =>
    onChange && onChange((event.target as T).value, event)

  return {
    onChange: handleOnChange,
    onClick: handleOnClick,
    onBlur,
  }
}
