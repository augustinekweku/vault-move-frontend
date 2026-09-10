import { useState } from "react";
import type { ListingDetailsForm } from "~/types";
import { Button } from "~/components/ui/Button";
import { CreateListingSteps } from "~/components/listing/CreateListingSteps";
import { PropertyDetailsStep } from "~/components/listing/steps/PropertyDetailsStep";
import { LocationStep } from "~/components/listing/steps/LocationStep";

const INITIAL_FORM: ListingDetailsForm = {
  title: "",
  description: "",
  propertyType: "",
  listingType: "",
  furnishing: "",
  bedrooms: "",
  availability: "",
  bathrooms: "",
  buildingCondition: "",
  address: "",
  area: "",
  city: "",
  closestLandmark: "",
};

/** Highest step with a built panel — bump as each step file lands. */
const HIGHEST_BUILT_STEP = 2;

/** Create-listing wizard shell: heading plus the step rail on white, the
 *  active step panel on the grey surface. The panel starts flush under the
 *  portal header and stretches to at least the viewport height; each step
 *  panel lives in its own file under `steps/`. */
export function CreateListingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(value: string, name?: string) {
    if (!name) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLandmarkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setForm((prev) => ({ ...prev, closestLandmark: value }));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, HIGHEST_BUILT_STEP));
  }

  return (
    <div className="grid lg:grid-cols-[27rem_minmax(0,1fr)]">
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-base font-medium text-ink">Create a new listing</h2>
        <CreateListingSteps
          currentStep={currentStep}
          className="mt-6 md:mt-9"
        />
      </div>

      {/* Deeper top offset on desktop so the first field starts level
          with the first step. */}
      <section className="min-h-[calc(100dvh-4rem)] bg-surface px-5 py-8 sm:px-10 lg:pt-19">
        <div className="max-w-191.5">
          {currentStep === 1 && (
            <PropertyDetailsStep
              form={form}
              onFieldChange={handleFieldChange}
              onSelectChange={handleSelectChange}
            />
          )}
          {currentStep === 2 && (
            <LocationStep
              form={form}
              onFieldChange={handleFieldChange}
              onSelectChange={handleSelectChange}
              onLandmarkChange={handleLandmarkChange}
            />
          )}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
            {currentStep === 1 ? (
              <Button
                to="/dashboard"
                variant="outline"
                size="sm"
                className="bg-white px-6"
              >
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                className="bg-white px-6"
              >
                Back
              </Button>
            )}
            <div className="flex flex-wrap gap-3">
              <Button
                to="/dashboard"
                variant="outline"
                size="sm"
                className="border-line bg-white px-6 font-normal text-muted-700 hover:bg-surface"
              >
                Cancel
              </Button>
              {currentStep < HIGHEST_BUILT_STEP ? (
                <Button size="sm" className="px-6" onClick={goNext}>
                  Save and continue
                </Button>
              ) : (
                /* The next step isn't built yet, so saving stays inert. */
                <Button size="sm" className="px-6">
                  Save and continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
