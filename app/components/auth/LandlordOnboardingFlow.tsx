import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { OnboardingSteps } from "~/components/auth/OnboardingSteps";
import { OtpInput } from "~/components/auth/OtpInput";
import { Button } from "~/components/ui/Button";
import { Field, Input, Textarea } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Toast } from "~/components/ui/Toast";
import {
  CheckIcon,
  ChevronDownIcon,
  UploadIcon,
} from "~/components/ui/icons";
import {
  LANDLORD_ID_TYPES,
  LANDLORD_ONBOARDING_STEPS,
  LANDLORD_ONBOARDING_SUBTITLES,
  LANDLORD_ONBOARDING_TITLES,
  LANDLORD_PHONE_CODES,
  LANDLORD_SPECIALIZATIONS,
  type LandlordOnboardingStep,
} from "~/data/auth";
import { cn, scrollToTop } from "~/lib/utils";

/** Mask a phone number down to its last two digits (e.g. "571543210" →
 *  "xxxxxxx10") for the verification subtitle. */
function maskPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "xxxxxxx09";
  if (digits.length <= 2) return digits;
  return `${"x".repeat(digits.length - 2)}${digits.slice(-2)}`;
}

/** Country-code picker for the phone field: a dropdown-menu trigger in the
 *  input group (button + chevron + floating menu with a check on the active
 *  code), matching the project's custom Select pattern. */
function PhoneCodeMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open ]);

  function toggleMenu() {
    setOpen((current) => !current);
  }

  function handleOptionClick(event: React.MouseEvent<HTMLButtonElement>) {
    const code = event.currentTarget.dataset.code;
    if (code) onChange(code);
    setOpen(false);
  }

  function renderOption(code: string) {
    const active = code === value;
    return (
      <li key={code} role="option" aria-selected={active}>
        <button
          type="button"
          data-code={code}
          onClick={handleOptionClick}
          className={cn(
            "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-surface-alt",
            active ? "font-medium text-brand" : "text-ink",
          )}
        >
          {code}
          {active && <CheckIcon className="size-4 shrink-0" />}
        </button>
      </li>
    );
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleMenu}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        className="flex h-full items-center gap-1 rounded-l-lg py-0 pr-1 pl-3.5 text-[13px] font-medium text-muted-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {value.split(" ")[0]}
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 z-30 mt-1 min-w-36 rounded-lg border border-line bg-white py-1 shadow-lg"
        >
          {LANDLORD_PHONE_CODES.map(renderOption)}
        </ul>
      )}
    </div>
  );
}

/** Every free-text field in the wizard, keyed by its input `name` so one
 *  generic change handler serves them all. Selects stay separate — their
 *  `onChange` only passes the value, not a field name. */
interface OnboardingForm {
  address: string;
  gpsAddress: string;
  phoneNumber: string;
  experience: string;
  bio: string;
  idNumber: string;
}

const EMPTY_FORM: OnboardingForm = {
  address: "",
  gpsAddress: "",
  phoneNumber: "",
  experience: "",
  bio: "",
  idNumber: "",
};

/** Landlord onboarding wizard: personal details, phone verification, then
 *  the remaining profile steps. Wraps the shared auth shell so the brand
 *  panel matches the login sidebar, with the step list slotted into it. */
export function LandlordOnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LandlordOnboardingStep>(1);
  const [form, setForm] = useState<OnboardingForm>(EMPTY_FORM);
  const [phoneCode, setPhoneCode] = useState(LANDLORD_PHONE_CODES[0]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Step 1b — phone verification code screen.
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifiedToast, setVerifiedToast] = useState(false);

  // Select values (kept out of the form object — see OnboardingForm).
  const [specialization, setSpecialization] = useState("");
  const [idType, setIdType] = useState("");

  // Step 3 — registered-company question.
  const [hasCompany, setHasCompany] = useState<"yes" | "no">("no");
  const [documentName, setDocumentName] = useState("");
  const documentInputRef = useRef<HTMLInputElement>(null);

  function goToStep(next: LandlordOnboardingStep) {
    setStep(next);
    scrollToTop();
  }

  function handleGoBack() {
    if (codeSent) {
      setCodeSent(false);
    } else if (step > 1) {
      goToStep((step - 1) as LandlordOnboardingStep);
    } else {
      navigate("/signup");
    }
  }

  function handleCancel() {
    // Abandon the wizard without saving — back to the portal.
    navigate("/dashboard");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (step === 1 && !codeSent) {
      // TODO: request the SMS code for the entered number when live.
      setCodeSent(true);
      scrollToTop();
    } else if (step < 4) {
      goToStep((step + 1) as LandlordOnboardingStep);
    } else {
      // TODO: persist the onboarding payload before leaving the wizard.
      navigate("/dashboard");
    }
  }

  function handleVerifySubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: verify the code against the API, then advance the flow.
    setVerifying(true);
    setTimeout(() => {
      setVerifiedToast(true);
    }, 900);
    setTimeout(() => {
      setVerifying(false);
      setCode("");
      setCodeSent(false);
      goToStep(2);
    }, 2300);
  }

  function handleVerifiedToastClose() {
    setVerifiedToast(false);
  }

  /** One node of the mobile stepper: status circle plus the connector to the
   *  next node. Needs the current step, so it lives with the state. */
  function renderMobileStep(item: LandlordOnboardingStep, index: number) {
    const done = item < step;
    const current = item === step;
    return (
      <li
        key={item}
        aria-current={current ? "step" : undefined}
        className="flex flex-1 items-center last:flex-none"
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            done && "bg-brand text-white",
            current && "border-2 border-brand bg-white text-brand",
            !done && !current && "bg-line-soft text-muted-500",
          )}
        >
          {done ? <CheckIcon className="size-4" /> : item}
        </span>
        {index < LANDLORD_ONBOARDING_STEPS.length - 1 && (
          <span
            aria-hidden
            className={cn(
              "mx-1.5 h-0.5 flex-1 rounded-full",
              item < step ? "bg-brand" : "bg-line-soft",
            )}
          />
        )}
      </li>
    );
  }

  function handleResendCode() {
    // TODO: re-request the SMS code when the backend is live.
    setCode("");
  }

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhoneCodeChange(code: string) {
    setPhoneCode(code);
  }

  function handleAvatarClick() {
    avatarInputRef.current?.click();
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  }

  function handleCodeChange(next: string) {
    setCode(next);
  }

  function handleSpecializationChange(value: string) {
    setSpecialization(value);
  }

  function handleHasCompanyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    if (value === "yes" || value === "no") setHasCompany(value);
  }

  function handleIdTypeChange(value: string) {
    setIdType(value);
  }

  function handleDocumentClick() {
    documentInputRef.current?.click();
  }

  function handleDocumentChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setDocumentName(file.name);
  }

  const dialCode = phoneCode.split(" ").pop() ?? "+233";

  return (
    <AuthLayout
      aside={<OnboardingSteps currentStep={step} />}
      topRight={
        <button
          type="button"
          onClick={handleGoBack}
          className="text-[11px] font-medium text-ink-soft hover:text-ink"
        >
          Go Back
        </button>
      }
    >
      {verifiedToast && (
        <Toast
          title="Success!"
          message="Your Phone number has been verified!"
          onClose={handleVerifiedToastClose}
        />
      )}
      {/* Mobile stepper — the brand sidebar with the step list only renders
          on desktop, so progress gets this segmented indicator below lg. */}
      <div className="mb-8 lg:hidden">
        <p className="text-xs font-medium text-muted-700">
          Step {step} of {LANDLORD_ONBOARDING_STEPS.length}
        </p>
        <ol className="mt-3 flex items-center">
          {LANDLORD_ONBOARDING_STEPS.map(renderMobileStep)}
        </ol>
      </div>
      {codeSent ? (
        <div>
          <h1 className="mt-4 text-[29.08px] leading-9 font-semibold text-ink">
            Verify your Phone Number
          </h1>
          <p className="mt-1.5 text-lg leading-8 text-ink-soft">
            We have sent a code to {dialCode} {maskPhoneNumber(form.phoneNumber)}
          </p>

          <form className="mt-15" onSubmit={handleVerifySubmit}>
            <Field label="Verification Code">
              <OtpInput value={code} onChange={handleCodeChange} />
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
              onClick={handleResendCode}
              className="font-semibold text-ink hover:text-brand"
            >
              Resend it
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h1 className="mt-4 text-2xl leading-8 font-semibold text-ink sm:whitespace-nowrap">
            {LANDLORD_ONBOARDING_TITLES[step]}
          </h1>
          <p className="mt-1.5 text-lg leading-8 text-ink-soft">
            {LANDLORD_ONBOARDING_SUBTITLES[step]}
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="flex justify-center pb-2">
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    aria-label="Upload profile photo"
                    className="relative block size-24 rounded-full bg-surface-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt=""
                        className="size-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-24 items-center justify-center rounded-full">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className="size-12 text-muted-300"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full bg-brand text-lg leading-none text-white"
                    >
                      +
                    </span>
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <Input
                  label="Address"
                  name="address"
                  placeholder="Enter address here"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={handleFieldChange}
                  required
                />
                <Input
                  label="GPS Address"
                  name="gpsAddress"
                  placeholder="eg GW-200-2200"
                  value={form.gpsAddress}
                  onChange={handleFieldChange}
                />
                <Field label="Phone number">
                  <div className="flex h-11 w-full items-stretch rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-within:border-brand">
                    <PhoneCodeMenu
                      value={phoneCode}
                      onChange={handlePhoneCodeChange}
                    />
                    <span
                      aria-hidden
                      className="my-3 w-px shrink-0 bg-line-soft"
                    />
                    <input
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(57) 1543210"
                      value={form.phoneNumber}
                      onChange={handleFieldChange}
                      required
                      className="h-full min-w-0 flex-1 rounded-r-lg bg-transparent px-3 text-[15px] text-ink placeholder:text-muted-500 focus:outline-none"
                    />
                  </div>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Input
                  label="How many years of experience do you have?"
                  name="experience"
                  inputMode="numeric"
                  placeholder="Years of experience"
                  value={form.experience}
                  onChange={handleFieldChange}
                  required
                />
                <Select
                  label="Areas of specialization"
                  placeholder="eg apartment, townhouses, etc"
                  options={LANDLORD_SPECIALIZATIONS}
                  value={specialization}
                  onChange={handleSpecializationChange}
                />
                <Textarea
                  label="Short Bio"
                  name="bio"
                  rows={3}
                  placeholder="Short professional bio"
                  value={form.bio}
                  onChange={handleFieldChange}
                />
              </>
            )}

            {step === 3 && (
              <>
                <fieldset>
                  <legend className="text-[15px] font-semibold text-ink">
                    Do you have a registered company?
                  </legend>
                  <div className="mt-3 space-y-2.5">
                    <label className="flex items-center gap-2 text-sm text-muted-700">
                      <input
                        type="radio"
                        name="hasCompany"
                        value="yes"
                        checked={hasCompany === "yes"}
                        onChange={handleHasCompanyChange}
                        className="size-4 accent-brand"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-muted-700">
                      <input
                        type="radio"
                        name="hasCompany"
                        value="no"
                        checked={hasCompany === "no"}
                        onChange={handleHasCompanyChange}
                        className="size-4 accent-brand"
                      />
                      No
                    </label>
                  </div>
                </fieldset>
                <div aria-hidden className="h-28" />
              </>
            )}

            {step === 4 && (
              <>
                <Select
                  label="ID type"
                  placeholder="Select ID type"
                  options={LANDLORD_ID_TYPES}
                  value={idType}
                  onChange={handleIdTypeChange}
                />
                <Input
                  label="ID number"
                  name="idNumber"
                  placeholder="Enter ID number"
                  value={form.idNumber}
                  onChange={handleFieldChange}
                  required
                />
                <Field label="ID document">
                  <button
                    type="button"
                    onClick={handleDocumentClick}
                    className="flex w-full items-center gap-3 rounded-lg border border-dashed border-line bg-white px-3.5 py-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    <UploadIcon className="size-6 shrink-0 text-muted-400" />
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] text-ink">
                        {documentName || "Upload ID document"}
                      </span>
                      <span className="block text-xs text-muted-500">
                        PNG, JPG or PDF (max 5MB)
                      </span>
                    </span>
                  </button>
                  <input
                    ref={documentInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                    onChange={handleDocumentChange}
                  />
                </Field>
                <Textarea
                  label="Additional notes"
                  name="notes"
                  rows={3}
                  placeholder="Anything else we should know? (optional)"
                />
              </>
            )}

            <div className="space-y-3 pt-4">
              <Button type="submit" className="w-full">
                {step === 4 ? "Submit" : "Save and Continue"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </AuthLayout>
  );
}
