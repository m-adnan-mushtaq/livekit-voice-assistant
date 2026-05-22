import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEYS, DEFAULT_TIME_ZONE, TIME_ZONES } from "../../common";
import * as shiftService from "../../services/shift.service";
import type { ShiftSettingsPayload } from "../../types/api";
import WeekdayPicker from "./WeekdayPicker";
import { getApiErrorMessage } from "../../services/api";

function timeToInput(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  return value.slice(0, 5);
}

export default function ShiftSettingsForm() {
  const queryClient = useQueryClient();
  const settingsQuery = useQuery({
    queryKey: [CACHE_KEYS.SHIFT_SETTINGS],
    queryFn: shiftService.fetchShiftSettings,
  });

  const [weekdays, setWeekdays] = useState<number[]>([0, 1, 2, 3, 4]);
  const [name, setName] = useState("Studio hours");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(60);
  const [timeZone, setTimeZone] = useState(DEFAULT_TIME_ZONE);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = settingsQuery.data;
    if (!data) return;
    setWeekdays(data.weekdays ?? []);
    setName(data.name ?? "Studio hours");
    setDescription(data.description ?? "");
    setStartTime(timeToInput(data.start_time, "09:00"));
    setEndTime(timeToInput(data.end_time, "17:00"));
    setDuration(data.duration_minutes ?? 60);
    setTimeZone(data.time_zone ?? DEFAULT_TIME_ZONE);
  }, [settingsQuery.data]);

  const saveMutation = useMutation({
    mutationFn: (payload: ShiftSettingsPayload) =>
      shiftService.saveShiftSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.SHIFT_SETTINGS] });
      setError("");
    },
    onError: (err) => {
      setError(getApiErrorMessage(err, "Could not save shift settings."));
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (weekdays.length === 0) {
      setError("Select at least one weekday.");
      return;
    }
    const payload: ShiftSettingsPayload = {
      weekdays,
      name,
      description,
      start_time: `${startTime}:00`,
      end_time: `${endTime}:00`,
      duration_minutes: duration,
      time_zone: timeZone,
    };
    saveMutation.mutate(payload);
  };

  if (settingsQuery.isLoading) {
    return <p className="text-on-surface-variant">Loading settings...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-display-lg text-headline-md text-on-surface">
          Shift settings
        </h2>
        <p className="mt-2 font-body-md text-on-surface-variant">
          Configure when clients can book sessions through Alexa.
        </p>
      </div>

      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
        <p className="mb-4 font-label-caps text-label-caps text-on-surface-variant">
          Working days
        </p>
        <WeekdayPicker selected={weekdays} onChange={setWeekdays} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Start time
          </span>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/40 px-4 py-3"
          />
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            End time
          </span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/40 px-4 py-3"
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Time zone
          </span>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 outline-none focus:border-primary"
          >
            {TIME_ZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <p className="font-body-sm text-on-surface-variant">
            Start and end times apply in this time zone.
          </p>
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Slot duration (minutes)
          </span>
          <input
            type="number"
            min={15}
            step={15}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full rounded-xl border border-outline-variant/40 px-4 py-3"
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/40 px-4 py-3"
          />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Description
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-outline-variant/40 px-4 py-3"
          />
        </label>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
      {saveMutation.isSuccess && (
        <p className="text-sm text-primary">Settings saved.</p>
      )}

      <button
        type="submit"
        disabled={saveMutation.isPending}
        className="rounded-full bg-primary px-8 py-3 font-label-caps text-label-caps text-on-primary disabled:opacity-60"
      >
        {saveMutation.isPending ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
