import { Request, Response } from "express";
import TaskValidationZodSchema from "./tasks.validation";
import { TasksServices } from "./tasks.services";
import { handleZodErrorMessage } from "../../errors/handleZodErrorMessage";


// Create
const createTask = async (req: Request, res: Response) => {
    try {
        //data will come into body
        const sites = req.body;
        //will call services 
        const zodErrorData = TaskValidationZodSchema.safeParse(sites);
        if (!zodErrorData.success) {
            //  Zod error messages here
            const errorMessage = handleZodErrorMessage(zodErrorData.error)
            throw new Error(errorMessage);
        }
        const result = await TasksServices.createTaskIntoDB(zodErrorData.data);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Task Created Successfully!",
            data: result,
        })
    } catch (err: any) {
        res.status(200).json({
            success: false,
            message: "something went wrong into your input data !",
            error: err.message,
        })
    }
};


// Get-All
const getAllTasks = async (req: Request, res: Response) => {
    try {
        // Get all tasks
        const tasks = await TasksServices.getAllTasksFromDB();

        // Get total number of tasks
        const totalTasks = tasks.length;

        // Sending response
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully ✔",
            data: {
                totalTasks,
                tasks,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};

// Get One
const getSingleTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const result = await TasksServices.getSingleTaskFromDB(taskId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "single task retrieved successfully ✔ ",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
}

// Delete One
const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const result = await TasksServices.deleteTaskFromDB(taskId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "task deleted successfully!",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
}


//Update One
const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const updatedData = req.body;
        const result = await TasksServices.updateTaskFromDB(taskId, updatedData);
        //sending response 
        res.status(200).json({
            success: true,
            message: "task updated successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong while updating the task!",
            error: error.message,
        });
    }
};



export const TasksController = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask
}