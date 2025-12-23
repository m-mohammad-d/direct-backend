import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .optional(),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
