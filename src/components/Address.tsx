/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import clsx from "clsx";
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

type AddressProps = HTMLAttributes<HTMLParagraphElement>;

export const Address = forwardRef(
  ({ children, className, ...restProps }: PropsWithChildren<AddressProps>, ref: ForwardedRef<HTMLParagraphElement>) => (
    <address {...restProps} ref={ref} className={clsx("utrecht-paragraph", className)}>
      {children}
    </address>
  )
);

Address.displayName = "Address";
