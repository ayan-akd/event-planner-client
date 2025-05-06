import { z } from "zod";

export const paymentValidationSchema = z.object({
    userId: z.string({ required_error: "User ID is Required!" }),
    eventId: z.string({ required_error: "Event ID is Required!" }),
});
