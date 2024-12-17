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
exports.TasksServices = void 0;
const tasks_model_1 = __importDefault(require("./tasks.model"));
//post
const createTaskIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.create(data); //builtin static method using
    return result;
});
// getAll data
const getAllTasksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.find();
    return result;
});
// getSingle task
const getSingleTaskFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.findOne({ _id: id });
    return result;
});
// delete
const deleteTaskFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.updateOne({ _id }, { isDeleted: true });
    return result;
});
// isImportant special route ⚡
const isImportantTaskFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasks_model_1.default.findById(_id);
    if (!task) {
        throw new Error("Task not found");
    }
    const newIsImportant = !task.isImportant;
    const result = yield tasks_model_1.default.updateOne({ _id }, { isImportant: newIsImportant });
    return result;
});
// isImportant special route ⚡
const isCompletedTaskFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasks_model_1.default.findById(_id);
    if (!task) {
        throw new Error("Task not found");
    }
    const newIsCompleted = !task.status;
    const result = yield tasks_model_1.default.updateOne({ _id }, { status: newIsCompleted });
    return result;
});
//update
const updateTaskFromDB = (_id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tasks_model_1.default.updateOne({ _id }, { $set: updatedData });
        return result;
    }
    catch (error) {
        console.error("Error updating Current Task:", error.message);
        throw new Error("Error updating Task: " + error.message);
    }
});
// Delete all tasks by email
const deleteAllTasksByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.updateMany({ email }, { isDeleted: true });
    return result;
});
// Get all tasks by email
const getAllTasksByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tasks_model_1.default.find({ email });
    return result;
});
exports.TasksServices = {
    createTaskIntoDB,
    getAllTasksFromDB,
    getSingleTaskFromDB,
    deleteTaskFromDB,
    updateTaskFromDB,
    isImportantTaskFromDB,
    isCompletedTaskFromDB,
    deleteAllTasksByEmailFromDB,
    getAllTasksByEmailFromDB,
};
