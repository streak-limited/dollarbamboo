'use client'

import { FC } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'

type RhfSelectProps = {
  label?: string
  name: string
  defaultValue?: string
  isDigitLimited?: boolean
  isUppercase?: boolean
  rules?: any
  props?: any
  inputClass?: string
  labelClass?: string
  optionClass?: string
  divClass?: string
  placeHolder?: string
  options: any[]
}

const RhfSelect: FC<RhfSelectProps> = ({
  label,
  name,
  defaultValue,
  isDigitLimited,
  isUppercase,
  rules,
  props,
  inputClass,
  labelClass,
  optionClass,
  placeHolder,
  divClass,
  options,
  ...rest
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={divClass}>
          <label className={labelClass}>{label}</label>
          <div className="relative">
            <select
              {...field}
              className={`${inputClass}`}
              placeholder={placeHolder}
            >
              {options &&
                options.map((option, i) => {
                  return (
                    <option key={i} value={option} className={optionClass}>
                      {option}
                    </option>
                  )
                })}
            </select>
            {/* <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div> */}
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

export default RhfSelect
