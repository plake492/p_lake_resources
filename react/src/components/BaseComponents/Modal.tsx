import * as React from 'react'
import FadeInComponent from './FadeInComponent'
import SvgSymbol from './SvgSymbol'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useBemify } from '../../hooks/useBemify'
import { usePortal } from '../../hooks/usePortal'

interface ModalPropTypes {
  trigger: boolean
  setTrigger: Function
  wrapperClasses?: string
  children: React.ReactNode
}

export default function openModal({
  trigger,
  setTrigger,
  wrapperClasses,
  children,
}: ModalPropTypes) {
  // Create a ref for tracking onClickOutside
  const modalRef = React.useRef()

  React.useEffect(() => {
    // TODO Move this class addition to a style addition
    if (trigger) {
      document.body.classList.add('body-is-fixed')
    }
    return () => document.body.classList.remove('body-is-fixed')
  }, [trigger])

  useOnClickOutside({
    reference: modalRef,
    handler: setTrigger,
  })

  const Portal = usePortal()

  const bem = useBemify('modal')
  return (
    <>
      <FadeInComponent trigger={trigger}>
        <Portal>
          <div className={bem('backdrop')}></div>
        </Portal>
      </FadeInComponent>
      <FadeInComponent trigger={trigger}>
        <Portal>
          <div className={bem()}>
            <div className={bem('wrapper')}>
              <div className={bem('content', wrapperClasses)} ref={modalRef}>
                <div
                  className={bem('close-btn')}
                  onClick={() => setTrigger(false)}
                >
                  <SvgSymbol
                    icon="modal-close-dark"
                    width="40px"
                    height="40px"
                    viewBox="0 0 60 60"
                    onClick={() => setTrigger(false)}
                  />
                </div>
                {children}
              </div>
            </div>
          </div>
        </Portal>
      </FadeInComponent>
    </>
  )
}
