/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import clsx from "clsx";
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export type FeedbackSectionType = "success";

export interface FeedbackSectionProps extends HTMLAttributes<HTMLElement> {
  status: FeedbackSectionType;
}

export const FeedbackSection = forwardRef(
  (
    { children, className, status, ...restProps }: PropsWithChildren<FeedbackSectionProps>,
    ref: ForwardedRef<HTMLElement>
  ) => (
    <section
      aria-live="polite"
      aria-atomic="true"
      {...restProps}
      ref={ref}
      className={clsx(
        "example-feedback-section",
        {
          "example-feedback-section--success": status === "success",
        },
        className
      )}
    >
      {children}
    </section>
  )
);

FeedbackSection.displayName = "FeedbackSection";
