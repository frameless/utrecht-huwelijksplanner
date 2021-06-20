import clsx from "clsx";
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const SkipLink = forwardRef(
  ({ children, className, ...restProps }: PropsWithChildren<LinkProps>, ref: ForwardedRef<HTMLAnchorElement>) => (
    <p className="utrecht-skip-link-group">
      <a ref={ref} {...restProps} className={clsx("utrecht-skip-link", "utrecht-skip-link--auto", className)}>
        {children}
      </a>
    </p>
  )
);

SkipLink.displayName = "SkipLink";
