import * as React from 'react'

export const isClassComponent = function (component: any): boolean {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  )
}

export const isFunctionComponent = function (component: any): boolean {
  return (
    typeof component === 'function' &&
    // && !!String(component).includes('return React.createElement')  // may fails
    React.isValidElement(component())
  )
}

export const isReactComponent = function (component: any): boolean {
  return isClassComponent(component) || isFunctionComponent(component)
}

export const isElement = function (element: any): boolean {
  return React.isValidElement(element)
}

export const isDOMTypeElement = function (element: any): boolean {
  return isElement(element) && typeof element.type === 'string'
}

export const isCompositeTypeElement = function (element: any): boolean {
  return isElement(element) && typeof element.type === 'function'
}

/**
 * This function will check if a value is any type of react compoennt
 * @param value any type, but most useful for checking if somthing is a react element of some kind
 * @returns boolean
 */
export const checkForAnyTypes = function (value: any): boolean {
  return (
    isClassComponent(value) ||
    isFunctionComponent(value) ||
    isReactComponent(value) ||
    isElement(value) ||
    isDOMTypeElement(value) ||
    isCompositeTypeElement(value)
  )
}
