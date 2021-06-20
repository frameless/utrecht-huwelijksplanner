import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export interface FormContentProps extends HTMLAttributes<HTMLElement> {}

export const FormContent = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<FormContentProps>, ref: ForwardedRef<HTMLFormElement>) => (
    <form {...restProps} ref={ref} className="todo-form-content">
      {children}
    </form>
  )
);

FormContent.displayName = "FormContent";
