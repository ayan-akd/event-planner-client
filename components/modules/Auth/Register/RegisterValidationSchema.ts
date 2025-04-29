import { z } from "zod";

export const RegisterValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email Required!" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(8, "Password Must be 8 Characters"),
  name: z.string({ required_error: "User Name is Required!" }),
});
