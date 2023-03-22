import * as React from 'react'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Checkbox from '../FormComponents/Checkbox'
import Tooltip from '../BaseComponents/Tooltip'
import Textarea from '../FormComponents/Textarea'
import RadioButtons from '../FormComponents/RadioButtons'
import Select from '../FormComponents/Select'

const radioGroup = [
  { id: 'value-1', label: 'red' },
  { id: 'value-2', label: 'blue' },
  { id: 'value-3', label: 'green' },
]

const radioGroupTwo = [
  { id: 'value-1', label: 'Jane' },
  { id: 'value-2', label: 'Holly' },
  { id: 'value-3', label: 'Donna' },
  { id: 'value-4', label: 'Heleen' },
  { id: 'value-5', label: 'Carol' },
]

export default function TestForm(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)
  const [test, setTest] = React.useState('')
  const [favoriteColor, setFavoriteColor] = React.useState(null)
  const [message, setMessage] = React.useState('')

  const [formFields, setFormFields] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
    addressTwo: '',
    zipcode: '',
    dob: '',
    checked: false,
  })

  const onSubmit = (
    _: React.FormEvent<HTMLFormElement>,
    success: boolean
  ): void => {
    console.log('success ==>', success)
    alert(success ? 'Form success submitted!' : 'Error on form')
  }

  const updateFormItem = (
    key: string,
    value: string | number | boolean
  ): void => setFormFields((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="bg-black-30 border-rounded py-xl">
      <Form
        noValidate
        excludeFieldFromConfirmPassword="old-password"
        formId="test-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>, success: boolean) =>
          onSubmit(event, success)
        }
        formLabel="FORM TIME"
      >
        <Select label="Pick a car" isRequired></Select>
        <Input
          label="First Name"
          type="text"
          id="first-name"
          placeholder="John"
          value={formFields.firstName}
          isRequired
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('firstName', e.target.value)
          }
        />
        <Input
          label="Last Name"
          type="text"
          id="last-name"
          placeholder="Snow"
          value={formFields.lastName}
          isRequired
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('lastName', e.target.value)
          }
        />
        <Input
          label="Address"
          type="text"
          id="address"
          placeholder="1234 Park Place"
          value={formFields.address}
          isRequired
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('address', e.target.value)
          }
        />
        <Input
          label="Address Line 2"
          type="text"
          id="address-line2"
          placeholder="APT 2"
          value={formFields.addressTwo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('addressTwo', e.target.value)
          }
        />
        <Input
          label="Postal Code"
          type="text"
          id="postal-code"
          placeholder="12345"
          isRequired
          value={formFields.zipcode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('zipcode', e.target.value)
          }
          validationType={(v: string) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(v)}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formFields.password}
          placeholder="**********"
          appendedIcon={`eye-${showPassword ? 'open' : 'closed'}`}
          appendedOnClick={() => setShowPassword((p) => !p)}
          isBlock
          message={[
            "Password should 4 characters long, it's gonna be really secure!",
          ]}
          isRequired
          validationType="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('password', e.target.value)
          }
        />
        <Input
          label="Confirm Password"
          type={showPasswordConfirm ? 'text' : 'password'}
          id="confirm-password"
          value={formFields.passwordConfirm}
          placeholder="**********"
          appendedIcon={`eye-${showPasswordConfirm ? 'open' : 'closed'}`}
          appendedOnClick={() => setShowPasswordConfirm((p) => !p)}
          isBlock
          isRequired
          validationType="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('passwordConfirm', e.target.value)
          }
        />

        <Input
          type="text"
          id="test"
          placeholder="Some Text Here"
          value={test}
          isBlock
          prependedIcon={
            <Tooltip bgColor="bg-black-20">
              <p className="text-sm">Some info about what this is</p>
            </Tooltip>
          }
          label={
            <p className="bg-blue-30 mb-none p-md border-tl-rounded border-tr-rounded mt-md mnb-sm pb-sm text-xs">
              Custom Label
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTest(e.target.value)
          }
          appendedIcon={<p className="text-xs mb-none">I'm Appended</p>}
          shouldValidate
          validationType={(v: string) => v === 'TEST'}
          message={[
            `This inputs validation is set to 'value === "TEST"'`,
            'This input is not required, but will be validated if there is an input',
          ]}
        />

        <Textarea
          label="Big Text"
          id="text-area"
          placeholder="A Message"
          shouldValidate
          validationType={(v: string) => v.length > 100}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          isRequired
          isBlock
          message={[
            'Must container at least 100 characters',
            `Number of characters: ${message.length.toString()}`,
          ]}
        />
        <RadioButtons
          label="Select your Michal Scott GF"
          options={radioGroupTwo}
          id="gf"
          isDisabled={true}
        />
        <RadioButtons
          label="Select your favorite color"
          value={favoriteColor}
          onChange={(e: any) => setFavoriteColor(e.target.value)}
          options={radioGroup}
          isRequired
          id="favorite-color"
        />
        <Checkbox
          id="checkbox"
          label="Check me or else this form will not work. You don't want to check me? Well then find a different form"
          value={formFields.checked}
          onChange={() => updateFormItem('checked', !formFields.checked)}
          isRequired
        />

        <div className="mt-xl"></div>
      </Form>
    </div>
  )
}
