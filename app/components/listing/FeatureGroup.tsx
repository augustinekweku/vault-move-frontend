export type RadioGroupChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

/** One titled radio group of the wizard's option steps, with its own inert
 *  "Add new" action indented to the option text. Shared by the features and
 *  amenities steps. */
export function FeatureGroup({
  title,
  name,
  options,
  value,
  onChange,
}: {
  title: string;
  name: string;
  options: string[];
  value: string;
  onChange: RadioGroupChange;
}) {
  function renderOption(option: string) {
    return (
      <label
        key={option}
        className="flex w-fit cursor-pointer items-center gap-3 text-[15px] text-ink"
      >
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={onChange}
          className="size-4 cursor-pointer accent-brand"
        />
        {option}
      </label>
    );
  }

  return (
    <fieldset>
      <legend className="text-[15px] font-semibold text-ink">{title}</legend>
      <div className="mt-4 flex flex-col gap-4">
        {options.map(renderOption)}
      </div>
      {/* Custom options aren't supported yet, so the action stays inert. */}
      <button
        type="button"
        className="mt-4 ml-7 self-start text-sm text-ink underline underline-offset-2"
      >
        Add new
      </button>
    </fieldset>
  );
}
