import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(3, "Username is requerid"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Passowrd must be at least 6 characteres long"),
    avatar: z.string().url('Invalid URL').optional(),
})

export  {userSchema};