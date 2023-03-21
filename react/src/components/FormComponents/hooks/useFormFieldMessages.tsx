import * as React from 'react'
import FadeInComponent from '../../BaseComponents/FadeInComponent'
import { checkIfAnyReactComponentType } from '../../../utils/detectReactComponents'

interface PropTypes {
  bem: Function
  children: React.ReactElement
  message?: string | JSX.Element | string[]
  forceMessageClass?: boolean
}

export const useFormFieldMessages = ({
  message,
  children,
  bem,
  forceMessageClass,
}: PropTypes): JSX.Element => {
  const hasValidChildren =
    Array.isArray(children) && children.some((child) => !!child)

  const [showChildMessage, setShowChildMessage] = React.useState(false)

  React.useEffect(
    () => setShowChildMessage(hasValidChildren),
    [hasValidChildren]
  )

  return !!message || hasValidChildren ? (
    <div
      className={
        !checkIfAnyReactComponentType(message) || forceMessageClass
          ? bem('message')
          : null
      }
    >
      {message && checkIfAnyReactComponentType(message) ? (
        message
      ) : Array.isArray(message) ? (
        message.map((text, index) => <div key={text + index}>{text}</div>)
      ) : (
        <span>{message}</span>
      )}
      <FadeInComponent trigger={showChildMessage}>
        <span>{children}</span>
      </FadeInComponent>
    </div>
  ) : null
}
