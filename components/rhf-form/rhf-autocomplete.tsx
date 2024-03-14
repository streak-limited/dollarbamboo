import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
// import Autocomplete from '../autocomplete'

type RhfAutocompleteProps = {
  options: string[]
  noOptionFoundString: string
  inputClass?: string
  labelClass?: string
  divClass?: string
  name: string
  label?: string | React.ReactNode
  icon: React.ReactNode
  freeSolo?: boolean
  placeholder?: string
  multiple?: boolean
  defaultValue?: string[]
  setIsPullDownOpen?: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
}

const RhfAutocomplete: React.FC<RhfAutocompleteProps> = ({
  options,
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
  disabled,
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        // console.log("field", field);

        // console.log("autcomplete error", fieldState);

        return (
          <div className={divClass}>
            {/* <Autocomplete
              disabled={disabled}
              divClass={divClass}
              setIsPullDownOpen={setIsPullDownOpen}
              label={label}
              labelClass={labelClass}
              noOptionFoundString={noOptionFoundString}
              inputClass={inputClass ? inputClass : ''}
              icon={icon}
              defaultValue={field.value}
              options={options}
              placeholder={placeholder ? placeholder : ''}
              onSelect={(option: string[]) => field.onChange(option)}
              multiple={multiple} // Set to true if you want to allow multiple selections
              freeSolo={freeSolo} // Set to true if you want to allow free input
            /> */}
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

export default RhfAutocomplete
