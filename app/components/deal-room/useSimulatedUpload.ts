import { useEffect, useRef, useState } from "react";
import type { DealUpload } from "~/types";

/** Pace of the simulated upload progress. */
const UPLOAD_TICK_MS = 150;
const UPLOAD_TICK_STEP = 7;

/** Simulates a document upload against a requirement: picking a file from
 *  the hidden input sets it uploading, the progress ticking up to full over
 *  a couple of seconds, until the renter deletes it. */
export function useSimulatedUpload(initial?: DealUpload) {
  const [upload, setUpload] = useState<DealUpload | null>(initial ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimer() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  /* Stop the simulated progress once the bar fills. */
  useEffect(() => {
    if (upload && upload.progress >= 100) clearTimer();
  }, [upload]);

  /* Clear the timer if the row unmounts mid-upload. */
  useEffect(() => clearTimer, []);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    /* Reset the input so picking the same file again re-fires change. */
    input.value = "";
    if (!file) return;
    clearTimer();
    setUpload({ fileName: file.name, progress: 0 });
    timerRef.current = setInterval(() => {
      setUpload((current) =>
        current
          ? {
              ...current,
              progress: Math.min(current.progress + UPLOAD_TICK_STEP, 100),
            }
          : current,
      );
    }, UPLOAD_TICK_MS);
  }

  function handleDeleteClick() {
    clearTimer();
    setUpload(null);
  }

  return {
    upload,
    inputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteClick,
  };
}
