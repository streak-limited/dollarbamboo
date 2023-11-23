'use client'
import { FC, ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'

type RhfTextFieldProps = {
  label?: string | ReactNode
  name: string
  type?: string
  defaultValue?: string
  isDigitLimited?: number
  isUppercase?: boolean
  rules?: any
  props?: any
  inputClass?: string
  divClass?: string
  labelClass?: string
  placeHolder?: string
  rows: number
  // showPasswordIcon?: boolean;
}

const RhfTextArea: FC<RhfTextFieldProps> = ({
  label,
  name,
  type,
  defaultValue,
  isDigitLimited,
  isUppercase,
  rules,
  props,
  inputClass,
  labelClass,
  divClass,
  placeHolder,
  rows,
  // showPasswordIcon = false,
  ...rest
}) => {
  const { control } = useFormContext()

  // Add a state to toggle password visibility
  //   const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={`${divClass} `}>
          <label htmlFor={name} className={`${labelClass} `}>
            {label}
          </label>
          <div className="relative">
            <textarea
              {...field}
              {...rest}
              {...props}
              id={name}
              name={name}
              rows={rows}
              col="100"
              // type={type}
              onChange={(e) => {
                let newValue = e.target.value
                if (isDigitLimited) {
                  newValue = newValue.slice(0, isDigitLimited)
                }
                if (isUppercase) {
                  newValue = newValue.toUpperCase()
                }
                field.onChange(newValue)
              }}
              placeholder={placeHolder}
              className={`${inputClass} `}
            />
          </div>

          {fieldState.error && (
            <p className="text-red-500 mt-2 text-xs">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}

export default RhfTextArea
