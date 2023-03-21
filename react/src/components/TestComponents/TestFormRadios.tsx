import * as React from 'react'
import Checkbox from '../FormComponents/Checkbox'
import Form from '../FormComponents/Form'

export default function TestFormRadios() {
  const [checkbox, setCheckbox] = React.useState(false)

  return (
    <Form
      onSubmit={(e: any, success: any) =>
        console.log('e, success ==>', e, success)
      }
    >
      <Checkbox
        label="check me please"
        value={checkbox}
        id="check-box"
        onChange={(): any => setCheckbox((p) => !p)}
      />
    </Form>
  )
}
