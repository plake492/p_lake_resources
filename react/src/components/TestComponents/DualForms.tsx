import * as React from 'react'
import Checkbox from '../FormComponents/Checkbox'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import RadioButtons from '../FormComponents/RadioButtons'
import Select from '../FormComponents/Select'

export default function DualForms() {
  return (
    <div className="row">
      <div className="col-3 bg-black py-xxxl px-xl">
        <Form
          onSubmit={(e: any, valid: boolean) => console.log('Form 1')}
          noValidate
          formId="fun-form"
          colorTheme="dark"
        >
          <Select
            label="Select This"
            id="select-this"
            options={[
              { label: 'Pick one', isPlaceholder: true },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
              { label: 'One' },
              { label: 'Two' },
            ]}
          />
          <RadioButtons
            label="radios"
            id="radios"
            options={[
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
              { id: '1', label: 'one' },
              { id: '2', label: 'two' },
            ]}
          />
        </Form>
      </div>
      <div className="col-9 bg-red-80 py-xxxl flex-center">
        <Form
          onSubmit={(e: any, valid: boolean) => console.log('Form TWO')}
          noValidate
          formId="fun-form"
          colorTheme="light"
          colGap="xxxl"
          rowGap="md"
        >
          <Select
            label="Select This"
            id="select-this"
            options={[
              { label: 'Pick one', isPlaceholder: true },
              { label: 'One' },
              { label: 'Two' },
            ]}
            col={6}
          />
          <Input
            label="Testing"
            id="testing"
            type="text"
            col={6}
            message={'What is this?'}
          />
          <RadioButtons
            label="radios"
            id="radios"
            value={null}
            options={[
              { id: '1', label: '1' },
              { id: '2', label: '2' },
            ]}
          />
          <Checkbox label={<p>A Label</p>} id="Hello" />
        </Form>
      </div>
    </div>
  )
}
