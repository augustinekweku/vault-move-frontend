import { Field, Input } from "~/components/ui/Input";
import { PhoneCodeMenu } from "~/components/onboarding/PhoneCodeMenu";
import type { OnboardingForm } from "~/types";

type FieldChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

/** Step 1 — personal information: avatar, address, GPS address and the phone
 *  number that the next screen verifies. Purely presentational; the wizard
 *  shell owns every piece of state. */
export function PersonalInfoStep({
  form,
  onFieldChange,
  phoneCode,
  onPhoneCodeChange,
  avatarPreview,
  avatarInputRef,
  onAvatarClick,
  onAvatarChange,
}: {
  form: Pick<OnboardingForm, "address" | "gpsAddress" | "phoneNumber">;
  onFieldChange: FieldChange;
  phoneCode: string;
  onPhoneCodeChange: (code: string) => void;
  avatarPreview: string | null;
  avatarInputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarClick: () => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="flex justify-center pb-2">
        <button
          type="button"
          onClick={onAvatarClick}
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
          onChange={onAvatarChange}
        />
      </div>
      <Input
        label="Address"
        name="address"
        placeholder="Enter address here"
        autoComplete="street-address"
        value={form.address}
        onChange={onFieldChange}
        required
      />
      <Input
        label="GPS Address"
        name="gpsAddress"
        placeholder="eg GW-200-2200"
        value={form.gpsAddress}
        onChange={onFieldChange}
      />
      <Field label="Phone number">
        <div className="flex h-11 w-full items-stretch rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-within:border-brand">
          <PhoneCodeMenu value={phoneCode} onChange={onPhoneCodeChange} />
          <span aria-hidden className="my-3 w-px shrink-0 bg-line-soft" />
          <input
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            placeholder="(57) 1543210"
            value={form.phoneNumber}
            onChange={onFieldChange}
            required
            className="h-full min-w-0 flex-1 rounded-r-lg bg-transparent px-3 text-[15px] text-ink placeholder:text-muted-500 focus:outline-none"
          />
        </div>
      </Field>
    </>
  );
}
