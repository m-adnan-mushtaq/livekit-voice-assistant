type BookingSummaryProps = {
  hasConversation: boolean;
};

const fields = [
  { key: "goal", label: "Goal", wide: false },
  { key: "level", label: "Level", wide: false },
  { key: "session", label: "Session", wide: false },
  { key: "time", label: "Time", wide: false },
  { key: "instructor", label: "Instructor Preference", wide: true },
] as const;

export default function BookingSummary({ hasConversation }: BookingSummaryProps) {
  return (
    <div className="group relative mt-10 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container p-6 shadow-sm md:p-8">
      <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
        <span className="material-symbols-outlined text-[80px]">spa</span>
      </div>

      <h3 className="mb-6 font-headline-sm text-headline-sm text-primary">
        Booking Summary
      </h3>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.wide ? "col-span-2" : undefined}
          >
            <p className="mb-1 font-label-caps text-[10px] text-on-surface-variant">
              {field.label}
            </p>
            <p className="font-body-md font-semibold text-on-surface-variant/60">
              {hasConversation ? "Gathering details…" : "—"}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!hasConversation}
        className="mt-8 w-full rounded-full bg-primary py-4 font-label-caps text-label-caps text-on-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        Confirm Booking Request
      </button>
    </div>
  );
}
