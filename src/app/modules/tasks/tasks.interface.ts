import { Model } from "mongoose";

export interface TasksWithStatic extends Model<TTasks> {
    isTaskExists(id: string): Promise<TTasks | null>;
}

export type TTasks = {
    title: string;
    description: string;
    deadline: string;
    category: "personal" | "official" | "family",
    status: boolean,
    email: string;
    isImportant: boolean;
    isDeleted: boolean;
};






