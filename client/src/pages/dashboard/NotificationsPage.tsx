import { useQuery } from "@tanstack/react-query";
import { CACHE_KEYS } from "../../common";
import * as notificationService from "../../services/notification.service";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: [CACHE_KEYS.NOTIFICATIONS],
    queryFn: notificationService.fetchNotifications,
    refetchInterval: 3000,
    refetchOnMount: true,
  });

  return (
    <div className="max-w-2xl">
      <h2 className="font-display-lg text-headline-md text-on-surface">
        Notifications
      </h2>
      <p className="mt-2 font-body-md text-on-surface-variant">
        Updates about your bookings and sessions.
      </p>

      {isLoading && <p className="mt-8 text-on-surface-variant">Loading...</p>}

      <ul className="mt-8 space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-headline-md text-title-md text-on-surface">
                {n.title}
              </p>
              <span className="shrink-0 rounded-full bg-primary-container/60 px-2 py-0.5 text-xs capitalize text-on-primary-container">
                {n.type}
              </span>
            </div>
            <p className="mt-2 font-body-md text-on-surface-variant">
              {n.message}
            </p>
            <p className="mt-2 text-xs text-on-surface-variant/80">
              {formatDate(n.created_at)}
            </p>
          </li>
        ))}
      </ul>

      {!isLoading && notifications.length === 0 && (
        <p className="mt-8 text-on-surface-variant">No notifications yet.</p>
      )}
    </div>
  );
}
