import { ObjectId } from "mongoose";
import { TTasks } from "./tasks.interface";
import TasksModel from "./tasks.model";

//post
const createTaskIntoDB = async (data: TTasks) => {
    if (await TasksModel.isTaskExists(data.title)) {
        throw new Error("This Task already exist");
    }
    const result = await TasksModel.create(data) //builtin static method using
    return result;
}



// getAll data
const getAllTasksFromDB = async () => {
    const result = await TasksModel.find();
    return result;
}

// getSingle task
const getSingleTaskFromDB = async (id: string) => {
    const result = await TasksModel.findOne({ _id: id });
    return result;
}

// delete
const deleteTaskFromDB = async (_id: string) => {
    const result = await TasksModel.updateOne({ _id }, { isDeleted: true });
    return result;
}

//update 
const updateTaskFromDB = async (_id: string | ObjectId, updatedData: Partial<TTasks>) => {
    try {
        const result = await TasksModel.updateOne({ _id }, { $set: updatedData });
        return result;
    } catch (error: any) {
        console.error("Error updating Current Task:", error.message);
        throw new Error("Error updating Task: " + error.message);
    }
};





export const TasksServices = {
    createTaskIntoDB,
    getAllTasksFromDB,
    getSingleTaskFromDB,
    deleteTaskFromDB,
    updateTaskFromDB
}