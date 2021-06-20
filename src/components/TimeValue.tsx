import { HTMLAttributes, PropsWithChildren } from "react";

interface TimeValueProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  dateTime: string;
  locale: string;
}
export const TimeValue = ({ dateTime, locale }: TimeValueProps) => (
  <time dateTime={dateTime}>
    {new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(dateTime))}
  </time>
);

TimeValue.displayName = "TimeValue";
