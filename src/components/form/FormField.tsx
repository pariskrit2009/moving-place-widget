import FieldError from "./FieldError";

export function FormField({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {error && <FieldError message={error} />}
    </div>
  );
}
