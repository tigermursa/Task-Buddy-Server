"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const handleZodErrorMessage_1 = require("../../errors/handleZodErrorMessage");
const users_validation_1 = __importDefault(require("./users.validation"));
const users_services_1 = require("./users.services");
// Create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //data will come into body
        const sites = req.body;
        //will call services 
        const zodErrorData = users_validation_1.default.safeParse(sites);
        if (!zodErrorData.success) {
            //  Zod error messages here
            const errorMessage = (0, handleZodErrorMessage_1.handleZodErrorMessage)(zodErrorData.error);
            throw new Error(errorMessage);
        }
        const result = yield users_services_1.UserServices.createUserIntoDB(zodErrorData.data);
        //sending response 
        res.status(200).json({
            success: true,
            message: "user created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: "something went wrong while creating user !",
            error: err.message,
        });
    }
});
// Get-All
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_services_1.UserServices.getAllUsersFromDB();
        //sending response 
        res.status(200).json({
            success: true,
            message: "user data retrieved successfully ✔",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        });
    }
});
// Get One
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield users_services_1.UserServices.getSingleUserFromDB(userId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "single user retrieved successfully ✔ ",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        });
    }
});
// Delete One
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield users_services_1.UserServices.deleteUserFromDB(userId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "user deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        });
    }
});
//Update One
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const result = yield users_services_1.UserServices.updateUserFromDB(userId, updatedData);
        //sending response 
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while updating the User!",
            error: error.message,
        });
    }
});
exports.UsersController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser
};
