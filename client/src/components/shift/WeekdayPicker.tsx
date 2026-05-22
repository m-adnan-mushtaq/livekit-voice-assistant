import { WEEKDAYS } from "../../common";

type WeekdayPickerProps = {
  selected: number[];
  onChange: (weekdays: number[]) => void;
};

export default function WeekdayPicker({ selected, onChange }: WeekdayPickerProps) {
  const toggle = (value: number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((d) => d !== value));
    } else {
      onChange([...selected, value].sort((a, b) => a - b));
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {WEEKDAYS.map((day) => {
        const active = selected.includes(day.value);
        return (
          <button
            key={day.value}
            type="button"
            title={day.full}
            onClick={() => toggle(day.value)}
            className={`flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 font-label-caps text-label-caps transition-all ${
              active
                ? "border-primary bg-primary text-on-primary shadow-md scale-105"
                : "border-outline-variant/50 bg-surface-container-low text-on-surface-variant hover:border-primary/50"
            }`}
          >
            <span>{day.label}</span>
          </button>
        );
      })}
    </div>
  );
}
