import * as React from 'react'
import SvgSymbol from '../../BaseComponents/SvgSymbol'

interface SuccessIconPropTypes {
  isSuccess?: boolean
  className?: string
  icon?: string
  viewBox?: string
  width?: string
  height?: string
}

export default function SuccessIcon({
  className,
  isSuccess,
  icon = 'success',
  viewBox = '0 0 25 25',
  width = '24px',
  height = '24px',
}: SuccessIconPropTypes) {
  return isSuccess ? (
    <div className={className}>
      <SvgSymbol icon={icon} width={width} height={height} viewBox={viewBox} />
    </div>
  ) : null
}
