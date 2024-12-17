"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TaskValidationZodSchema = zod_1.z.object({
    // title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    title: zod_1.z.string(),
    // description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    description: zod_1.z.string(),
    deadline: zod_1.z.string(),
    email: zod_1.z.string(),
    category: zod_1.z.enum(['personal', 'official', 'family']),
    status: zod_1.z.boolean().default(false),
    isImportant: zod_1.z.boolean().default(false),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = TaskValidationZodSchema;
