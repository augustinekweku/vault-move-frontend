import { useRef, useState } from "react";
import type { ListingDetailsForm, UploadedFile } from "~/types";
import { scrollToTop } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Toast } from "~/components/ui/Toast";
import { CreateListingSteps } from "~/components/listing/CreateListingSteps";
import { PropertyDetailsStep } from "~/components/listing/steps/PropertyDetailsStep";
import { LocationStep } from "~/components/listing/steps/LocationStep";
import { PricingStep } from "~/components/listing/steps/PricingStep";
import { FeaturesStep } from "~/components/listing/steps/FeaturesStep";
import { AmenitiesStep } from "~/components/listing/steps/AmenitiesStep";
import { HouseRulesStep } from "~/components/listing/steps/HouseRulesStep";
import { MediaUploadsStep } from "~/components/listing/steps/MediaUploadsStep";
import { LegalDocumentsStep } from "~/components/listing/steps/LegalDocumentsStep";
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
const HIGHEST_BUILT_STEP = 8;

/** Append picked files to a media list with a simulated progress bump —
 *  mirrors the onboarding uploaders until the listings API is live. */
function pushMediaUploads(
  files: FileList | File[] | null,
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

/** Portal audience creating the listing — only step 8 differs: landlords
 *  prove ownership while agents and developers prove authority to list. */
export type ListingAudience = "landlord" | "agent" | "developer";

/** Create-listing wizard shell: each step panel lives in its own file under
 * `steps/`. */
export function CreateListingFlow({
  audience = "landlord",
}: {
  audience?: ListingAudience;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [propertyImages, setPropertyImages] = useState<UploadedFile[]>([]);
  const [propertyVideos, setPropertyVideos] = useState<UploadedFile[]>([]);
  const [ownershipDocs, setOwnershipDocs] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const uploadIdRef = useRef(0);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const videosInputRef = useRef<HTMLInputElement>(null);
  const ownershipInputRef = useRef<HTMLInputElement>(null);

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

  function closeUploadError() {
    setUploadError(null);
  }

  /** Keep only files matching the dropzone kind, flagging the first definite
   *  mismatch with the error toast. Files with an unknown type pass — the
   *  picker and dropzone already hint the accepted kinds. */
  function takeMatchingFiles(
    files: FileList | null,
    kind: "image" | "video",
  ): File[] {
    const picked = files ? Array.from(files) : [];
    const mismatch = picked.find(
      (file) => file.type !== "" && !file.type.startsWith(`${kind}/`),
    );
    if (mismatch) setUploadError(mismatch.name);
    return picked.filter(
      (file) => file.type === "" || file.type.startsWith(`${kind}/`),
    );
  }

  function pickImages() {
    imagesInputRef.current?.click();
  }

  function pickVideos() {
    videosInputRef.current?.click();
  }

  function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    pushMediaUploads(
      takeMatchingFiles(event.currentTarget.files, "image"),
      setPropertyImages,
      mintMediaId,
    );
    event.currentTarget.value = "";
  }

  function handleVideosChange(event: React.ChangeEvent<HTMLInputElement>) {
    pushMediaUploads(
      takeMatchingFiles(event.currentTarget.files, "video"),
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
    pushMediaUploads(
      takeMatchingFiles(event.dataTransfer.files, "image"),
      setPropertyImages,
      mintMediaId,
    );
  }

  function handleVideosDrop(event: React.DragEvent) {
    event.preventDefault();
    pushMediaUploads(
      takeMatchingFiles(event.dataTransfer.files, "video"),
      setPropertyVideos,
      mintMediaId,
    );
  }

  function handleImageDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    setPropertyImages((prev) => prev.filter((file) => file.id !== id));
  }

  function handleVideoDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    setPropertyVideos((prev) => prev.filter((file) => file.id !== id));
  }

  function pickOwnershipDocs() {
    ownershipInputRef.current?.click();
  }

  function handleOwnershipDocsChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    pushMediaUploads(
      event.currentTarget.files,
      setOwnershipDocs,
      mintMediaId,
    );
    event.currentTarget.value = "";
  }

  function handleOwnershipDocsDrop(event: React.DragEvent) {
    event.preventDefault();
    pushMediaUploads(
      event.dataTransfer.files,
      setOwnershipDocs,
      mintMediaId,
    );
  }

  function handleOwnershipDocDelete(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const id = event.currentTarget.dataset.id;
    setOwnershipDocs((prev) => prev.filter((file) => file.id !== id));
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
        {uploadError && (
          <Toast
            variant="error"
            title="Error."
            message={`Failed to upload ${uploadError}`}
            onClose={closeUploadError}
          />
        )}
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
          {currentStep === 8 && (
            <LegalDocumentsStep
              variant={audience === "landlord" ? "ownership" : "authority"}
              documents={ownershipDocs}
              documentsInputRef={ownershipInputRef}
              onPickDocuments={pickOwnershipDocs}
              onDocumentsChange={handleOwnershipDocsChange}
              onDragOver={handleMediaDragOver}
              onDocumentsDrop={handleOwnershipDocsDrop}
              onDocumentDelete={handleOwnershipDocDelete}
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
                /* TODO: preview the created draft id once the listings API is
                   live — listing-1 stands in until then. */
                <Button
                  to="/dashboard/listings/listing-1/preview"
                  size="sm"
                  className="px-6"
                >
                  Save and preview
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
