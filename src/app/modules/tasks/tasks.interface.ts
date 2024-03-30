import { Model } from "mongoose";

export interface TasksWithStatic extends Model<TTasks> {
    isUserExists(id: string): Promise<TTasks | null>;
}

export type TTasks = {
    title: string;
    description: string;
    category: "personal" | "official" | "family",
    isImportant: boolean;
    isDeleted: boolean;
};






