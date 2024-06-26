import { title } from "process";
import { z } from "zod";

export const petFormSchema = z.object({
  image: z.any().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "A name consist of at least 3 characters"),
  size: z
    .enum(["small", "medium", "large"], {
      required_error: "Size is required",
    })
    .or(z.string()),
  age: z.string({ required_error: "Age is required" }),
  color: z
    .enum(["red", "apricot", "black", "monochrome", "silver", "tan"], {
      required_error: "Color is required",
    })
    .or(z.string()),
  location: z.string({ required_error: "Location is required" }),
  price: z.string({ required_error: "Price is required" }),
  gender: z
    .enum(["male", "female"], { required_error: "Gender is required" })
    .or(z.string()),
  vaccinated: z.boolean(),
  dewormed: z.boolean(),
  microchip: z.boolean(),
  additional: z.array(z.string(), {}),
});

export const postFormSchema = z.object({
  featuredImage: z.any().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(5, { message: "Title must've at least 5 characterss" }),
  content: z.string().optional(),
});

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string({ required_error: "Password is required" }),
});

export const registerFormSchema = z.object({
  fullName: z.string({ required_error: "Full name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must have at least 5 characters" }),
});
