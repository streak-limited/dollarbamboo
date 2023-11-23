'use client'

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC, ReactNode, useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'

// Define the props interface for the RhfDateArray component
type RhfDateArrayProps = {
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
  buttonClass: string
}

// Define the RhfDateArray component
const RhfDateArray: FC<RhfDateArrayProps> = ({
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
  buttonClass,
  ...rest
}) => {
  const { control, watch } = useFormContext()

  const [selected, setSelected] = useState<Date[]>([])
  const [value, setValue] = useState<string>('')
  const appendSelected = (item: Date, onChange?: (option: Date[]) => void) => {
    setSelected((prevSelected) => {
      if (
        !prevSelected.some((prevItem) => prevItem.getTime() === item.getTime())
      ) {
        const updatedSelected = [...prevSelected, item]
        if (onChange) {
          console.log(updatedSelected, 'updatedSelected')
          onChange(updatedSelected)
        }
        return updatedSelected
      }
      return prevSelected // Explicitly return prevSelected of type 'Date[]'
    })
  }

  const removeSelected = (
    removedItem: Date,
    onChange: (option: Date[]) => void,
  ) => {
    setSelected((prevSelected) => {
      const updatedSelected = prevSelected.filter(
        (item) => item !== removedItem,
      )
      onChange(updatedSelected)
      return updatedSelected
    })
  }

  useEffect(() => {
    if (watch(name) && watch(name).length > 0 && selected.length === 0) {
      setSelected(watch(name))
    }
  }, [watch(name)])

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col">
            <div className={`${divClass} inline-flex items-center gap-2`}>
              <input
                type="date"
                className={inputClass}
                // value={value}
                // onChange={(event) => setValue(event.target.value)}
                onChange={(event) => {
                  appendSelected(
                    dayjs(event.target.value).toDate(),
                    field.onChange,
                  )
                }}
              />
            </div>

            <div className="flex inline-flex flex-wrap gap-2 items-center py-2">
              {selected.map((date: Date, index: number) => {
                return (
                  <div
                    key={`selected-date-${index}`}
                    className="pl-4 pr-4 py-2 bg-black text-white rounded-full focus:outline-none h-10 text-sm gap-2 flex items-center cursor-pointer hover:bg-gray-600"
                    onClick={() => {
                      removeSelected(date, field.onChange)
                    }}
                  >
                    {dayjs(date).format('DD/MM/YYYY')}
                    <button type="button">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-lg"
                      />
                    </button>
                  </div>
                )
              })}
            </div>

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

export default RhfDateArray
