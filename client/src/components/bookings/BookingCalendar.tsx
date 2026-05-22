import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEYS, ROUTES } from "../../common";
import * as bookingService from "../../services/booking.service";
import type { Booking } from "../../types/api";
import {
  daysInMonth,
  formatMonthYear,
  formatTimeRange,
  monthRange,
  toDateKey,
} from "../../utils/date";
import Modal from "../ui/Modal";
import { isAdmin } from "../../utils/user";
import { useAuth } from "../../context/AuthContext";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary-fixed text-on-secondary-fixed",
  confirmed: "bg-primary-container text-on-primary-container",
  rejected: "bg-error-container text-on-error-container",
  cancelled: "bg-surface-variant text-on-surface-variant",
  completed: "bg-tertiary-fixed text-on-tertiary-fixed",
};

function bookingsForDay(bookings: Booking[], day: Date) {
  const key = toDateKey(day);
  return bookings.filter((b) => toDateKey(new Date(b.start_time)) === key);
}

function BookingPreview({ booking }: { booking: Booking }) {
  return (
    <div className="rounded-xl border border-outline-variant/30 p-4">
      <p className="font-body-md text-on-surface">
        {formatTimeRange(booking.start_time, booking.end_time)}
      </p>
      <p className="mt-1 text-sm text-on-surface-variant">
        {booking.session_type}
      </p>
      <p className="mt-2 text-sm">Client: {booking.customer.full_name}</p>
      <p className="text-sm">Staff: {booking.staff.full_name}</p>
      {(booking.yoga_goal || booking.experience_level) && (
        <p className="mt-2 line-clamp-2 text-xs text-on-surface-variant">
          {[booking.experience_level, booking.yoga_goal]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
      <span
        className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs capitalize ${STATUS_STYLES[booking.status] ?? "bg-surface-variant"}`}
      >
        {booking.status}
      </span>
      <Link
        to={ROUTES.bookingDetail(booking.id)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        View full details
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </Link>
    </div>
  );
}

export default function BookingCalendar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const admin = isAdmin(user);
  const queryClient = useQueryClient();
  const [month, setMonth] = useState(() => new Date());
  const [selected, setSelected] = useState<Booking[]>([]);

  const range = monthRange(month);
  const bookingsQuery = useQuery({
    queryKey: [CACHE_KEYS.BOOKINGS, range.start_date, range.end_date],
    queryFn: () => bookingService.fetchBookings(range),
  });

  const approveMutation = useMutation({
    mutationFn: bookingService.approveBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.BOOKINGS] });
      setSelected([]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => bookingService.rejectBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.BOOKINGS] });
      setSelected([]);
    },
  });

  const bookings = bookingsQuery.data ?? [];
  const { firstDay, totalDays, year, month: monthIndex } = daysInMonth(month);

  const cells = useMemo(() => {
    const list: Array<{ day: number | null; date: Date | null }> = [];
    for (let i = 0; i < firstDay; i += 1) list.push({ day: null, date: null });
    for (let d = 1; d <= totalDays; d += 1) {
      list.push({ day: d, date: new Date(year, monthIndex, d) });
    }
    return list;
  }, [firstDay, totalDays, year, monthIndex]);

  const shiftMonth = (delta: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
  };

  const openDay = (date: Date) => {
    const dayBookings = bookingsForDay(bookings, date);
    if (dayBookings.length === 1) {
      navigate(ROUTES.bookingDetail(dayBookings[0].id));
      return;
    }
    if (dayBookings.length > 1) setSelected(dayBookings);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display-lg text-headline-md text-on-surface">
            Bookings
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Sessions booked via Alexa voice assistant.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="rounded-full border border-outline-variant px-3 py-2"
            aria-label="Previous month"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <span className="min-w-[10rem] text-center font-headline-md text-title-md">
            {formatMonthYear(month)}
          </span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-full border border-outline-variant px-3 py-2"
            aria-label="Next month"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

      {bookingsQuery.isLoading && (
        <p className="text-on-surface-variant">Loading calendar...</p>
      )}

      <div className="grid grid-cols-7 gap-2 text-center font-label-caps text-label-caps text-on-surface-variant">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((cell, idx) => {
          if (!cell.date || cell.day === null) {
            return <div key={`empty-${idx}`} className="min-h-24" />;
          }
          const dayBookings = bookingsForDay(bookings, cell.date);
          return (
            <button
              key={cell.day}
              type="button"
              onClick={() => openDay(cell.date!)}
              className="min-h-24 rounded-xl border border-outline-variant/30 bg-surface-container-low p-2 text-left transition hover:border-primary/40"
            >
              <span className="font-body-sm text-on-surface">{cell.day}</span>
              <div className="mt-1 space-y-1">
                {dayBookings.slice(0, 2).map((b) => (
                  <span
                    key={b.id}
                    className={`block truncate rounded px-1 py-0.5 text-[10px] capitalize ${STATUS_STYLES[b.status] ?? "bg-surface-variant"}`}
                  >
                    {b.status}
                  </span>
                ))}
                {dayBookings.length > 2 && (
                  <span className="text-[10px] text-primary">
                    +{dayBookings.length - 2} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Modal
        open={selected.length > 0}
        title={selected.length > 1 ? "Bookings" : "Booking details"}
        onClose={() => setSelected([])}
        wide
      >
        <div className="max-h-[60vh] space-y-4 overflow-y-auto">
          {selected.map((booking) => (
            <div key={booking.id}>
              <BookingPreview booking={booking} />
              {admin && booking.status === "pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    disabled={approveMutation.isPending}
                    onClick={() => approveMutation.mutate(booking.id)}
                    className="rounded-full bg-primary px-4 py-2 text-sm text-on-primary"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={rejectMutation.isPending}
                    onClick={() => rejectMutation.mutate(booking.id)}
                    className="rounded-full border border-error px-4 py-2 text-sm text-error"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
