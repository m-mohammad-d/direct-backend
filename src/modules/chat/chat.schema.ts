import { z } from "zod";

export const createGroupChatSchema = z.object({
  userIds: z
    .array(z.string().uuid())
    .min(1, "At least one member is required")
    .optional(),
  title: z
    .string()
    .min(1, "Group title is required")
    .max(100, "Title is too long"),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
  description: z.string().max(500, "Description too long").optional(),
});

export type CreateGroupChatInput = z.infer<typeof createGroupChatSchema>;
