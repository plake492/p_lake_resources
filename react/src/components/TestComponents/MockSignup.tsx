import * as React from 'react'
import Checkbox from '../FormComponents/Checkbox'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'

export default function MockSignup(): JSX.Element {
  const [user, setUser] = React.useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    tos: false,
  })
  return (
    <Form
      onSubmit={(_, status) =>
        status ? alert('SINGUP SUBMITTED') : alert('signup error')
      }
      colorTheme="light"
      formId="signup-form"
      noValidate
      autoComplete="on"
      formLabel="Signup form"
    >
      <Input
        type="text"
        value={user.firstName}
        onChange={(v) => setUser((prev: {}) => ({ ...prev, ['firstName']: v }))}
        label="First Name"
        id="first-name"
        isRequired
        col={6}
      />
      <Input
        type="text"
        value={user.lastName}
        onChange={(v) => setUser((prev: {}) => ({ ...prev, ['lastName']: v }))}
        label="Last Name"
        id="last-name"
        isRequired
        col={6}
      />
      <Input
        type="email"
        value={user.email}
        onChange={(v) => setUser((prev: {}) => ({ ...prev, ['email']: v }))}
        label="email"
        id="email"
        isRequired
      />
      <Input
        type="password"
        value={user.password}
        onChange={(v) => setUser((prev: {}) => ({ ...prev, ['password']: v }))}
        label="Password"
        id="password"
        isRequired
      />
      <Input
        type="password"
        value={user.passwordConfirm}
        onChange={(v) =>
          setUser((prev: {}) => ({ ...prev, ['passwordConfirm']: v }))
        }
        label="Confirm Password"
        id="confirm-password"
        isRequired
      />
      <Checkbox
        label={
          // TODO Allow custom labels and, Ensure that htmlFor is applied propery
          <label
            htmlFor="tos"
            // this id is incorect since it does not inclue the form id
          >
            Please confirm that you have read the{' '}
            <a href="#">Terms of Service</a>
          </label>
        }
        id="tos"
        isRequired
        value={user.tos}
        onChange={() =>
          setUser((prev: any) => ({ ...prev, ['tos']: !prev['tos'] }))
        }
      />
    </Form>
  )
}
