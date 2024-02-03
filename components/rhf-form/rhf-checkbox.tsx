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
  defaultValue?: string
  isDigitLimited?: number
  isUppercase?: boolean
  rules?: any
  props?: any
  inputClass?: string
  divClass?: string
  labelClass?: string
  placeHolder?: string
  checked?: boolean
  onChange?: () => void
  disabled?: boolean
}

const RhfCheckbox: FC<RhfTextFieldProps> = ({
  label,
  name,
  defaultValue,
  isDigitLimited,
  isUppercase,
  rules,
  props,
  inputClass,
  labelClass,
  divClass,
  placeHolder,
  checked,
  onChange,
  disabled,
  ...rest
}) => {
  const { control } = useFormContext()

  // const [checked, setChecked] = useState(false);

  // const handleCheckboxChange = () => {
  //   // onChange;
  //   setChecked(!checked);
  // };

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={`${divClass} `}>
          {/* Use the checked prop here */}
          <input
            {...field}
            {...rest}
            {...props}
            disabled={disabled}
            id={name}
            name={name}
            placeholder={placeHolder}
            className={`${inputClass} `}
            checked={checked || field.value} // Use checked prop or the form field value
            onChange={() => {
              if (onChange) {
                onChange()
              }
              field.onChange(!field.value) // Toggle the form field value
            }}
          />
          <label
            htmlFor={name}
            className={`${labelClass} `}
            onClick={() => {
              if (!disabled) {
                if (onChange) {
                  onChange()
                }
                field.onChange(!field.value) // Toggle the form field value
              }
            }}
          >
            <div
              className={`flex w-5 h-5 border rounded-full border-gray-400 flex items-center justify-center mr-2 ${
                field.value ? 'bg-teal-500' : 'bg-white'
              }`}
            >
              {field.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                >
                  <polyline
                    points="6 12 10 16 18 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>

            <div>{label}</div>
          </label>

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

export default RhfCheckbox
