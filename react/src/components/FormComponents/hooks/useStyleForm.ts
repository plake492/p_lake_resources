import * as React from 'react'
import { toKebabCase } from '../../../utils/helpers'

export const useStyleForm = ({ formRef, styleOptions }: any) => {
  React.useEffect((): void => {
    console.log('styleOptions ==>', styleOptions)
    if (styleOptions && formRef.current)
      Object.entries(styleOptions).forEach(([key, value]) => {
        const formatKey = toKebabCase(key)
        ;(formRef.current as any).style.setProperty(
          `--form-${formatKey}`,
          value
        )
      })
  }, [])
}
