import type { User } from "../../types/api";
import { formatDisplayDate, formatDateTime } from "../../utils/date";
import { getUserRole } from "../../utils/user";

type UserCardProps = {
  user: User;
  onToggleActive: (user: User) => void;
  isUpdating?: boolean;
};

type DetailItem = {
  icon: string;
  label: string;
  value: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildDetails(user: User): DetailItem[] {
  const items: DetailItem[] = [];

  if (user.phone?.trim()) {
    items.push({ icon: "call", label: "Phone", value: user.phone });
  }
  if (user.gender?.trim()) {
    items.push({ icon: "person", label: "Gender", value: user.gender });
  }
  if (user.specialization?.trim()) {
    items.push({
      icon: "self_improvement",
      label: "Specialization",
      value: user.specialization,
    });
  }
  const dob = formatDisplayDate(user.dob);
  if (dob) {
    items.push({ icon: "cake", label: "Date of birth", value: dob });
  }
  const lastLogin = formatDateTime(user.last_login_at);
  if (lastLogin) {
    items.push({ icon: "schedule", label: "Last login", value: lastLogin });
  }
  const joined = formatDisplayDate(user.created_at);
  if (joined) {
    items.push({ icon: "calendar_today", label: "Joined", value: joined });
  }

  return items;
}

function UserDetailRow({ icon, label, value }: DetailItem) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="material-symbols-outlined mt-0.5 text-base text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-label-caps text-[10px] uppercase tracking-wide text-on-surface-variant/80">
          {label}
        </p>
        <p className="font-body-sm text-on-surface">{value}</p>
      </div>
    </div>
  );
}

export default function UserCard({
  user,
  onToggleActive,
  isUpdating,
}: UserCardProps) {
  const role = getUserRole(user);
  const details = buildDetails(user);
  const avatarSrc = user.avatar_url?.trim() || null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low">
      <div className="flex gap-4 border-b border-outline-variant/20 bg-surface-container/50 p-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary-container">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary-container font-headline-md text-on-primary-container">
              {initials(user.name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-headline-md text-title-md text-on-surface">
              {user.name}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                user.is_active
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="mt-0.5 truncate font-body-sm text-on-surface-variant">
            {user.email}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-primary-container/50 px-2.5 py-0.5 font-label-caps text-[10px] capitalize text-on-primary-container">
              {role}
            </span>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 font-label-caps text-[10px] ${
                user.is_verified
                  ? "bg-tertiary-fixed text-on-tertiary-fixed"
                  : "bg-surface-variant text-on-surface-variant"
              }`}
            >
              {user.is_verified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>
      </div>

      {(details.length > 0 || user.bio?.trim()) && (
        <div className="px-5 py-3">
          {details.length > 0 && (
            <div className="divide-y divide-outline-variant/20">
              {details.map((item) => (
                <UserDetailRow key={item.label} {...item} />
              ))}
            </div>
          )}
          {user.bio?.trim() && (
            <blockquote className="mt-3 rounded-xl bg-surface-container/80 px-4 py-3 font-body-sm italic text-on-surface-variant">
              &ldquo;{user.bio}&rdquo;
            </blockquote>
          )}
        </div>
      )}

      {details.length === 0 && !user.bio?.trim() && (
        <p className="px-5 py-4 font-body-sm text-on-surface-variant/70">
          No profile details on file yet.
        </p>
      )}

      <div className="mt-auto border-t border-outline-variant/20 p-4">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => onToggleActive(user)}
          className="w-full rounded-full border border-primary px-4 py-2.5 font-label-caps text-label-caps text-primary transition hover:bg-primary/5 disabled:opacity-60"
        >
          {user.is_active ? "Deactivate" : "Reactivate"}
        </button>
      </div>
    </article>
  );
}
