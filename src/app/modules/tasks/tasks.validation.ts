import { z } from "zod";

const TaskValidationZodSchema = z.object({
    // title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    title: z.string(),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    deadline: z.string(),
    email: z.string(),
    category: z.enum(['personal', 'official', 'family']),
    status: z.boolean().default(false),
    isImportant: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
});

export default TaskValidationZodSchema;
