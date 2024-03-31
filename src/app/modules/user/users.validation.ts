import { z } from "zod";

const UserValidationZodSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 3 characters long" }),
    userImage: z.string(), 
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(4, { message: "Password must be at least 4 characters long" }), //TODO: MAKE 8 IN PRODUCTION
    isDeleted: z.boolean().default(false),
});

export default UserValidationZodSchema;
