export interface formValidationTypes {
  text: Function
  email: RegExp
  password: RegExp
}

export const formValidation: formValidationTypes = {
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

  password: /^(?=.*[a-z])(?=.{4,})/,
  // password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,

  text: (v: string): boolean => !!v,
}
