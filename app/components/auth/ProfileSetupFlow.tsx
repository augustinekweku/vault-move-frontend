import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Field, Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";

const AREAS = [
  "Achimota",
  "Adjiringanor",
  "Airport Residential",
  "Cantonments",
  "East Legon",
  "Osu",
  "Tema",
  "Tesano",
];

const STEPS = [1, 2, 3] as const;
type Step = (typeof STEPS)[number];

const STEP_GUIDANCE: Record<Step, string> = {
  1: "Tell us the areas you would like to find properties from. You can change this anytime.",
  2: "Great! Now tell us your budget and your typical household size.",
  3: "Almost done! Tell us how soon you plan to move in.",
};

/** Profile setup wizard for new buyers/renters: three preference steps with
 *  a dot stepper (completed steps stay filled). */
export function ProfileSetupFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [timeFrame, setTimeFrame] = useState("");

  function handleNext() {
    if (step < 3) {
      setStep((step + 1) as Step);
    } else {
      // TODO: persist the entered preferences before leaving the wizard.
      navigate("/dashboard", { state: { profileCompleted: true } });
    }
  }

  return (
    <div>
      <h1 className="text-[29.08px] leading-9 font-semibold text-ink">
        Set up your profile.
      </h1>
      <p className="mt-1.5 text-lg leading-8 text-ink-soft">
        Add your preferences to complete your profile.
      </p>

      {/* Dot stepper */}
      <ol className="mt-10 flex justify-between">
        {STEPS.map((n) => (
          <li key={n} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "size-5 rounded-full",
                n <= step ? "bg-brand" : "bg-line-soft",
              )}
            />
            <span
              className={cn(
                "text-[11px]",
                n <= step ? "font-medium text-ink" : "text-muted-400",
              )}
            >
              0{n}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <p className="text-[14px] leading-6 text-ink-soft">
          {STEP_GUIDANCE[step]}
        </p>

        {step === 1 && (
          <Select
            wrapperClassName="mt-6"
            label="Area"
            placeholder="Select Area(s)"
            options={AREAS}
            value={area}
            onChange={setArea}
          />
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <Field label="Budget">
              <div className="relative">
                <input
                  name="budget"
                  inputMode="numeric"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="eg 3500 ghc"
                  className="h-11 w-full rounded-lg border border-line bg-white px-3.5 pr-16 text-[15px] text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none"
                />
                <span className="absolute inset-y-0 right-3.5 flex items-center text-[15px] text-muted-500">
                  /Month
                </span>
              </div>
            </Field>
            <Input
              label="Household size"
              name="householdSize"
              inputMode="numeric"
              placeholder="eg 5"
              value={householdSize}
              onChange={(e) => setHouseholdSize(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <Input
            wrapperClassName="mt-6"
            label="Move in time frame"
            name="timeFrame"
            placeholder="eg in 3 months"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          />
        )}
      </div>

      <Button onClick={handleNext} className="mt-10 md:mt-11 w-full">
        {step === 3 ? "Submit" : "Next"}
      </Button>

      <p className="mt-4 text-center text-xs text-muted-500">
        <Link to="/dashboard" className="hover:text-brand">
          Skip and do this later
        </Link>
      </p>
    </div>
  );
}
