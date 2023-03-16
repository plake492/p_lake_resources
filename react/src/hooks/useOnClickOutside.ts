import { useEffect, MutableRefObject } from 'react'

interface PropTypes {
  reference: MutableRefObject<HTMLElement>
  handler: Function
  exception?: MutableRefObject<HTMLElement> | undefined
}

export const useOnClickOutside = ({
  reference,
  handler,
  exception,
}: PropTypes) => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      // Do nothing if clicking reference's element or descendent elements
      if (
        !reference.current ||
        reference.current.contains(event.target as Node) ||
        (exception && exception.current.contains(event.target as Node))
      ) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [reference, handler, exception])
}
