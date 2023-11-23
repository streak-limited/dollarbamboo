'use client'

import React from 'react'
import {
  Controller,
  useFormContext,
  Control,
  FieldValues,
} from 'react-hook-form'
import RadioGroup from '../radio-group'

type RhfRadioProps = {
  label?: string
  name: string
  defaultValue?: string
  rules?: any
  props?: any
  inputClass?: string
  radioGroupClass?: string
  placeHolder?: string
  options: any[]
}

const RhfRadio: React.FC<RhfRadioProps> = ({
  label,
  name,
  defaultValue,
  rules,
  props,
  inputClass,
  radioGroupClass,
  placeHolder,
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
      render={({ field: { onChange, value }, fieldState }) => (
        <div className="flex flex-col">
          <div className={`${radioGroupClass} `}>
            <RadioGroup
              inputClass={inputClass}
              name={name}
              options={options}
              value={value}
              onChange={onChange}
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

export default RhfRadio
