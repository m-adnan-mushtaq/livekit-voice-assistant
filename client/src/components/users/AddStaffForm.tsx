import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffSchema, type StaffFormValues } from "../../schema/staff.schema";
import { getApiErrorMessage } from "../../services/api";

const inputClass =
  "w-full rounded-xl border border-outline-variant/40 px-4 py-3 outline-none focus:border-primary";

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
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      specialization: "",
      phone: "",
      dob: "",
      bio: "",
      avatar_url: "",
    },
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
    <form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Full name
          </span>
          <input {...register("name")} className={inputClass} />
          {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Email
          </span>
          <input type="email" {...register("email")} className={inputClass} />
          {errors.email && <p className="text-sm text-error">{errors.email.message}</p>}
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Password
          </span>
          <input type="password" {...register("password")} className={inputClass} />
          {errors.password && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Gender
          </span>
          <input {...register("gender")} className={inputClass} placeholder="Optional" />
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Phone
          </span>
          <input {...register("phone")} className={inputClass} placeholder="Optional" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Specialization
          </span>
          <input
            {...register("specialization")}
            className={inputClass}
            placeholder="e.g. Vinyasa & Flow"
          />
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Date of birth
          </span>
          <input type="date" {...register("dob")} className={inputClass} />
        </label>
        <label className="block space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Avatar URL
          </span>
          <input
            {...register("avatar_url")}
            className={inputClass}
            placeholder="https://..."
          />
          {errors.avatar_url && (
            <p className="text-sm text-error">{errors.avatar_url.message}</p>
          )}
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Bio
          </span>
          <textarea
            {...register("bio")}
            rows={3}
            className={inputClass}
            placeholder="Short instructor bio"
          />
        </label>
      </div>
      {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}
      <div className="sticky bottom-0 flex justify-end gap-3 bg-surface-container-lowest pt-2">
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
