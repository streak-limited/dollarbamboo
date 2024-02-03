'use client'

import CustomDatePicker from '@/app/(merchant)/_component/date-picker'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
// import RadioGroup from "../radioGroup";

type RhfDatePickerProps = {
  name: string
  defaultValue?: string
  divClass: string
  buttonClass: string
  datePickerClass: string
  rules?: any
  months: number
  label: string
  labelClass: string
  minDate?: Date
  maxDate?: Date
}

const RhfDatePicker: React.FC<RhfDatePickerProps> = ({
  name,
  defaultValue,
  divClass,
  buttonClass,
  datePickerClass,
  rules,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <CustomDatePicker
          name={name}
          value={value}
          onDateRangeChange={onChange}
          buttonClass={buttonClass}
          datePickerClass={datePickerClass}
          divClass={divClass}
          {...props}
        />
      )}
    />
  )
}

export default RhfDatePicker
