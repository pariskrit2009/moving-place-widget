import FieldError from "./FieldError";

export function FormField({
  error,
  children,
  className,
}: {
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
      {error && <FieldError message={error} />}
    </div>
  );
}
