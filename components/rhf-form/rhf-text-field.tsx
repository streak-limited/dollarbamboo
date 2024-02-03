'use client'

import React, { FC, ReactNode, useState } from 'react'
import {
  Controller,
  useFormContext,
  Control,
  FieldValues,
} from 'react-hook-form'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Define the props interface for the RhfTextField component
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
  disabled?: boolean
}

// Define the RhfTextField component
const RhfTextField: FC<RhfTextFieldProps> = ({
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
  disabled,
  ...rest
}) => {
  const { control } = useFormContext()

  // Add a state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className={`${divClass} `}>
            <label htmlFor={name} className={`${labelClass} `}>
              {label}
            </label>
            <input
              {...field}
              {...rest}
              {...props}
              id={name}
              name={name}
              type={showPassword ? 'text' : type}
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
              disabled={disabled && 'disabled'}
            />
            {type === 'password' && (
              <div
                className="absolute inset-y-0 right-0 flex items-center mr-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
            )}

            {fieldState.error && (
              <p className="text-red-500 mt-2 text-xs">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default RhfTextField
