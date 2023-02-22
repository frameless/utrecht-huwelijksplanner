import { RadioButton } from "@utrecht/component-library-react";
import React, { InputHTMLAttributes } from "react";

interface RadioButton2Props extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  novalidate?: boolean;
}

export const RadioButton2: React.FC<RadioButton2Props> = ({ required, novalidate, ...props }) => (
  <RadioButton
    aria-required={(required && novalidate) || undefined}
    required={required && !novalidate ? required : undefined}
    {...props}
  />
);
