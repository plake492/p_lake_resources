import * as React from 'react'
import Input from './components/FormComponents/Input'

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [text, setText] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('There is an error')
    setSuccess('Succses')
  }

  return (
    <div className="bg-grey-20">
      <div className="container py-xxl">
        <form onSubmit={onSubmit} className="form-container">
          <Input
            type="text"
            label="First Name"
            id="first-name"
            placeholder="John"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            hasError={!!error}
            message={error}
          />
          <Input
            type="text"
            label="Last Name"
            id="last-name"
            placeholder="Snow"
            isSuccess={!!success}
            message={success}
          />
          <Input
            type="text"
            label="Email"
            id="email"
            placeholder="me@mail.com"
            isBlock
            prependedIcon="download"
            width="75%"
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            id="password"
            placeholder="**********"
            appendedIcon={`eye-${showPassword ? 'open' : 'closed'}`}
            appendedOnClick={() => setShowPassword((p) => !p)}
            isBlock
            message={'Password should super cool'}
          />
          <Input
            type="password"
            label="Confirm Password"
            id="confirm-password"
            placeholder="**********"
            appendedIcon="eye-closed"
            wrapperClasses="mb-xl"
            isBlock
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
