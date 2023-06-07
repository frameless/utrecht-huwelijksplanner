import { ButtonLink as DesignSystemButtonLink } from "@utrecht/component-library-react";
import type { ButtonLinkProps as DesignSystemButtonLinkProps } from "@utrecht/component-library-react/dist/ButtonLink";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ForwardedRef, forwardRef, KeyboardEvent } from "react";

export interface ButtonLinkProps extends DesignSystemButtonLinkProps {
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

const onKeyDown = (evt: KeyboardEvent<HTMLAnchorElement>) => {
  if (evt.key === " " && typeof (evt.target as HTMLElement)?.click === "function") {
    // Prevent other side-effects, such as scrolling
    evt.preventDefault();

    // Navigate to the link target
    (evt.target as HTMLElement).click();
  }
};

export const ButtonLink = forwardRef(
  (
    { appearance, children, external, href, className, sameURL, placeholder, role, ...restProps }: ButtonLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const router = useRouter();
    const isSameURL = router.pathname === href;

    let props = restProps;

    if (role === "button") {
      // When this link is announced as button by accessibility tools,
      // it should also behave like a button. Links are not activated
      // using `Space`, so we need to implement that behaviour here
      // to reach parity with the `button` element.
      props = {
        ...restProps,
        onKeyDown,
      };
    }

    if (isSameURL && sameURL === "no-link") {
      return <>{children}</>;
    }

    if ((isSameURL && sameURL === "reload") || placeholder) {
      /* Avoid client-side routing with `NextLink` for reload behavior */
      /* Avoid `NextLink` for placeholder links that render no `href` */
      return (
        <DesignSystemButtonLink
          appearance={appearance}
          href={href}
          external={external}
          placeholder={placeholder}
          ref={ref}
          aria-current={isSameURL ? "page" : undefined}
          {...props}
        >
          {children}
        </DesignSystemButtonLink>
      );
    } else {
      return (
        <NextLink
          href={href || ""}
          ref={ref}
          role={role || (placeholder ? "link" : undefined)}
          className={clsx(
            "utrecht-button-link",
            "utrecht-button-link--html-a",
            {
              "utrecht-button-link--external": external,
              "utrecht-button-link--primary-action": appearance === "primary-action-button",
              "utrecht-button-link--secondary-action": appearance === "secondary-action-button",
              "utrecht-button-link--subtle": appearance === "subtle-button",
              "utrecht-button-link--placeholder": placeholder,
            },
            className
          )}
          aria-disabled={placeholder ? "true" : undefined}
          rel={external ? "external noopener noreferrer" : undefined}
          aria-current={isSameURL ? "page" : undefined}
          {...props}
        >
          {children}
        </NextLink>
      );
    }
  }
);

ButtonLink.displayName = "ButtonLink";
