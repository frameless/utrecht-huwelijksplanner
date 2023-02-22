import { Checkbox } from "@utrecht/component-library-react";
import React, { InputHTMLAttributes } from "react";

interface Checkbox2Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
  appearance?: string;
  invalid?: boolean;
  novalidate?: boolean;
}

export const Checkbox2: React.FC<Checkbox2Props> = ({ novalidate, required, ...props }) => (
  <Checkbox
    aria-required={(required && novalidate) || undefined}
    required={required && !novalidate ? required : undefined}
    {...props}
  />
);
