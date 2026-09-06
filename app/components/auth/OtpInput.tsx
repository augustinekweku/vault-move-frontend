import { useRef } from "react";

const LENGTH = 4;

interface OtpInputProps {
  value: string;
  onChange: (code: string) => void;
}

/** 4-box one-time-code input: auto-advances on entry, moves back on
 *  Backspace, and supports pasting the full code. */
export function OtpInput({ value, onChange }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  function update(index: number, next: string[]) {
    onChange(next.join("").trimEnd());
    if (index < LENGTH - 1) inputsRef.current[index + 1]?.focus();
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit && raw) return; // reject non-digits
    const next = [...digits];
    next[index] = digit || " ";
    if (digit) update(index, next);
    else onChange(next.join("").trimEnd());
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && digits[index] === " " && index > 0) {
      const next = [...digits];
      next[index - 1] = " ";
      onChange(next.join("").trimEnd());
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  }

  return (
    <div className="flex w-full justify-between">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${i + 1}`}
          maxLength={1}
          value={digit.trim()}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="size-17.25 rounded-lg border border-line bg-white text-center text-xl text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none"
        />
      ))}
    </div>
  );
}
