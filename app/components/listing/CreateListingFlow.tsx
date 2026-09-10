import { useRef, useState } from "react";
import type { ListingDetailsForm, UploadedFile } from "~/types";
import { scrollToTop } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { CreateListingSteps } from "~/components/listing/CreateListingSteps";
import { PropertyDetailsStep } from "~/components/listing/steps/PropertyDetailsStep";
import { LocationStep } from "~/components/listing/steps/LocationStep";
import { PricingStep } from "~/components/listing/steps/PricingStep";
import { FeaturesStep } from "~/components/listing/steps/FeaturesStep";
import { AmenitiesStep } from "~/components/listing/steps/AmenitiesStep";
import { HouseRulesStep } from "~/components/listing/steps/HouseRulesStep";
import { MediaUploadsStep } from "~/components/listing/steps/MediaUploadsStep";

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
  monthlyRent: "",
  securityDeposit: "",
  paymentFrequency: "",
  rentDuration: "",
  serviceCharge: "",
  serviceChargeFrequency: "",
  interiorFeatures: "",
  parking: "",
  buildingFeatures: "",
  amenities: "",
  petsAllowed: "",
  smokingAllowed: "",
  partiesAllowed: "",
  maxOccupants: "",
  noiseRestrictions: "",
  additionalTerms: "",
};

/** Highest step with a built panel — bump as each step file lands. */
const HIGHEST_BUILT_STEP = 7;

/** Append picked files to a media list with a simulated progress bump —
 *  mirrors the onboarding uploaders until the listings API is live. */
function pushMediaUploads(
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

/** Create-listing wizard shell: heading plus the step rail on white, the
 *  active step panel on the grey surface. The panel starts flush under the
 *  portal header and stretches to at least the viewport height; each step
 *  panel lives in its own file under `steps/`. */
export function CreateListingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [propertyImages, setPropertyImages] = useState<UploadedFile[]>([]);
  const [propertyVideos, setPropertyVideos] = useState<UploadedFile[]>([]);
  const uploadIdRef = useRef(0);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const videosInputRef = useRef<HTMLInputElement>(null);

  function mintMediaId() {
    uploadIdRef.current += 1;
    return `media-${uploadIdRef.current}`;
  }

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

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function pickImages() {
    imagesInputRef.current?.click();
  }

  function pickVideos() {
    videosInputRef.current?.click();
  }

  function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    pushMediaUploads(
      event.currentTarget.files,
      setPropertyImages,
      mintMediaId,
    );
    event.currentTarget.value = "";
  }

  function handleVideosChange(event: React.ChangeEvent<HTMLInputElement>) {
    pushMediaUploads(
      event.currentTarget.files,
      setPropertyVideos,
      mintMediaId,
    );
    event.currentTarget.value = "";
  }

  function handleMediaDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleImagesDrop(event: React.DragEvent) {
    event.preventDefault();
    pushMediaUploads(event.dataTransfer.files, setPropertyImages, mintMediaId);
  }

  function handleVideosDrop(event: React.DragEvent) {
    event.preventDefault();
    pushMediaUploads(event.dataTransfer.files, setPropertyVideos, mintMediaId);
  }

  function handleImageDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    setPropertyImages((prev) => prev.filter((file) => file.id !== id));
  }

  function handleVideoDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    setPropertyVideos((prev) => prev.filter((file) => file.id !== id));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
    scrollToTop();
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, HIGHEST_BUILT_STEP));
    scrollToTop();
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
      <section className="flex min-h-[calc(100dvh-4rem)] flex-col bg-surface px-5 pt-8 pb-6 sm:px-10 lg:pt-19">
        {/* Full-height column so the footer rests at the foot of tall
            viewports on every step. */}
        <div className="flex max-w-191.5 flex-1 flex-col">
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
              onRadioChange={handleRadioChange}
            />
          )}
          {currentStep === 3 && (
            <PricingStep
              form={form}
              onFieldChange={handleFieldChange}
              onSelectChange={handleSelectChange}
            />
          )}
          {currentStep === 4 && (
            <FeaturesStep form={form} onRadioChange={handleRadioChange} />
          )}
          {currentStep === 5 && (
            <AmenitiesStep form={form} onRadioChange={handleRadioChange} />
          )}
          {currentStep === 6 && (
            <HouseRulesStep
              form={form}
              onFieldChange={handleFieldChange}
              onSelectChange={handleSelectChange}
            />
          )}
          {currentStep === 7 && (
            <MediaUploadsStep
              images={propertyImages}
              videos={propertyVideos}
              imagesInputRef={imagesInputRef}
              videosInputRef={videosInputRef}
              onPickImages={pickImages}
              onPickVideos={pickVideos}
              onImagesChange={handleImagesChange}
              onVideosChange={handleVideosChange}
              onDragOver={handleMediaDragOver}
              onImagesDrop={handleImagesDrop}
              onVideosDrop={handleVideosDrop}
              onImageDelete={handleImageDelete}
              onVideoDelete={handleVideoDelete}
            />
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-12 lg:pt-5">
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
