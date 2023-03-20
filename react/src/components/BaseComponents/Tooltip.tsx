import * as React from 'react'
import SvgSymbol from './SvgSymbol'
import FadeInComponent from './FadeInComponent'
import { checkIfAnyReactComponentType } from '../../utils/detectReactComponents'

interface TooltipPropTypes {
  children: React.ReactNode
  triggerElement?: React.ReactNode | undefined
  removeSecondaryIcon?: boolean
  secondaryIcon?: React.ReactNode | string
  position?: string
  bgColor?: string
  iconClasses?: string
}

export default function Tooltip({
  children,
  triggerElement,
  removeSecondaryIcon,
  secondaryIcon = 'info',
  position = 'left-100 bottom-100',
  bgColor = 'bg-white',
  iconClasses = 'vertical-top d-flex justify-content-start',
}: TooltipPropTypes) {
  const [showTooltip, setShowTooltip] = React.useState(false)

  const hoverEvents = {
    onMouseEnter: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false),
  }

  const triggerEl: React.ReactNode = checkIfAnyReactComponentType(
    triggerElement
  ) ? (
    triggerElement
  ) : (
    <SvgSymbol width="16" height="16" icon="info" classes="c-pointer" />
  )

  return (
    <span className={`position-relative ${iconClasses}`} {...hoverEvents}>
      {triggerEl}
      <FadeInComponent trigger={showTooltip} timeout={200}>
        <div className={`position-absolute ${position} ml-sm`}>
          <div
            style={{ width: 300 }}
            className={`tooltip ${bgColor} box-shadow border-rounded p-md d-flex align-items-start justify-content-space-between`}
          >
            <>
              {!removeSecondaryIcon ? (
                checkIfAnyReactComponentType(secondaryIcon) ? (
                  secondaryIcon
                ) : (
                  <SvgSymbol
                    classes="tooltip--icon w-33 mr-sm"
                    width="24"
                    height="24"
                    icon={secondaryIcon as string}
                  />
                )
              ) : null}
              {children}
            </>
          </div>
        </div>
      </FadeInComponent>
    </span>
  )
}
