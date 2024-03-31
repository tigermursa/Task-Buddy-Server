import { Model } from "mongoose";

export interface UserWithStatic extends Model<TUser> {
    isUserExists(id: string): Promise<TUser | null>;
}

export type TUser = {
    isModified(arg0: string): unknown;
    name: string;
    userImage: string;
    email: string;
    password: string
    isDeleted: boolean;
};






