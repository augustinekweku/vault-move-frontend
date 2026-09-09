/** Featured-icon dropzone shared by the certificate and ID uploaders: click
 *  anywhere to browse, or drag files straight onto it. */
export function UploadDropzone({
  inputRef,
  accept,
  multiple,
  onPick,
  onFileChange,
  onDragOver,
  onDrop,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  accept: string;
  multiple?: boolean;
  onPick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onPick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="flex w-full flex-col items-center rounded-xl border border-line bg-white px-4 py-6 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <img
          src="/icons/upload-icon.svg"
          alt=""
          aria-hidden
          className="size-11"
        />
        <span className="mt-3 text-[15px]">
          <span className="font-semibold text-ink">Click to upload</span>{" "}
          <span className="text-muted-500">or drag and drop</span>
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        tabIndex={-1}
        aria-hidden
        className="hidden"
        onChange={onFileChange}
      />
    </>
  );
}
