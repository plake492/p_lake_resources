import { useState, useCallback, useEffect, ReactNode } from 'react'
import { createPortal, unmountComponentAtNode } from 'react-dom'

interface PortalTypes {
  render: Function
  remove: Function
}

export const usePortal = (el?: string | undefined) => {
  const element: HTMLElement = el ? document.querySelector(el) : document.body

  const [portal, setPortal] = useState<PortalTypes>({
    render: (): void => {},
    remove: (): void => {},
  })

  const generatePortal = useCallback((el: HTMLElement) => {
    // render a portal at the given DOM node:
    const Portal = ({ children }: { children: ReactNode }) =>
      createPortal(children, el)

    // delete the portal from memory:
    const remove = () => unmountComponentAtNode(el)
    return { render: Portal, remove }
  }, [])

  useEffect(() => {
    // If there is an existing portal, remove the new instance.
    if (element) {
      portal.remove()
    }

    // Create a new portal and render it
    const newPortal = generatePortal(element)

    setPortal(newPortal)

    return () => {
      newPortal.remove()
    }
  }, [element])

  return portal.render
}
