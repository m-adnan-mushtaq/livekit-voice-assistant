import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffSchema, type StaffFormValues } from "../../schema/auth.schema";
import { getApiErrorMessage } from "../../services/api";

type AddStaffFormProps = {
  onSubmit: (values: StaffFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function AddStaffForm({
  onSubmit,
  onCancel,
  isLoading,
}: AddStaffFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      reset();
    } catch (err) {
      setError("root", {
        message: getApiErrorMessage(err, "Could not add staff member."),
      });
    }
  });

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Name
        </span>
        <input
          {...register("name")}
          className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 outline-none focus:border-primary"
        />
        {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
      </label>
      <label className="block space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Email
        </span>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 outline-none focus:border-primary"
        />
        {errors.email && (
          <p className="text-sm text-error">{errors.email.message}</p>
        )}
      </label>
      <label className="block space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Password
        </span>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 outline-none focus:border-primary"
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}
      </label>
      {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-outline-variant px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-primary px-4 py-2 text-sm text-on-primary disabled:opacity-60"
        >
          {isLoading ? "Adding..." : "Add staff"}
        </button>
      </div>
    </form>
  );
}
