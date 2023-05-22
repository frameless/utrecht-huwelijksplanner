import { Checkbox } from "@utrecht/component-library-react";
import React, { ForwardedRef, InputHTMLAttributes } from "react";

interface Checkbox2Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
  appearance?: string;
  invalid?: boolean;
  novalidate?: boolean;
}

export const Checkbox2: React.FC<Checkbox2Props> = React.forwardRef(
  ({ novalidate, required, ...props }, ref: ForwardedRef<HTMLInputElement>) => (
    <Checkbox
      aria-required={(required && novalidate) || undefined}
      required={required && !novalidate ? required : undefined}
      ref={ref}
      {...props}
    />
  )
);

Checkbox2.displayName = "Checkbox";
