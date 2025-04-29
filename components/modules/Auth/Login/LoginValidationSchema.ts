import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email Required!" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(8, "Password Must be 8 Characters"),
});
