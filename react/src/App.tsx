import * as React from 'react'
import Test from './components/TestComponents'
import TestForm from './components/TestComponents/TestForm'

export default function App() {
  return (
    <div className="bg-grey-20">
      <div className="container py-xxl">
        <TestForm />
      </div>
      <div className="container py-xxl">
        <Test />
      </div>
    </div>
  )
}
