import { HTMLAttributes, PropsWithChildren } from "react";

export const DataNoTranslate = ({ children }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
  <span translate="no">{children}</span>
);
