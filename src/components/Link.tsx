"use client";
import { Link as DesignSystemLink } from "@utrecht/component-library-react";
import type { LinkProps as DesignSystemLinkProps } from "@utrecht/component-library-react/dist/Link";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { ForwardedRef, forwardRef } from "react";
export interface LinkProps extends DesignSystemLinkProps {
  /**
   * Background to the naming of this API:
   * "same-url" is inspired by "same-origin" and "same-site" from CSP.
   * "reload" is from `window.reload()`
   * Angular also has `onSameUrlNavigation: 'ignore' | 'reload'
   * URL spec also suggest using a `somethingURL` name:
   * https://url.spec.whatwg.org/#url-apis-elsewhere
   */
  sameURL?: "no-link" | "reload";
}

export const Link = forwardRef(
  (
    { boxContent, children, external, href, className, sameURL, placeholder, role, ...restProps }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const pathname = usePathname();
    const isSameURL = pathname === href;

    if (isSameURL && sameURL === "no-link") {
      return <>{children}</>;
    }

    if ((isSameURL && sameURL === "reload") || placeholder) {
      /* Avoid client-side routing with `NextLink` for reload behavior */
      /* Avoid `NextLink` for placeholder links that render no `href` */
      return (
        <DesignSystemLink
          href={href}
          external={external}
          boxContent={boxContent}
          placeholder={placeholder}
          ref={ref}
          aria-current={isSameURL ? "page" : undefined}
          {...restProps}
        >
          {children}
        </DesignSystemLink>
      );
    } else {
      return (
        <NextLink
          href={href || ""}
          ref={ref}
          role={role || (placeholder ? "link" : undefined)}
          className={clsx(
            "utrecht-link",
            {
              "utrecht-link--box-content": boxContent,
              "utrecht-link--external": external,
              "utrecht-link--placeholder": placeholder,
            },
            className
          )}
          aria-disabled={placeholder ? "true" : undefined}
          rel={external ? "external noopener noreferrer" : undefined}
          aria-current={isSameURL ? "page" : undefined}
          {...restProps}
        >
          {children}
        </NextLink>
      );
    }
  }
);

Link.displayName = "Link";
