import { Request, Response } from "express";
import { handleZodErrorMessage } from "../../errors/handleZodErrorMessage";
import UserValidationZodSchema from "./users.validation";
import { UserServices } from "./users.services";


// Create
const createUser = async (req: Request, res: Response) => {
    try {
        //data will come into body
        const sites = req.body;
        //will call services 
        const zodErrorData = UserValidationZodSchema.safeParse(sites);
        if (!zodErrorData.success) {
            //  Zod error messages here
            const errorMessage = handleZodErrorMessage(zodErrorData.error)
            throw new Error(errorMessage);
        }
        const result = await UserServices.createUserIntoDB(zodErrorData.data);
        //sending response 
        res.status(200).json({
            success: true,
            message: "user created successfully!",
            data: result,
        })
    } catch (err: any) {
        res.status(200).json({
            success: false,
            message: "something went wrong while creating user !",
            error: err.message,
        })
    }
};


// Get-All
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB()
        //sending response 
        res.status(200).json({
            success: true,
            message: "user data retrieved successfully ✔",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
};

// Get One
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = await UserServices.getSingleUserFromDB(userId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "single user retrieved successfully ✔ ",
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
const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = await UserServices.deleteUserFromDB(userId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "user deleted successfully!",
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
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const result = await UserServices.updateUserFromDB(userId, updatedData);
        //sending response 
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong while updating the User!",
            error: error.message,
        });
    }
};



export const UsersController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser
}