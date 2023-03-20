import * as React from 'react'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import Tooltip from '../BaseComponents/Tooltip'

export default function TestForm(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)
  const [showOldPassword, setShowOldPassword] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [test, setTest] = React.useState('')
  const [counter, setCounter] = React.useState(0)

  const [formFields, setFormFields] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const onSubmit = (
    _: React.FormEvent<HTMLFormElement>,
    success: boolean
  ): void => {
    alert('Form success ' + success)
  }

  const updateFormItem = (key: string, value: string | number | boolean) =>
    setFormFields((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="bg-black-30 border-rounded py-xl">
      <Form
        noValidate
        excludeFieldFromConfirmPassword="old-password"
        // wrapperClasses="bg-black-30 border-rounded pb-xl"
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
          label="Email"
          type="text"
          id="email"
          placeholder="me@mail.com"
          value={formFields.email}
          isBlock
          prependedIcon="download"
          width="75%"
          isRequired
          validationType="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormItem('email', e.target.value)
          }
          message="This field width is being set to 75%, just because"
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
        <hr className="border-bottom w-100 my-lg"></hr>
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formFields.password}
          placeholder="**********"
          appendedIcon={`eye-${showPassword ? 'open' : 'closed'}`}
          appendedOnClick={() => setShowPassword((p) => !p)}
          isBlock
          message={
            "Password should 4 characters long, it's gonna be really secure!"
          }
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
            <p className="bg-blue-30 mb-none p-md border-tl-rounded border-tr-rounded mt-md mnb-sm pb-sm">
              Custom Label
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTest(e.target.value)
          }
          appendedIcon={<p className="text-xs">I'm Appended</p>}
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
          wrapperClasses="mb-xl"
          shouldValidate
          validationType={(v: string) => !!v && parseInt(v) > 88}
          value={counter || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCounter(parseInt(e.target.value))
          }
          isRequired
          message="Must be greater than 88"
        />
      </Form>
    </div>
  )
}
