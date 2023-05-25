import * as React from 'react'
import { toKebabCase } from '../../../utils/helpers'

export const useStyleForm = ({
  formRef,
  styleOptions,
}: {
  formRef: React.MutableRefObject<HTMLFormElement>
  styleOptions: { [key: string]: string } // TODO create style obj type
}) => {
  React.useEffect((): void => {
    if (styleOptions && formRef.current)
      Object.entries(styleOptions).forEach(
        ([key, value]: [string, string]): void => {
          const formatKey = toKebabCase(key)
          ;(formRef.current as HTMLFormElement).style.setProperty(
            `--form-${formatKey}`,
            value
          )
        }
      )
  }, [])
}
