import * as React from 'react'
import { checkIfAnyReactComponentType } from '../../../utils/detectReactComponents'
import SvgSymbol from '../../BaseComponents/SvgSymbol'

const MessageWrapper = function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="status-message error">
      <SvgSymbol icon="error" width="16" height="16" viewBox="0 0 25 25" />
      {children}
    </div>
  )
}

export const IsIvalidErrorMessage = function ({
  label,
}: {
  label: string | JSX.Element
}): JSX.Element {
  return (
    <MessageWrapper>
      <i>
        {checkIfAnyReactComponentType(label)
          ? 'Invalid input'
          : `${label} is invalid`}
      </i>
    </MessageWrapper>
  )
}

export const RequiredFieldErrorMessage = function ({
  label,
}: {
  label: string | JSX.Element
}): JSX.Element {
  return (
    <MessageWrapper>
      <i>
        {checkIfAnyReactComponentType(label)
          ? 'Field is required '
          : `${label} is required`}
      </i>
    </MessageWrapper>
  )
}

export const PasswordMatchErrorMessage = function () {
  return (
    <MessageWrapper>
      <i>Passwords do not match</i>
    </MessageWrapper>
  )
}
