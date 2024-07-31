import { ObjectId } from "mongoose";
import { TTasks } from "./tasks.interface";
import TasksModel from "./tasks.model";

//post
const createTaskIntoDB = async (data: TTasks) => {
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
// isImportant special route ⚡
const isImportantTaskFromDB = async (_id: string) => {
    const task = await TasksModel.findById(_id);
    if (!task) {
        throw new Error("Task not found");
    }
    const newIsImportant = !task.isImportant;
    const result = await TasksModel.updateOne({ _id }, { isImportant: newIsImportant });
    return result;
}

// isImportant special route ⚡
const isCompletedTaskFromDB = async (_id: string) => {
    const task = await TasksModel.findById(_id);
    if (!task) {
        throw new Error("Task not found");
    }
    const newIsCompleted = !task.status;
    const result = await TasksModel.updateOne({ _id }, { status: newIsCompleted });
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

// Delete all tasks by email
const deleteAllTasksByEmailFromDB = async (email: string) => {
    const result = await TasksModel.updateMany({ email }, { isDeleted: true });
    return result;
};



export const TasksServices = {
    createTaskIntoDB,
    getAllTasksFromDB,
    getSingleTaskFromDB,
    deleteTaskFromDB,
    updateTaskFromDB,
    isImportantTaskFromDB,
    isCompletedTaskFromDB,
    deleteAllTasksByEmailFromDB
}