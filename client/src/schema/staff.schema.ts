import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long");

export const staffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  password: passwordSchema,
  gender: z.string().optional(),
  specialization: z.string().optional(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  bio: z.string().optional(),
  avatar_url: z
    .union([z.literal(""), z.string().url("Enter a valid URL")])
    .optional(),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
