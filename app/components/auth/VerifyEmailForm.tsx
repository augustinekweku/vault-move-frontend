import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Field } from "~/components/ui/Input";
import { Toast } from "~/components/ui/Toast";
import { OtpInput } from "~/components/auth/OtpInput";

/** Sign-up step 2: enter the 4-digit code emailed after account creation.
 *  The email is handed down from step 1 by the wizard. */
export function VerifyEmailForm({ email }: { email?: string }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success">(
    "idle",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(step 3): call the real verify endpoint, then advance the flow.
    setStatus("verifying");
    setTimeout(() => setStatus("success"), 1200);
  }

  return (
    <div>
      {status === "success" && (
        <Toast
          title="Success!"
          message="Your email address has been verified!"
          onClose={() => setStatus("idle")}
        />
      )}

      <h1 className="text-[29.08px] leading-9 font-semibold text-ink">
        Verify your Email Address
      </h1>
      <p className="mt-1 text-lg leading-8 text-ink-soft">
        We have sent a code to {email ?? "your email address"}.
      </p>

      <form className="mt-15 md:mt-20" onSubmit={handleSubmit}>
        <Field label="Verification Code">
          <OtpInput value={code} onChange={setCode} />
        </Field>

        <Button
          type="submit"
          className="mt-15 md:mt-20 w-full"
          disabled={status === "verifying"}
        >
          {status === "verifying" ? "Loading…" : "Verify"}
        </Button>
      </form>

      <p className="mt-3 md:mt-5 text-center text-[13px] text-muted-500">
        Didn&rsquo;t get the code?{" "}
        <button
          type="button"
          className="font-semibold text-ink hover:text-brand"
        >
          Resend it
        </button>
      </p>
    </div>
  );
}
