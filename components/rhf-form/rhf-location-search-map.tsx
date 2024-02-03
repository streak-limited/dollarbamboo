'use client'

import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import LocationSearchWithMap from '../location-search-with-map'

type RhfLocationSearchWithMapProps = {
  label?: string
  name: string
  tmpAddressName: string
  defaultValue?: string
  rules?: any
  props?: any
  inputClass?: string
  placeHolder?: string
  isMapShown?: boolean

  // options: any[];
}

const RhfLocationSearchWithMap: React.FC<RhfLocationSearchWithMapProps> = ({
  name,
  tmpAddressName,
  defaultValue,
  rules,
  props,
  inputClass,
  placeHolder,
  isMapShown,
  // options,
  ...rest
}) => {
  // console.log("name", name);
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <Controller
      key={name}
      name={name}
      // name={tmpAddressName}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        // console.log("value:", value);
        // console.log("fieldState:", fieldState);
        return (
          <>
            <LocationSearchWithMap
              value={value}
              tmpAddressName={tmpAddressName}
              key={name}
              name={name}
              onChange={onChange}
              defaultValue={
                value && value.formatted_address ? value.formatted_address : ''
              }
              inputClass={inputClass}
              placeHolder={placeHolder}
              isMapShown={isMapShown}
            />
            {fieldState.error && ( // listen to address
              <>
                <p className="text-red-500 text-xs">
                  請輸入地點搜尋並於選單選擇地點
                </p>
                <p className="text-red-500 text-xs">
                  {fieldState.error.message}
                </p>
              </>
            )}
            {errors[tmpAddressName] && ( // listen to address_object
              <>
                <p className="text-red-500 text-xs">
                  請輸入地點搜尋並於選單選擇地點
                </p>
              </>
            )}
          </>
        )
      }}
    />
  )
}

export default RhfLocationSearchWithMap
