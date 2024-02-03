'use client'

import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import ProductAutocomplete from '../product-autocomplete'

type RhfProductAutocompleteProps = {
  shopId: string
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
}

const RhfProductAutocomplete: React.FC<RhfProductAutocompleteProps> = ({
  shopId,
  noOptionFoundString,
  inputClass,
  labelClass,
  divClass,
  name,
  label,
  icon,
  freeSolo,
  placeholder,
  multiple = false,
  defaultValue,
  setIsPullDownOpen,
  blockedId,
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
            <ProductAutocomplete
              divClass={divClass}
              setIsPullDownOpen={setIsPullDownOpen}
              label={label}
              labelClass={labelClass}
              noOptionFoundString={noOptionFoundString}
              inputClass={inputClass ? inputClass : ''}
              icon={icon}
              defaultValue={field.value}
              shopId={shopId}
              placeholder={placeholder ? placeholder : ''}
              onSelect={(option: string | null) => field.onChange(option)}
              blockedId={blockedId}
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

export default RhfProductAutocomplete
