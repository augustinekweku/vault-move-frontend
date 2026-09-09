import { cn } from "~/lib/utils";

interface FieldProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control wrapper used across search and form fields. */
export function Field({ label, className, children }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-[13px] font-medium text-muted-700">{label}</span>
      )}
      {children}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  /** Error message — turns the border and value red and renders the message
   *  below the field. Pair with `errorId` for the aria link. */
  error?: string | null;
  errorId?: string;
}

export function Input({
  label,
  className,
  wrapperClassName,
  error,
  errorId,
  ...props
}: InputProps) {
  const control = (
    <>
      <input
        aria-invalid={error ? true : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        className={cn(
          "h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:outline-none",
          error
            ? "border-danger text-danger focus:border-danger"
            : "border-line text-ink focus:border-brand",
          className,
        )}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className="text-[13px] text-danger">
          {error}
        </span>
      )}
    </>
  );

  if (!label) return control;
  return (
    <Field label={label} className={wrapperClassName}>
      {control}
    </Field>
  );
}

export function Textarea({
  label,
  className,
  wrapperClassName,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  wrapperClassName?: string;
}) {
  const control = (
    <textarea
      className={cn(
        "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted-500 shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none",
        className,
      )}
      {...props}
    />
  );
  if (!label) return control;
  return (
    <Field label={label} className={wrapperClassName}>
      {control}
    </Field>
  );
}
