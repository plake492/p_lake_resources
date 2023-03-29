export interface FormValidationTypes {
  text: Function
  email: RegExp
  password: RegExp
  'date-mm/dd/yyyy': RegExp
}

export const formValidation: FormValidationTypes = {
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,

  'date-mm/dd/yyyy':
    /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/,

  text: (v: string | boolean): boolean => !!v,
}
