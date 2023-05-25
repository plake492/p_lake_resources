import * as React from 'react'
import DatePickerText from './components/TestComponents/DatePickerText'
import DualForms from './components/TestComponents/DualForms'
import MockSignup from './components/TestComponents/MockSignup'

import TestForm from './components/TestComponents/TestForm'
import EventForm from './components/TestComponents/EventForm'

export default function App() {
  return (
    <main>
      {/* <div className="bg-grey-20">
        <div className="container py-xxl">
          <TestForm />
        </div>
      </div> */}
      <div className="bg-black">
        <div className="container py-xxl">
          <MockSignup />
        </div>
      </div>
      {/* <div>
        <DualForms />
      </div> */}
      {/* <div className="container py-xxxl">
        <DatePickerText />
      </div> */}
      <div className="bg-purple-10">
        <div className="container py-xxxl">
          <EventForm />
        </div>
      </div>
    </main>
  )
}
