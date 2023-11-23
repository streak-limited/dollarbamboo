'use client'
import CustomDateRangePicker from '@/app/(merchant)/_component/date-range-picker'
import React from 'react'
import {
  Controller,
  useFormContext,
  Control,
  FieldValues,
} from 'react-hook-form'
// import RadioGroup from "../radioGroup";

type RhfDateRangePickerProps = {
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
}

const RhfDateRangePicker: React.FC<RhfDateRangePickerProps> = ({
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
        <CustomDateRangePicker
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

export default RhfDateRangePicker
