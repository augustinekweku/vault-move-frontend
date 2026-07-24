import { useState } from "react";
import { Field } from "~/components/ui/Input";
import { EyeIcon, EyeOffIcon } from "~/components/ui/icons";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  name?: string;
  autoComplete?: string;
  required?: boolean;
}

/** Labelled password input with a show/hide eye toggle, styled to match
 *  the shared Input control. */
export function PasswordField({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  autoComplete,
  required,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label}>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          autoComplete={autoComplete}
          required={required}
          placeholder="••••••••"
          className="h-11 w-full rounded-lg border border-line bg-white px-3.5 pr-11 text-[15px] text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none"
        />
        <button
          type="button"
          /* Keep input focus so the rules list doesn't flicker on toggle. */
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-line hover:text-muted-500"
        >
          {visible ? (
            <EyeOffIcon className="size-6" />
          ) : (
            <EyeIcon className="size-6" />
          )}
        </button>
      </div>
    </Field>
  );
}
