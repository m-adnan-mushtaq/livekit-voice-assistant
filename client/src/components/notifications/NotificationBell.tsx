import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEYS, ROUTES } from "../../common";
import * as notificationService from "../../services/notification.service";

const PREVIEW_COUNT = 5;

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useQuery({
    queryKey: [CACHE_KEYS.NOTIFICATIONS],
    queryFn: notificationService.fetchNotifications,
    refetchInterval: 3000,
    refetchOnMount: true,
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const preview = notifications.slice(0, PREVIEW_COUNT);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-high hover:text-primary"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined">notifications</span>
        {notifications.length > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] text-on-error">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xl">
          <div className="border-b border-outline-variant/30 px-4 py-3">
            <p className="font-label-caps text-label-caps text-on-surface">
              Notifications
            </p>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {preview.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-on-surface-variant">
                No notifications yet
              </li>
            ) : (
              preview.map((n) => (
                <li
                  key={n.id}
                  className="border-b border-outline-variant/20 px-4 py-3 last:border-0"
                >
                  <p className="font-body-sm font-medium text-on-surface">
                    {n.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">
                    {n.message}
                  </p>
                </li>
              ))
            )}
          </ul>
          <Link
            to={ROUTES.NOTIFICATIONS}
            onClick={() => setOpen(false)}
            className="block border-t border-outline-variant/30 px-4 py-3 text-center text-sm text-primary hover:bg-surface-container-low"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
