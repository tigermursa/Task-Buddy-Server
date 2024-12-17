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
exports.TasksController = void 0;
const tasks_validation_1 = __importDefault(require("./tasks.validation"));
const tasks_services_1 = require("./tasks.services");
const handleZodErrorMessage_1 = require("../../errors/handleZodErrorMessage");
const tasks_model_1 = __importDefault(require("./tasks.model"));
// Create
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //data will come into body
        const sites = req.body;
        //will call services
        const zodErrorData = tasks_validation_1.default.safeParse(sites);
        if (!zodErrorData.success) {
            //  Zod error messages here
            const errorMessage = (0, handleZodErrorMessage_1.handleZodErrorMessage)(zodErrorData.error);
            throw new Error(errorMessage);
        }
        const result = yield tasks_services_1.TasksServices.createTaskIntoDB(zodErrorData.data);
        //sending response
        res.status(200).json({
            success: true,
            message: "Task Created Successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: "something went wrong into your input data !",
            error: err.message,
        });
    }
});
// Get-All
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalCount = yield tasks_model_1.default.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const tasks = yield tasks_model_1.default.find().skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully ✔",
            data: {
                totalTasks: totalCount,
                totalPages: totalPages,
                currentPage: page,
                tasks: tasks,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
});
// Get One
const getSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const result = yield tasks_services_1.TasksServices.getSingleTaskFromDB(taskId);
        //sending response
        res.status(200).json({
            success: true,
            message: "single task retrieved successfully ✔ ",
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
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const result = yield tasks_services_1.TasksServices.deleteTaskFromDB(taskId);
        //sending response
        res.status(200).json({
            success: true,
            message: "task deleted successfully!",
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
// isImportant special route
const isImportant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const result = yield tasks_services_1.TasksServices.isImportantTaskFromDB(taskId);
        //sending response
        res.status(200).json({
            success: true,
            message: "Important task added",
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
// isCompleted special route
const isCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const result = yield tasks_services_1.TasksServices.isCompletedTaskFromDB(taskId);
        //sending response
        res.status(200).json({
            success: true,
            message: "Task Completed!",
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
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const updatedData = req.body;
        const result = yield tasks_services_1.TasksServices.updateTaskFromDB(taskId, updatedData);
        //sending response
        res.status(200).json({
            success: true,
            message: "task updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while updating the task!",
            error: error.message,
        });
    }
});
// Delete all tasks by email
const deleteAllTasksByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const result = yield tasks_services_1.TasksServices.deleteAllTasksByEmailFromDB(email);
        res.status(200).json({
            success: true,
            message: `All tasks for email ${email} have been deleted successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
});
// Get all tasks by email
const getAllTasksByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const result = yield tasks_services_1.TasksServices.getAllTasksByEmailFromDB(email);
        res.status(200).json({
            success: true,
            message: `All tasks for email ${email} retrieved successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
});
exports.TasksController = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    isImportant,
    isCompleted,
    deleteAllTasksByEmail,
    getAllTasksByEmail,
};
