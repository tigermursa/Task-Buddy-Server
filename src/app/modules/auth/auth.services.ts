// auth.services.ts
import UserModel from "../user/users.model";
import { IUser } from "./auth.interface";
const bcrypt = require("bcrypt");

export async function findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
}

export async function comparePasswords(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export const AuthService = {
    findUserByEmail,
    comparePasswords
}