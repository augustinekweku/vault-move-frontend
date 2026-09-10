import type { UploadedFile } from "~/types";
import { CheckIcon } from "~/components/ui/icons";
import { UploadDropzone } from "~/components/onboarding/UploadDropzone";
import { UploadedFileList } from "~/components/onboarding/UploadedFileList";
import { MEDIA_GUIDELINES } from "~/data/listing";

/** Step 7 — media uploads: the guidance checklist plus the photo and video
 *  dropzones. File state lives in the wizard shell so picks survive step
 *  navigation. */
export function MediaUploadsStep({
  images,
  videos,
  imagesInputRef,
  videosInputRef,
  onPickImages,
  onPickVideos,
  onImagesChange,
  onVideosChange,
  onDragOver,
  onImagesDrop,
  onVideosDrop,
  onImageDelete,
  onVideoDelete,
}: {
  images: UploadedFile[];
  videos: UploadedFile[];
  imagesInputRef: React.RefObject<HTMLInputElement | null>;
  videosInputRef: React.RefObject<HTMLInputElement | null>;
  onPickImages: () => void;
  onPickVideos: () => void;
  onImagesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onVideosChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent) => void;
  onImagesDrop: (event: React.DragEvent) => void;
  onVideosDrop: (event: React.DragEvent) => void;
  onImageDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVideoDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  function renderGuideline(guideline: string) {
    return (
      <li key={guideline} className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white"
        >
          <CheckIcon className="size-3.5" />
        </span>
        <span className="text-[15px] leading-normal text-ink-soft">
          {guideline}
        </span>
      </li>
    );
  }

  return (
    <>
      <p className="text-[15px] leading-relaxed text-ink-soft">
        Upload clear, high-quality photos and videos that accurately showcase
        your property.
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {MEDIA_GUIDELINES.map(renderGuideline)}
      </ul>

      <h3 className="mt-7 md:mt-10 text-[15px] font-medium text-muted-700">
        Upload images of the property
      </h3>
      <div className="mt-4">
        <UploadDropzone
          inputRef={imagesInputRef}
          accept="image/*"
          multiple
          onPick={onPickImages}
          onFileChange={onImagesChange}
          onDragOver={onDragOver}
          onDrop={onImagesDrop}
        />
        <UploadedFileList files={images} onDelete={onImageDelete} />
      </div>

      <h3 className="mt-7 md:mt-10 text-[15px] font-medium text-muted-700">
        Upload Videos of the property
      </h3>
      <div className="mt-4">
        <UploadDropzone
          inputRef={videosInputRef}
          accept="video/*"
          multiple
          onPick={onPickVideos}
          onFileChange={onVideosChange}
          onDragOver={onDragOver}
          onDrop={onVideosDrop}
        />
        <UploadedFileList files={videos} onDelete={onVideoDelete} />
      </div>
    </>
  );
}
