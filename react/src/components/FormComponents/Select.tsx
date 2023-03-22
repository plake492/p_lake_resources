import * as React from 'react'
import { useBemify } from '../../hooks/useBemify'
import FieldLabel from './FieldLabel'

export default function Select({
  formGroupId,
  label,
  id,
  name,
  isBlock,
  isDisabled,
  isReadOnly,
  wrapperClasses,
  shouldHideStatus,
  hasError,
  isSuccess,
  width,
}: any) {
  const bem = useBemify('select')
  const selectId = formGroupId ? `${formGroupId}__${id}` : id

  return (
    <div
      className={bem(
        '',
        wrapperClasses,
        [isBlock, 'block'],
        [isDisabled, 'disabled'],
        [isReadOnly, 'readonly'],
        [!shouldHideStatus && hasError, 'error'],
        [!shouldHideStatus && isSuccess, 'success']
      )}
      style={{
        /* Option to set absolute width */
        ...(width ? ({ '--input-width': width } as React.CSSProperties) : {}),
      }}
    >
      <FieldLabel className={bem('label')} htmlFor={selectId}>
        {label}
      </FieldLabel>
      <div
        className={bem(
          'container',
          [isReadOnly, 'readonly'],
          [hasError, 'error']
        )}
      >
        <select className={bem('field')} id={selectId} name={name ?? id}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </div>
  )
}
