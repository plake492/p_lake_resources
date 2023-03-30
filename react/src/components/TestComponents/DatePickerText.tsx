import * as React from 'react'
import DatePicker from '../FormComponents/DatePicker'
import Form from '../FormComponents/Form'

export default function DatePickerText() {
  const [date, setDate] = React.useState<string>(null)
  const [date2, setDate2] = React.useState<string>(null)

  return (
    <div>
      <Form
        formId="date"
        onSubmit={(_, isValid) => {
          alert(isValid ? date : 'INVALID')
        }}
        noValidate
      >
        <DatePicker
          label="date"
          id="date"
          appendedIcon="download"
          value={date}
          onChange={(v: string) => setDate(v)}
          validationType="date-mm/dd/yyyy"
          shouldValidate
          isRequired
          col={9}
          breakpoint="xl"
          showTwoMonths
          message="A message"
          placeholder="04/04/1992"
        />
      </Form>
      <div className="my-xl"></div>
      <Form
        formId="date"
        onSubmit={() => {
          alert(date2)
        }}
        noValidate
      >
        <DatePicker
          label="date"
          id="date"
          appendedIcon="download"
          value={date2}
          onChange={(v: string) => setDate2(v)}
          validationType="date-mm/dd/yyyy"
          shouldValidate
          isRequired
          col={6}
        />
      </Form>
    </div>
  )
}
