import * as React from 'react'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Checkbox from '../FormComponents/Checkbox'
import Tooltip from '../BaseComponents/Tooltip'
import Textarea from '../FormComponents/Textarea'

export default function TestForm(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)
  const [showOldPassword, setShowOldPassword] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [test, setTest] = React.useState('')
  const [counter, setCounter] = React.useState(0)
  const [checkedTwo, setCheckedTwo] = React.useState(false)
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
        disableSuccessIndicators
        formId="test-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>, success: boolean) =>
          onSubmit(event, success)
        }
      >
        <p className="h4 w-100 text-center">
          <u>A Form</u>
        </p>
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
          label="Date of Birth"
          type="text"
          id="bday"
          placeholder="04/07/1993"
          isRequired
          value={formFields.dob}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('dob', e.target.value)
          }
          validationType={(v: string): boolean =>
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
              v
            )
          }
        />
        <Input
          wrapperClasses=""
          type={showOldPassword ? 'text' : 'password'}
          label="Old Password"
          id="old-password"
          value={oldPassword}
          placeholder="**********"
          appendedIcon={`eye-${showOldPassword ? 'open' : 'closed'}`}
          appendedOnClick={() => setShowOldPassword((p) => !p)}
          isBlock
          isRequired
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOldPassword(e.target.value)
          }
        />

        <div className="border-top w-100 mt-md py-md">
          <p>Now create a new password</p>
        </div>
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
            !oldPassword && "I'm disabled because there's no Old Password",
          ]}
          isRequired
          validationType="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('password', e.target.value)
          }
          isDisabled={!oldPassword}
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

        <div className="bg-black-20 p-md border-rounded my-md">
          <p>
            We can add non form elements as well. These will simply be copied
            and passed on.
          </p>
        </div>

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
        <Input
          label="Counter"
          id="counter"
          type="number"
          placeholder="0"
          shouldValidate
          validationType={(v: string) => !!v && parseInt(v) > 88}
          value={counter || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCounter(parseInt(e.target.value))
          }
          isRequired
          message="Must be greater than 88"
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
          message={`Number of characters: ${message.length.toString()}`}
        />
        <Checkbox
          id="checkbox"
          label="Check me or else this form will not work. You don't want to check me? Well then find a different form"
          value={formFields.checked}
          onChange={() => updateFormItem('checked', !formFields.checked)}
          isRequired
        />
        <Checkbox
          id="checkbox-disabled"
          label="I'm disabled... obviously"
          isDisabled
          message="Deal with it"
        />
        <Checkbox
          id="checkbox-two"
          label={
            <div className="border border-rounded px-md py-sm bg-red-30">
              <label htmlFor="checkbox-two">
                I'm a custom label and I also need to be clicked
              </label>
            </div>
          }
          value={checkedTwo}
          onChange={() => setCheckedTwo((p) => !p)}
          isRequired
        />

        <div className="mt-xl"></div>
      </Form>
    </div>
  )
}
