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
        <span className="text-[13px] font-medium text-[#344054]">{label}</span>
      )}
      {children}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
}

export function Input({
  label,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  const control = (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[15px] text-ink placeholder:text-muted-500 shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none",
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
