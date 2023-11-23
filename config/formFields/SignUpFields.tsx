import * as yup from 'yup'
import TEXT from '../Text'

export const SignUpFields: FormFields[] = [
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
    yupSchema: yup.string().min(8, TEXT.YUP_MIN_8).required(TEXT.YUP_REQUIRED),
    // defaultValue: "",
    defaultValue: '',
  },
  {
    name: 'confirm_password',
    yupSchema: yup
      .string()
      .oneOf([yup.ref('password'), ''], TEXT.YUP_PASSWORD_MISMATCH)
      .min(8, TEXT.YUP_MIN_8)
      .max(128, TEXT.YUP_MAX_128)
      .required(TEXT.YUP_REQUIRED),
    // defaultValue: "",
    defaultValue: '',
  },
]

// Usage example:
// console.log(productFormFields);
