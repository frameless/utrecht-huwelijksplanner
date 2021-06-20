import { HTMLAttributes, PropsWithChildren } from "react";

export const Aside = ({ children }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
  <aside className="todo-aside">{children}</aside>
);
