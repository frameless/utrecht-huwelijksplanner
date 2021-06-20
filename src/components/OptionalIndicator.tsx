interface OptionalIndicatorProps {
  title: string;
}

export const OptionalIndicator = ({ title }: OptionalIndicatorProps) => {
  // TODO: make sure the optional indicator is understandable for screenreader users
  return <span>({title})</span>;
};
