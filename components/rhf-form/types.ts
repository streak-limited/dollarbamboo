import { RegisterOptions } from "react-hook-form";

export type RHFInput = {
  label: string;
  name: string;
  rules?: RegisterOptions;
  defaultValue?: unknown;
  readioOptions?: { label: string; value: string }[];

  // radioGroupProps?: RadioGroupProps
  disabled?: boolean;

  autocomplete?: string[];

  radioValue?: string;
};
