import * as React from 'react'
import { checkIfAnyReactComponentType } from '../../../utils/detectReactComponents'
import { forceArray } from '../../../utils/helpers'

export default function FieldLabel(props: { [key: string]: any }) {
  // Remove any non DOM attributes from the props before spreading
  const { children, el, isRequired, ...rest } = props

  const Component: keyof JSX.IntrinsicElements = el ?? 'label'

  const childrenAsArray: any[] = forceArray(children)

  return (
    <>
      {childrenAsArray.map(
        (child: string | React.ReactElement, index: number): JSX.Element => (
          <React.Fragment key={index}>
            {checkIfAnyReactComponentType(child) ? (
              child
            ) : (
              <Component {...rest}>
                {!!child && isRequired ? <span>*</span> : null}
                {child}
              </Component>
            )}
          </React.Fragment>
        )
      )}
    </>
  )
}
