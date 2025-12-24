import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .optional(),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
  displayName: z.string().max(50).optional(),
  bio: z.string().max(160).optional(),
  showLastSeen: z.boolean().optional(),
  showOnline: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
