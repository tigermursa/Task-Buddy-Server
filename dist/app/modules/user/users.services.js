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
exports.UserServices = void 0;
const users_model_1 = __importDefault(require("./users.model"));
//post
const createUserIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield users_model_1.default.isUserExists(data.email)) {
        throw new Error("this email already exist");
    }
    const result = yield users_model_1.default.create(data); //builtin static method using
    return result;
});
// getAll data
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.find();
    return result;
});
// getSingle task
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.findOne({ _id: id });
    return result;
});
// delete
const deleteUserFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.updateOne({ _id }, { isDeleted: true });
    return result;
});
//update 
const updateUserFromDB = (_id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_model_1.default.updateOne({ _id }, { $set: updatedData });
        return result;
    }
    catch (error) {
        console.error("error updating user:", error.message);
        throw new Error("error updating user: " + error.message);
    }
});
//exports:
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB
};
