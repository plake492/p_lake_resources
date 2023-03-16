import * as React from 'react'

interface SvgSymbolTypes {
  icon: string
  classes?: string
  width?: string
  height?: string
  viewBox?: string
  fill?: string
  onClick?: React.MouseEventHandler
  path?: string
  props?: Object
}

export default function SvgSymbol({
  icon,
  fill,
  classes,
  width = '100%',
  height = '100%',
  path = './assets/images/icons.svg',
  viewBox,
  onClick,

  props,
}: SvgSymbolTypes): JSX.Element {
  return (
    <svg
      className={classes}
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
      onClick={onClick}
      {...props}
    >
      <use xlinkHref={`${path}#icons_${icon}`}></use>
    </svg>
  )
}
