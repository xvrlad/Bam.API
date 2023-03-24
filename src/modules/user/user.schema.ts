import { z } from "zod";

const createUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
