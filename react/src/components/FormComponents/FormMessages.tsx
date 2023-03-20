import * as React from 'react'
import { checkIfAnyReactComponentType } from '../../utils/detectReactComponents'
import SvgSymbol from '../BaseComponents/SvgSymbol'

const MessageWrapper = function ({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="d-flex gap-sm align-items-center justify-content-end"
      style={{ color: 'var(--bg-red-30)' }}
    >
      <SvgSymbol icon="error" width="16" height="16" viewBox="0 0 25 25" />
      {children}
    </span>
  )
}

export const IsIvalidErrorMessage = function ({
  label,
}: {
  label: string | JSX.Element
}): JSX.Element {
  return (
    <MessageWrapper>
      <p className="text-xs" style={{ color: 'var(--bg-red-30)' }}>
        <i>
          {checkIfAnyReactComponentType(label)
            ? 'Invalid input'
            : `${label} is invalid`}
        </i>
      </p>
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
      <p className="text-xs" style={{ color: 'var(--bg-red-30)' }}>
        <i>
          {checkIfAnyReactComponentType(label)
            ? 'Field is required '
            : `${label} is required`}
        </i>
      </p>
    </MessageWrapper>
  )
}

export const PasswordMatchErrorMessage = function () {
  return (
    <MessageWrapper>
      <p className="text-xs" style={{ color: 'var(--bg-red-30)' }}>
        <i>Passwords do not match</i>
      </p>
    </MessageWrapper>
  )
}
