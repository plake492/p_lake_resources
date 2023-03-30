import * as React from 'react'
import DatePickerText from './components/TestComponents/DatePickerText'
import DualForms from './components/TestComponents/DualForms'
import MockSignup from './components/TestComponents/MockSignup'

import TestForm from './components/TestComponents/TestForm'

export default function App() {
  return (
    <main>
      <div className="bg-grey-20">
        <div className="container py-xxl">
          <TestForm />
        </div>
      </div>
      {/* <div className="bg-white">
        <div className="container py-xxl">
          <MockSignup />
        </div>
      </div> */}
      {/* <div>
        <DualForms />
      </div> */}
      <div className="container py-xxxl">
        <DatePickerText />
      </div>
    </main>
  )
}
