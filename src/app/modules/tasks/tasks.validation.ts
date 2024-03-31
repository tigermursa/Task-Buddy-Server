import { z } from "zod";

const TaskValidationZodSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    category: z.enum(['personal', 'official', 'family']),
    status: z.enum(['complete', 'incomplete']).default('incomplete'),
    isImportant: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
});

export default TaskValidationZodSchema;
