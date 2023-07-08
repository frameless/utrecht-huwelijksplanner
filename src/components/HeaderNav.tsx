import clsx from "clsx";
import { FC, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { Link, LinkProps } from "./Link";

export const HeaderNavLink: FC<LinkProps> = forwardRef(
  ({ children, ...restProps }, ref: ForwardedRef<HTMLAnchorElement>) => (
    <li className="utrecht-topnav__item">
      <Link className="utrecht-topnav__link" ref={ref} {...restProps}>
        {children}
      </Link>
    </li>
  )
);

HeaderNavLink.displayName = "HeaderNavLink";

export const HeaderNav: FC<HTMLAttributes<HTMLElement>> = ({ children, className, ...restProps }) => (
  <div className={clsx("utrecht-navhtml", className)} {...restProps}>
    <nav className="topnav" aria-label="Hoofdmenu">
      <ul className="utrecht-topnav__list">{children}</ul>
    </nav>
  </div>
);

HeaderNav.displayName = "HeaderNav";
