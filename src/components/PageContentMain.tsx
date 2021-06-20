import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export interface PageContentMainProps extends HTMLAttributes<HTMLElement> {}

export const PageContentMain = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<PageContentMainProps>, ref: ForwardedRef<HTMLElement>) => (
    <main id="main" {...restProps} ref={ref} className="todo-page-content-main">
      {children}
    </main>
  )
);

PageContentMain.displayName = "PageContentMain";
