import { Textbox } from "@utrecht/component-library-react";
import { InputHTMLAttributes } from "react";

export const DateInput = ({ ...restProps }: InputHTMLAttributes<HTMLInputElement>) => (
  <Textbox {...restProps} type="date" />
);
