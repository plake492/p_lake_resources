import * as React from 'react'
import { useRef, useEffect, ReactNode } from 'react'
import FadeInComponent from './FadeInComponent'
import SvgSymbol from './SvgSymbol'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useBemify } from '../../hooks/useBemify'
import { usePortal } from '../../hooks/usePortal'

interface ModalTypes {
  trigger: boolean
  setTrigger: Function
  children: ReactNode
}

export default function openModal({
  trigger,
  setTrigger,
  children,
}: ModalTypes) {
  const modalRef = useRef()

  useEffect(() => {
    if (trigger) document.body.classList.add('body-is-fixed')

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
              <div className={bem('content')} ref={modalRef}>
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
