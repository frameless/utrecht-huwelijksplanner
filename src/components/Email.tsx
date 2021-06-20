import { HTMLAttributes, PropsWithChildren } from "react";

export const Email = ({ children }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
  <div className="example-email">{children}</div>
);
