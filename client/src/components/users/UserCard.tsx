import type { User } from "../../types/api";
import { getUserRole } from "../../utils/user";

type UserCardProps = {
  user: User;
  onToggleActive: (user: User) => void;
  isUpdating?: boolean;
};

export default function UserCard({
  user,
  onToggleActive,
  isUpdating,
}: UserCardProps) {
  const role = getUserRole(user);

  return (
    <article className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-headline-md text-title-md text-on-surface">
            {user.name}
          </h3>
          <p className="mt-1 font-body-sm text-on-surface-variant">{user.email}</p>
          <p className="mt-2 inline-flex rounded-full bg-primary-container/50 px-3 py-1 font-label-caps text-label-caps capitalize text-on-primary-container">
            {role}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            user.is_active
              ? "bg-primary-container text-on-primary-container"
              : "bg-error-container text-on-error-container"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </div>
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => onToggleActive(user)}
        className="mt-4 w-full rounded-full border border-primary px-4 py-2 font-label-caps text-label-caps text-primary hover:bg-primary/5 disabled:opacity-60"
      >
        {user.is_active ? "Deactivate" : "Reactivate"}
      </button>
    </article>
  );
}
