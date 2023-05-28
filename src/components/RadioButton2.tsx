import { RadioButton } from "@utrecht/component-library-react";
import React, { ForwardedRef, InputHTMLAttributes } from "react";
import { Checkbox2 } from "./Checkbox2";

interface RadioButton2Props extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  novalidate?: boolean;
}

export const RadioButton2: React.FC<RadioButton2Props> = React.forwardRef(
  ({ required, novalidate, ...props }, ref: ForwardedRef<HTMLInputElement>) => (
    <RadioButton
      aria-required={(required && novalidate) || undefined}
      required={required && !novalidate ? required : undefined}
      ref={ref}
      {...props}
    />
  )
);

RadioButton2.displayName = "RadioButton";
