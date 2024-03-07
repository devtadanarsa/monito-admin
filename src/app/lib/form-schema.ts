import { z } from "zod";

export const petFormSchema = z.object({
  image: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "A name consist of at least 3 characters"),
  size: z.enum(["small", "medium", "large"], {
    required_error: "Size is required",
  }),
  price: z.string({ required_error: "Price is required" }),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  additional: z.array(z.string()).min(1, "Additional information is required"),
});
