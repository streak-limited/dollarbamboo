import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import {
  Controller,
  Control,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import Autocomplete from '../autocomplete'
import ProductAutocomplete from '../product-autocomplete'
import UserAutocomplete from '../user-autocomplete'
import DiscountUserAutocomplete from '../discount-user-autocomplete'
import DiscountProductAutocomplete from '../discount-product-autocomplete'

type RhfDiscountProductAutocompleteProps = {
  noOptionFoundString: string
  inputClass?: string
  labelClass?: string
  divClass?: string
  name: string
  label?: string
  icon: React.ReactNode
  freeSolo?: boolean
  placeholder?: string
  multiple?: boolean
  defaultValue?: string
  setIsPullDownOpen?: React.Dispatch<React.SetStateAction<boolean>>
  blockedId: string[]
  shopId: string
}

const RhfDiscountProductAutocomplete: React.FC<
  RhfDiscountProductAutocompleteProps
> = ({
  noOptionFoundString,
  inputClass,
  labelClass,
  divClass,
  name,
  label,
  icon,
  freeSolo,
  placeholder,
  multiple,
  defaultValue,
  setIsPullDownOpen,
  blockedId,
  shopId,
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        // console.log("autcomplete error", fieldState);

        return (
          <div className={divClass}>
            <DiscountProductAutocomplete
              divClass={divClass}
              setIsPullDownOpen={setIsPullDownOpen}
              label={label}
              labelClass={labelClass}
              noOptionFoundString={noOptionFoundString}
              inputClass={inputClass ? inputClass : ''}
              icon={icon}
              defaultValue={field.value}
              placeholder={placeholder ? placeholder : ''}
              onSelect={(option: string | null) => field.onChange(option)}
              blockedId={blockedId}
              shopId={shopId}
              multiple={multiple}
              // freeSolo={freeSolo} // Set to true if you want to allow free input
            />
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

export default RhfDiscountProductAutocomplete
