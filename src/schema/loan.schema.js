import { z } from "zod";

const loansSchema = z.object({
  bookId: z.number().int().positive("Book Id must be a pistive integer"),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .min(10, "Due date must be in the format YYYY-MM-DD"),
});
const loanIdSchema = z.object({
    loanId: z.number().int().positive("Loan Id must be a positive integer")
})

export {loansSchema, loanIdSchema};
