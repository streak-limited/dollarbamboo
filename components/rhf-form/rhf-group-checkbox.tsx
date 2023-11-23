'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'
import {
  Controller,
  useFormContext,
  Control,
  FieldValues,
} from 'react-hook-form'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Define the props interface for the RhfGroupCheckbox component
type RhfGroupCheckboxProps = {
  label?: string | ReactNode
  name: string
  type?: string
  defaultValue?: string[]
  isUppercase?: boolean
  props?: any
  inputClass?: string
  divClass?: string
  labelClass?: string
  placeHolder?: string
  options: { value: string; text: string }[]
}

// Define the RhfGroupCheckbox component
const RhfGroupCheckbox: FC<RhfGroupCheckboxProps> = ({
  label,
  name,
  type,
  defaultValue,
  isUppercase,
  props,
  inputClass,
  labelClass,
  divClass,
  placeHolder,
  options,
  ...rest
}) => {
  const { control, watch } = useFormContext()

  const [selected, setSelected] = useState<string[]>([])

  const appendSelected = (
    item: string,
    onChange: (option: string[]) => void,
  ) => {
    setSelected((prevSelected) => {
      if (!prevSelected?.includes(item)) {
        const updatedSelected = [...prevSelected, item]
        onChange(updatedSelected)
        return updatedSelected
      }
      return prevSelected // Explicitly return prevSelected of type 'string[]'
    })
  }

  const removeSelected = (
    removedItem: string,
    onChange: (option: string[]) => void,
  ) => {
    setSelected((prevSelected) => {
      const updatedSelected = prevSelected.filter(
        (item) => item !== removedItem,
      )
      onChange(updatedSelected)
      return updatedSelected
    })
  }

  // console.log("defaultValue", defaultValue);

  // console.log("selected", selected);
  // console.log("options", options);

  useEffect(() => {
    // if (field.value && field.value.length > 0 && selected.length === 0) {
    setSelected(watch(name))
    // }
  }, [watch(name)])

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      // rules={rules}
      render={({ field, fieldState }) => {
        return (
          <>
            <div className={`${divClass} `}>
              {options.map((option, index) => {
                const isSelected = selected?.includes(option.value)
                // console.log("option.value", option.value);
                // console.log("isSelected", isSelected);

                return (
                  <div
                    key={`checkbox-${name}-${index}`}
                    className={`${divClass} `}
                  >
                    {/* Use the checked prop here */}
                    <input
                      {...field}
                      {...rest}
                      {...props}
                      id={name}
                      name={name}
                      placeholder={placeHolder}
                      className={`${inputClass} hidden`}
                      checked={isSelected} // Use checked prop or the form field value
                      onChange={() => {
                        if (isSelected) {
                          removeSelected(option.value, field.onChange)
                        } else {
                          appendSelected(option.value, field.onChange)
                        }
                      }}
                    />
                    <label
                      htmlFor={name}
                      className={`${labelClass} flex flex-row`}
                      onClick={() => {
                        if (isSelected) {
                          removeSelected(option.value, field.onChange)
                        } else {
                          appendSelected(option.value, field.onChange)
                        }
                      }}
                    >
                      <div
                        className={`flex w-5 h-5 border rounded-full border-gray-400 flex items-center justify-center mr-2 ${
                          isSelected ? 'bg-teal-500' : 'bg-white'
                        }`}
                      >
                        {isSelected && (
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

                      <div>{option.text}</div>
                    </label>
                  </div>
                )
              })}
            </div>
            {fieldState.error && (
              <p className="text-red-500 mt-2">{fieldState.error.message}</p>
            )}
          </>
        )
      }}
    />
  )
}

export default RhfGroupCheckbox
