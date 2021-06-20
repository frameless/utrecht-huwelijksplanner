import clsx from "clsx";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { Link, LinkProps } from "./Link";

export interface BreadcrumbNavLinkProps extends LinkProps {
  index?: number;
}

export const BreadcrumbNavLink = forwardRef(
  ({ children, index, ...restProps }: BreadcrumbNavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => (
    <li
      className="utrecht-breadcrumb__item"
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
    >
      <Link className="utrecht-breadcrumb__link" ref={ref} {...restProps} itemProp="item">
        <span className="utrecht-breadcrumb__text" itemProp="name">
          {children}
        </span>
        {typeof index === "number" && <meta itemProp="position" content={String(index + 1)} />}
      </Link>
    </li>
  )
);

BreadcrumbNavLink.displayName = "BreadcrumbNavLink";

export interface BreadcrumbNavProps extends HTMLAttributes<HTMLElement> {
  appearance?: string;
}

export const BreadcrumbNav = ({ appearance, children, className }: BreadcrumbNavProps) => (
  <nav
    className={clsx("utrecht-breadcrumb", appearance === "arrows", "utrecht-breadcrumb--arrows", className)}
    aria-label="Kruimelpad"
  >
    <ol className="utrecht-breadcrumb__list" itemScope itemType="https://schema.org/BreadcrumbList">
      {children}
    </ol>
  </nav>
);

BreadcrumbNav.displayName = "BreadcrumbNav";
