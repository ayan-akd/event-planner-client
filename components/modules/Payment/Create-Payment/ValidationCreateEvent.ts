import { z } from "zod";

export const paymentValidationSchema = z.object({
  title: z.string({ required_error: "User ID is Required!" }),
  organizer: z.string({ required_error: "Event ID is Required!" }),
});
