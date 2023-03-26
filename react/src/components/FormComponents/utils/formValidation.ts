export interface FormValidationTypes {
  text: Function
  email: RegExp
  password: RegExp
}

export const formValidation: FormValidationTypes = {
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

  // // ? LOWERING THE REQUIREMENTS FOR EASE OF TESTING
  // password: /^(?=.*[a-z])(?=.{4,})/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,

  text: (v: string | boolean): boolean => !!v,
}
