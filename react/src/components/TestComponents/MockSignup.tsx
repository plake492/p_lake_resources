import * as React from 'react'
import Checkbox from '../FormComponents/Checkbox'
import DatePicker from '../FormComponents/DatePicker'
import Form from '../FormComponents/Form'
import Input from '../FormComponents/Input'
import RadioButtons from '../FormComponents/RadioButtons'
import Select from '../FormComponents/Select'

export default function MockSignup(): JSX.Element {
  const formStyles = {
    shadowColor: 'grey',
    fieldBackgroundColor: 'blueviolet',
    fieldTextColor: 'darkblue',
    fieldPlaceholderTextColor: 'cornflower',
    fieldBorderColor: 'indego',
    fieldBorderColorFocus: 'orange',
    labelTextColor: 'lime',
    errorColor: 'red',
    successColor: 'orange',
  }

  const [user, setUser] = React.useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    address: '',
    addressTwo: '',
    zipcode: '',
    dob: '',
    gender: '',
    food: '',
    tos: false,
  })

  return (
    <div className="row p-xxl escape-container">
      <div
        className="col-4 px-lg py-xxl bg-violet-10 border-pill position-sticky h-100"
        style={{ top: 16 }}
      >
        <>
          {`{`}
          {Object.entries(user).map(([key, value]) => (
            <p
              className=" text-md pl-md mb-sm"
              key={key}
            >{`${key}: "${value}",`}</p>
          ))}
          {`}`}
        </>
      </div>

      <div className="col-8">
        <Form
          onSubmit={(_, status) =>
            status ? alert('SINGUP SUBMITTED') : alert('signup error')
          }
          formId="signup-form"
          noValidate
          autoComplete="on"
          formLabel="Signup form"
        >
          <Input
            type="text"
            value={user.firstName}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['firstName']: v }))
            }
            label="First Name"
            id="first-name"
            isRequired
            col={6}
          />
          <Input
            type="text"
            value={user.lastName}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['lastName']: v }))
            }
            label="Last Name"
            id="last-name"
            isRequired
            col={6}
            styleConfig={formStyles}
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
            type="tel"
            value={user.phone}
            onChange={(v) => setUser((prev: {}) => ({ ...prev, ['phone']: v }))}
            label="phone"
            id="phone"
            shouldValidate
            validationType={(v: string) =>
              /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(v)
            }
          />
          <Input
            label="Address"
            type="text"
            id="address"
            placeholder="1234 Park Place"
            value={user.address}
            isRequired
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['address']: v }))
            }
            message={'This would be an address'}
          />
          <Input
            label="Address Line 2"
            type="text"
            id="address-line-two"
            placeholder="APT 2"
            value={user.addressTwo}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['addressTwo']: v }))
            }
            col={6}
          />
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            placeholder="12345"
            isRequired
            value={user.zipcode}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['zipcode']: v }))
            }
            validationType={(v: string) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(v)}
            col={6}
            autocomplete="on"
          />
          <DatePicker
            startDate={new Date('01/01/1990')}
            label="Date of birth"
            id="dob"
            onChange={(v) => setUser((prev: {}) => ({ ...prev, ['dob']: v }))}
            value={user.dob}
            isRequired
            autocomplete="on"
            placeholder="04/04/1992"
            col={6}
            monthAndYearAreSelectable
          />
          <Select
            label="Gender"
            id="gender"
            value={user.gender}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['gender']: v }))
            }
            options={[
              { label: 'Male' },
              { label: 'Female' },
              { label: 'other' },
            ]}
            col={6}
            isRequired
          />
          <Input
            type="password"
            value={user.password}
            onChange={(v) =>
              setUser((prev: {}) => ({ ...prev, ['password']: v }))
            }
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
          <RadioButtons
            label="What is your favorite food?"
            id="food"
            options={[
              { id: 'food1', label: 'Steak', value: 'steak' },
              { id: 'food2', label: 'Lobster', value: 'lobster' },
              { id: 'food3', label: 'Sushi', value: 'sushi' },
            ]}
            onChange={(v: string) =>
              setUser((prev: {}) => ({ ...prev, ['food']: v }))
            }
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
      </div>
    </div>
  )
}
