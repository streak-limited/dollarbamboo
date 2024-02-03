// Import necessary dependencies
"use client";
import { FC, ReactNode } from "react";
import {
    Control,
    Controller,
    FieldValues,
    useFormContext,
} from "react-hook-form";
import TimePicker from "../timepicker";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// Define the props interface for the RhfTextField component
type RhfTimePickerProps = {
    label?: string | ReactNode;
    name: string;
    type?: string;
    defaultValue?: string;
    isDigitLimited?: number;
    isUppercase?: boolean;
    rules?: any;
    props?: any;
    inputClass?: string;
    divClass?: string;
    labelClass?: string;
    placeHolder?: string;
    disabled?: boolean;
};

// Define the RhfTextField component
const RhfTimePicker: FC<RhfTimePickerProps> = ({
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
    ...rest
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control as Control<FieldValues>}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { onChange, value }, fieldState }) => {
                return (
                    <div className={`${divClass} `}>
                        <label htmlFor={name} className={`${labelClass} `}>
                            {label}
                        </label>
                        {/* <div className="relative">
              <input
                {...field}
                {...rest}
                {...props}
                id={name}
                name={name}
                type={showPassword ? "text" : type}
                onChange={(e) => {
                  let newValue = e.target.value;
                  if (isDigitLimited) {
                    newValue = newValue.slice(0, isDigitLimited);
                    field.onChange(newValue);
                  }
                  if (isUppercase) {
                    newValue = newValue.toUpperCase();
                    field.onChange(newValue);
                  }
                  if (type === "time") {
                    const [hours, minutes] = newValue.split(":");
                    const date = new Date();
                    date.setHours(parseInt(hours, 10));
                    date.setMinutes(parseInt(minutes, 10));
                    console.log(date);
                  }
                }}
                placeholder={placeHolder}
                className={`${inputClass} `}
                disabled={disabled && "disabled"}
              />
              {type === "password" && (
                <div
                  className="absolute inset-y-0 right-0 flex items-center mr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
              )}
            </div> */}
                        <TimePicker
                            // {...field}
                            // {...rest}
                            // {...props}
                            id={name}
                            name={name}
                            // placeholder={placeHolder}
                            className={`${inputClass} `}
                            // disabled={disabled && "disabled"}
                            rhfOnChange={onChange}
                            // defaultValue={field.value}
                        />

                        {fieldState.error && (
                            <p className="text-red-500 mt-2 text-xs">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default RhfTimePicker;
