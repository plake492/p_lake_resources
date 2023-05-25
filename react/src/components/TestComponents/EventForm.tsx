import * as React from 'react'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import DatePicker from '../FormComponents/DatePicker'
import RadioButtons from '../FormComponents/RadioButtons'

const eventType = [
  { label: 'Kids', value: 'kids', id: 'kids' },
  { label: 'Adults', value: 'adults', id: 'adults' },
  { label: 'Family', value: 'family', id: 'family' },
]

const eventInitValue = {
  title: '',
  date: '',
  time: '',
  type: '',
}

export default function EventForm() {
  const [event, setEvent] = React.useState(eventInitValue)

  const [events, setEvetns] = React.useState<{}[]>([])

  const updateEvent = (v: string | number | boolean, prop: string) => {
    setEvent((e: any) => ({ ...e, [prop]: v }))
  }

  return (
    <>
      <Form
        formId="event"
        onSubmit={(_: any, isValid: boolean) => {
          isValid && setEvetns((prev) => [...prev, event])
          setEvent(eventInitValue)
        }}
        styleOptions={{
          fieldBorderRadius: '8px',
          fieldPlaceholderTextColor: '#eee',
        }}
        rowGap="sm"
      >
        <Input
          hideLabel
          label="Event title"
          placeholder="Event Title"
          id="event-title"
          type="text"
          isRequired
          value={event.title}
          onChange={(v: string) => updateEvent(v, 'title')}
        />
        <DatePicker
          hideLabel
          label="Event Date"
          placeholder="Event Date"
          id="event-date"
          isRequired
          value={event.date}
          onChange={(v: string) => updateEvent(v, 'date')}
          col={6}
        />
        <Input
          hideLabel
          label="Event Time"
          placeholder="Event Time"
          id="event-time"
          type="text"
          isRequired
          value={event.time}
          onChange={(v: string) => updateEvent(v, 'time')}
          col={6}
          validationType={(v: string) =>
            /^([0-1]?[0-9]|2[0-3]):([0-5][0-9][AaPp][Mm])$/.test(v)
          }
        />
        <RadioButtons
          label="Event Type"
          id="event-type"
          options={eventType}
          onChange={(v: string) => updateEvent(v, 'type')}
        />
      </Form>
      {events.length ? (
        <div className="py-xxxl">
          {events.map((event: any) => (
            <div key={event.title}>
              <p>{event.title}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
