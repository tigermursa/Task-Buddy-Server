"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserValidationZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, { message: "Name must be at least 4 characters long" }),
    userImage: zod_1.z.string(),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Password must contain at least one uppercase letter and one digit" }),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = UserValidationZodSchema;
