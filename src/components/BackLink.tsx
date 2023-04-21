/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import { ButtonLinkProps } from "@utrecht/component-library-react/dist/ButtonLink";
import clsx from "clsx";
import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { ButtonLink } from "./index";

type BackLinkProps = ButtonLinkProps;

export const BackLink = forwardRef(
  ({ children, className, ...restProps }: PropsWithChildren<BackLinkProps>, ref: ForwardedRef<HTMLAnchorElement>) => (
    <p className={clsx("utrecht-back-link", className)}>
      <ButtonLink ref={ref} appearance={"subtle-button"} {...restProps}>
        {children}
      </ButtonLink>
    </p>
  )
);

BackLink.displayName = "BackLink";
