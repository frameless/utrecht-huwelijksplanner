import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export type FormContentProps = HTMLAttributes<HTMLElement>;

export const FormContent = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<FormContentProps>, ref: ForwardedRef<HTMLFormElement>) => (
    <form {...restProps} ref={ref} className="todo-form-content">
      {children}
    </form>
  )
);

FormContent.displayName = "FormContent";
