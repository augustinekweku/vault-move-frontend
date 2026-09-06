import { useState } from "react";
import { SignUpForm } from "~/components/auth/SignUpForm";
import { VerifyEmailForm } from "~/components/auth/VerifyEmailForm";

export interface SignUpDetails {
  fullName: string;
  email: string;
  password: string;
}

/** Buyer/renter sign-up wizard: renders each step as a component and
 *  carries the entered details between them in memory. */
export function SignUpFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const [details, setDetails] = useState<SignUpDetails>({
    fullName: "",
    email: "",
    password: "",
  });

  return step === 1 ? (
    <SignUpForm
      onNext={(d) => {
        setDetails(d);
        setStep(2);
      }}
    />
  ) : (
    <VerifyEmailForm email={details.email} />
  );
}
