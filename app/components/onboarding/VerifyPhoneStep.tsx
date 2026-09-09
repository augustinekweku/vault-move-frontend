import { Button } from "~/components/ui/Button";
import { Field } from "~/components/ui/Input";
import { OtpInput } from "~/components/auth/OtpInput";

/** Step 1b — phone verification: the 4-digit code screen shown after the
 *  personal form is saved. The sidebar stays on step 1 throughout. */
export function VerifyPhoneStep({
  dialCode,
  maskedPhone,
  code,
  onCodeChange,
  verifying,
  onVerifySubmit,
  onResendCode,
}: {
  dialCode: string;
  maskedPhone: string;
  code: string;
  onCodeChange: (code: string) => void;
  verifying: boolean;
  onVerifySubmit: (event: React.FormEvent) => void;
  onResendCode: () => void;
}) {
  return (
    <div>
      <h1 className="mt-4 text-[29.08px] leading-9 font-semibold text-ink">
        Verify your Phone Number
      </h1>
      <p className="mt-1.5 text-lg leading-8 text-ink-soft">
        We have sent a code to {dialCode} {maskedPhone}
      </p>

      <form className="mt-15" onSubmit={onVerifySubmit}>
        <Field label="Verification Code">
          <OtpInput value={code} onChange={onCodeChange} />
        </Field>

        <Button
          type="submit"
          className="mt-15 w-full"
          disabled={verifying || code.length < 4}
        >
          {verifying ? "Loading" : "Verify"}
        </Button>
      </form>

      <p className="mt-3 text-center text-[13px] text-muted-500">
        Didn&rsquo;t get the code?{" "}
        <button
          type="button"
          onClick={onResendCode}
          className="font-semibold text-ink hover:text-brand"
        >
          Resend it
        </button>
      </p>
    </div>
  );
}
