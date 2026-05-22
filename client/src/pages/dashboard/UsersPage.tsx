import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEYS, ROLES, type RoleName } from "../../common";
import UserCard from "../../components/users/UserCard";
import AddStaffForm from "../../components/users/AddStaffForm";
import Modal from "../../components/ui/Modal";
import * as userService from "../../services/user.service";
import type { User } from "../../types/api";
import type { StaffFormValues } from "../../schema/staff.schema";

type Tab = "staff" | "clients";

export default function UsersPage() {
  const [tab, setTab] = useState<Tab>("clients");
  const [showAddStaff, setShowAddStaff] = useState(false);
  const queryClient = useQueryClient();

  const roleFilter: RoleName = tab === "staff" ? ROLES.STAFF : ROLES.CLIENT;

  const usersQuery = useQuery({
    queryKey: [CACHE_KEYS.USERS, tab],
    queryFn: () => userService.fetchUsers({ role: roleFilter, limit: 50 }),
  });

  const toggleMutation = useMutation({
    mutationFn: (user: User) =>
      userService.updateUser(user.id, { is_active: !user.is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.USERS] });
    },
  });

  const addStaffMutation = useMutation({
    mutationFn: (values: StaffFormValues) => userService.createStaff(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.USERS] });
      setShowAddStaff(false);
    },
  });

  const users = usersQuery.data?.data ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display-lg text-headline-md text-on-surface">
            Users
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Manage staff and client accounts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddStaff(true)}
          className="rounded-full bg-primary px-5 py-2.5 font-label-caps text-label-caps text-on-primary"
        >
          Add staff
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {(["clients", "staff"] as Tab[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-full px-5 py-2 font-label-caps text-label-caps capitalize ${
              tab === value
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {usersQuery.isLoading && (
        <p className="text-on-surface-variant">Loading users...</p>
      )}
      {usersQuery.isError && (
        <p className="text-error">Could not load users.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onToggleActive={(u) => toggleMutation.mutate(u)}
            isUpdating={toggleMutation.isPending}
          />
        ))}
      </div>

      {!usersQuery.isLoading && users.length === 0 && (
        <p className="text-on-surface-variant">No users found.</p>
      )}

      <Modal
        open={showAddStaff}
        title="Add staff member"
        onClose={() => setShowAddStaff(false)}
        wide
      >
        <AddStaffForm
          onSubmit={async (values) => {
            await addStaffMutation.mutateAsync(values);
          }}
          onCancel={() => setShowAddStaff(false)}
          isLoading={addStaffMutation.isPending}
        />
      </Modal>
    </div>
  );
}
