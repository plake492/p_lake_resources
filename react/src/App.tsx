import * as React from 'react'
import Test from './components/TestComponents'
import TestForm from './components/TestComponents/TestForm'
import TestFormRadios from './components/TestComponents/TestFormRadios'

export default function App() {
  return (
    <div className="bg-grey-20">
      <div className="container py-xxl">
        <TestForm />
      </div>
      <div className="container py-xxl">
        <div className="bg-black-10 py-xxl">
          <TestFormRadios />
        </div>
      </div>
      {/* <div className="container py-xxl">
        <Test />
      </div> */}
    </div>
  )
}
