import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { OnboardingSteps } from "~/components/auth/OnboardingSteps";
import { Button } from "~/components/ui/Button";
import { Toast } from "~/components/ui/Toast";
import { PendingVerificationModal } from "~/components/dashboard/PendingVerificationModal";
import { MobileStepper } from "~/components/onboarding/MobileStepper";
import { PersonalInfoStep } from "~/components/onboarding/PersonalInfoStep";
import { VerifyPhoneStep } from "~/components/onboarding/VerifyPhoneStep";
import { ProfessionalInfoStep } from "~/components/onboarding/ProfessionalInfoStep";
import {
  CompanyInfoStep,
  type CompanyAnswer,
} from "~/components/onboarding/CompanyInfoStep";
import { IdVerificationStep } from "~/components/onboarding/IdVerificationStep";
import {
  LANDLORD_ONBOARDING_SUBTITLES,
  LANDLORD_ONBOARDING_TITLES,
  LANDLORD_PHONE_CODES,
  type LandlordOnboardingStep,
} from "~/data/auth";
import { scrollToTop } from "~/lib/utils";
import type { OnboardingForm, UploadedFile } from "~/types";

const EMPTY_FORM: OnboardingForm = {
  address: "",
  gpsAddress: "",
  phoneNumber: "",
  experience: "",
  bio: "",
  companyName: "",
  officePhone: "",
  companyRegNo: "",
  tinNumber: "",
  officeAddress: "",
  idNumber: "",
};

/** Append picked files to an uploader list with a simulated progress bump —
 *  module-level; the list setter and id minter are passed in. */
function pushUploads(
  files: FileList | null,
  setUploads: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  mintId: () => string,
) {
  if (!files || files.length === 0) return;
  const fresh: UploadedFile[] = Array.from(files, (file) => ({
    id: mintId(),
    name: file.name,
    progress: 8,
  }));
  setUploads((prev) => [...prev, ...fresh]);
  const freshIds = fresh.map((upload) => upload.id);
  setTimeout(() => {
    setUploads((prev) =>
      prev.map((upload) =>
        freshIds.includes(upload.id) ? { ...upload, progress: 92 } : upload,
      ),
    );
  }, 700);
}

/** Mask a phone number down to its last two digits (e.g. "571543210" →
 *  "xxxxxxx10") for the verification subtitle. */
function maskPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "xxxxxxx09";
  if (digits.length <= 2) return digits;
  return `${"x".repeat(digits.length - 2)}${digits.slice(-2)}`;
}

/** Bring an invalid field into view and focus it — the company form is long,
 *  so a freshly shown error can't be left off-screen. */
function focusField(id: string) {
  const field = document.getElementById(id);
  field?.scrollIntoView({ behavior: "smooth", block: "center" });
  field?.focus({ preventScroll: true });
}

/** Landlord onboarding wizard shell: owns every piece of form state and the
 *  step navigation, and composes the shared auth shell with one presentational
 *  step component per screen (see components/onboarding/). The flow is shared
 *  by every audience from select-user-type — an individual landlord answers
 *  No to the company question and skips ahead, while a developer or agent
 *  answers Yes and fills in the company block. */
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
  const [hasCompany, setHasCompany] = useState<CompanyAnswer>("no");
  const [regError, setRegError] = useState<string | null>(null);
  const [tinError, setTinError] = useState<string | null>(null);
  const [officePhoneCode, setOfficePhoneCode] = useState(
    LANDLORD_PHONE_CODES[0],
  );
  const [certs, setCerts] = useState<UploadedFile[]>([]);
  const [idDocs, setIdDocs] = useState<UploadedFile[]>([]);
  const uploadIdRef = useRef(0);
  const certInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);
  const [pendingOpen, setPendingOpen] = useState(false);

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
      return;
    }
    if (step === 3 && hasCompany === "yes") {
      const regNo = form.companyRegNo.trim();
      if (regNo && !regNo.toUpperCase().startsWith("CS")) {
        setRegError('Error: Must start with "CS"');
        focusField("company-reg-no");
        return;
      }
      setRegError(null);
      // GRA organisational TIN: one letter (C, G, V, Q) + 10 digits.
      // True existence checks need the backend (Dojah lookup-tin).
      const tin = form.tinNumber.trim().replace(/[\s-]/g, "");
      if (tin && !/^[CGVQ]\d{10}$/i.test(tin)) {
        setTinError(
          "Error: Must start with C, G, V or Q, followed by 10 digits",
        );
        focusField("tin-number");
        return;
      }
      setTinError(null);
    }
    if (step < 4) {
      goToStep((step + 1) as LandlordOnboardingStep);
    } else {
      // TODO: submit the onboarding payload when the backend is live.
      setPendingOpen(true);
    }
  }

  function handlePendingClose() {
    setPendingOpen(false);
  }

  function handleGoToDashboard() {
    navigate("/dashboard", { state: { verificationPending: true } });
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

  function handleResendCode() {
    // TODO: re-request the SMS code when the backend is live.
    setCode("");
  }

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget;
    if (name === "companyRegNo" && regError) setRegError(null);
    if (name === "tinNumber" && tinError) setTinError(null);
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

  function handleOfficePhoneCodeChange(code: string) {
    setOfficePhoneCode(code);
  }

  function mintUploadId() {
    uploadIdRef.current += 1;
    return `upload-${uploadIdRef.current}`;
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function addCertFiles(files: FileList | null) {
    pushUploads(files, setCerts, mintUploadId);
  }

  function addIdFiles(files: FileList | null) {
    pushUploads(files, setIdDocs, mintUploadId);
  }

  function handleCertDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    if (id) setCerts((prev) => prev.filter((cert) => cert.id !== id));
  }

  function handleCertClick() {
    certInputRef.current?.click();
  }

  function handleCertChange(event: React.ChangeEvent<HTMLInputElement>) {
    addCertFiles(event.target.files);
  }

  function handleCertDrop(event: React.DragEvent) {
    event.preventDefault();
    addCertFiles(event.dataTransfer.files);
  }

  function handleIdTypeChange(value: string) {
    setIdType(value);
  }

  function handleIdPick() {
    idInputRef.current?.click();
  }

  function handleIdFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    addIdFiles(event.target.files);
  }

  function handleIdDrop(event: React.DragEvent) {
    event.preventDefault();
    addIdFiles(event.dataTransfer.files);
  }

  function handleIdDocDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    if (id) setIdDocs((prev) => prev.filter((doc) => doc.id !== id));
  }

  function handleSelfieClick() {
    selfieInputRef.current?.click();
  }

  function handleSelfieChange(event: React.ChangeEvent<HTMLInputElement>) {
    addIdFiles(event.target.files);
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
      <PendingVerificationModal
        open={pendingOpen}
        onClose={handlePendingClose}
        onGoToDashboard={handleGoToDashboard}
      />
      <MobileStepper currentStep={step} />
      {codeSent ? (
        <VerifyPhoneStep
          dialCode={dialCode}
          maskedPhone={maskPhoneNumber(form.phoneNumber)}
          code={code}
          onCodeChange={handleCodeChange}
          verifying={verifying}
          onVerifySubmit={handleVerifySubmit}
          onResendCode={handleResendCode}
        />
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
              <PersonalInfoStep
                form={form}
                onFieldChange={handleFieldChange}
                phoneCode={phoneCode}
                onPhoneCodeChange={handlePhoneCodeChange}
                avatarPreview={avatarPreview}
                avatarInputRef={avatarInputRef}
                onAvatarClick={handleAvatarClick}
                onAvatarChange={handleAvatarChange}
              />
            )}

            {step === 2 && (
              <ProfessionalInfoStep
                form={form}
                onFieldChange={handleFieldChange}
                specialization={specialization}
                onSpecializationChange={handleSpecializationChange}
              />
            )}

            {step === 3 && (
              <CompanyInfoStep
                form={form}
                onFieldChange={handleFieldChange}
                hasCompany={hasCompany}
                onHasCompanyChange={handleHasCompanyChange}
                officePhoneCode={officePhoneCode}
                onOfficePhoneCodeChange={handleOfficePhoneCodeChange}
                certs={certs}
                certInputRef={certInputRef}
                onCertClick={handleCertClick}
                onCertChange={handleCertChange}
                onCertDragOver={handleDragOver}
                onCertDrop={handleCertDrop}
                onCertDelete={handleCertDelete}
                regError={regError}
                tinError={tinError}
              />
            )}

            {step === 4 && (
              <IdVerificationStep
                form={form}
                onFieldChange={handleFieldChange}
                idType={idType}
                onIdTypeChange={handleIdTypeChange}
                idDocs={idDocs}
                idInputRef={idInputRef}
                onIdPick={handleIdPick}
                onIdFileChange={handleIdFileChange}
                onIdDragOver={handleDragOver}
                onIdDrop={handleIdDrop}
                onIdDocDelete={handleIdDocDelete}
                selfieInputRef={selfieInputRef}
                onSelfieClick={handleSelfieClick}
                onSelfieChange={handleSelfieChange}
              />
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
