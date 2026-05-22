import { Link } from "react-router";
import type { Booking } from "../../types/api";
import { ROUTES } from "../../common";
import { formatTimeRange } from "../../utils/date";
import MarkdownMessage from "../chat/MarkdownMessage";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary-fixed text-on-secondary-fixed",
  confirmed: "bg-primary-container text-on-primary-container",
  rejected: "bg-error-container text-on-error-container",
  cancelled: "bg-surface-variant text-on-surface-variant",
  completed: "bg-tertiary-fixed text-on-tertiary-fixed",
};

type BookingDetailContentProps = {
  booking: Booking;
  showBack?: boolean;
  adminActions?: React.ReactNode;
};

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="material-symbols-outlined mt-0.5 text-base text-primary">
        {icon}
      </span>
      <div>
        <p className="font-label-caps text-[10px] uppercase tracking-wide text-on-surface-variant">
          {label}
        </p>
        <p className="font-body-md text-on-surface">{value}</p>
      </div>
    </div>
  );
}

export default function BookingDetailContent({
  booking,
  showBack = true,
  adminActions,
}: BookingDetailContentProps) {
  return (
    <div className="max-w-3xl">
      {showBack && (
        <Link
          to={ROUTES.BOOKINGS}
          className="mb-6 inline-flex items-center gap-1 font-body-sm text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to bookings
        </Link>
      )}

      <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low">
        <div className="border-b border-outline-variant/20 bg-surface-container/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display-lg text-headline-md text-on-surface">
                {booking.session_type}
              </h2>
              <p className="mt-1 font-body-md text-on-surface-variant">
                {formatTimeRange(booking.start_time, booking.end_time)}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs capitalize ${STATUS_STYLES[booking.status] ?? "bg-surface-variant"}`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        <div className="grid gap-0 divide-y divide-outline-variant/20 px-6 sm:grid-cols-2 sm:divide-y-0">
          <div className="py-4 sm:border-r sm:border-outline-variant/20 sm:pr-6">
            <DetailRow
              icon="person"
              label="Client"
              value={`${booking.customer.full_name} · ${booking.customer.email}`}
            />
          </div>
          <div className="py-4 sm:pl-6">
            <DetailRow
              icon="self_improvement"
              label="Instructor"
              value={`${booking.staff.full_name} · ${booking.staff.email}`}
            />
          </div>
        </div>

        <div className="border-t border-outline-variant/20 px-6 py-4">
          <h3 className="mb-3 font-label-caps text-label-caps text-primary">
            Session profile
          </h3>
          <div className="divide-y divide-outline-variant/15 rounded-xl bg-surface-container/50 px-4">
            {booking.experience_level ? (
              <DetailRow
                icon="stairs"
                label="Experience level"
                value={booking.experience_level}
              />
            ) : (
              <p className="py-3 font-body-sm text-on-surface-variant">
                Experience level not recorded
              </p>
            )}
            {booking.yoga_goal ? (
              <DetailRow icon="flag" label="Yoga goal" value={booking.yoga_goal} />
            ) : (
              <p className="py-3 font-body-sm text-on-surface-variant">
                Yoga goal not recorded
              </p>
            )}
          </div>
        </div>

        {booking.conversation_summary && (
          <div className="border-t border-outline-variant/20 px-6 py-5">
            <h3 className="mb-3 font-label-caps text-label-caps text-primary">
              Alexa conversation summary
            </h3>
            <div className="rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-4">
              <MarkdownMessage source={booking.conversation_summary} />
            </div>
          </div>
        )}

        {booking.meeting_url && (
          <div className="border-t border-outline-variant/20 px-6 py-4">
            <a
              href={booking.meeting_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-caps text-label-caps text-on-primary hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-base">videocam</span>
              Join meeting
            </a>
          </div>
        )}

        {adminActions && (
          <div className="border-t border-outline-variant/20 px-6 py-4">
            {adminActions}
          </div>
        )}
      </div>
    </div>
  );
}
