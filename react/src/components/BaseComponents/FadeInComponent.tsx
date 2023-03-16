import * as React from 'react'
import { CSSTransition } from 'react-transition-group'

interface FadeInComponentTypes {
  trigger: boolean
  timeout?: number
  children: React.ReactNode
}

export default function FadeInComponent({
  trigger,
  timeout = 300,
  children,
}: FadeInComponentTypes) {
  return (
    <CSSTransition
      in={trigger}
      classNames="fade-transition"
      unmountOnExit
      timeout={timeout}
    >
      {children}
    </CSSTransition>
  )
}
