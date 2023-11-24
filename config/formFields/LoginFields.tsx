import * as yup from 'yup'
import TEXT from '../Text'

export const EmailLoginFields: FormFields[] = [
  {
    name: 'email',
    yupSchema: yup
      .string()
      .email(TEXT.YUP_EMAIL)
      .max(255)
      .required(TEXT.YUP_REQUIRED),
    // defaultValue: "",
    defaultValue: '',
  },
  {
    name: 'password',
    yupSchema: yup.string().required(TEXT.YUP_REQUIRED),
    // defaultValue: "",
    defaultValue: '',
  },
]

// Usage example:
// console.log(productFormFields);
