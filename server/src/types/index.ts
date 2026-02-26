import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;
