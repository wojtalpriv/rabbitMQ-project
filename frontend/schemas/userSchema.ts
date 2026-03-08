import { z } from "zod";

export const userSchema = z.object({
  userName: z.string().min(3).max(10),
  password: z.string().min(6).max(25),
});

export type User = z.infer<typeof userSchema>;