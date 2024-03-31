import { Model } from "mongoose";

export interface UserWithStatic extends Model<TUser> {
    isUserExists(id: string): Promise<TUser | null>;
}

export type TUser = {
    name: string;
    userImage: string;
    email: string;
    password: string
    isDeleted: boolean;
};






