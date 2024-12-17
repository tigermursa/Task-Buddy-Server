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
exports.AuthService = void 0;
exports.findUserByEmail = findUserByEmail;
//  updated code
const users_model_1 = __importDefault(require("../user/users.model"));
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_model_1.default.findOne({ email });
    });
}
exports.AuthService = {
    findUserByEmail,
};
// auth.services.ts old code with bcrypt
// import UserModel from "../user/users.model";
// import { IUser } from "./auth.interface";
// const bcrypt = require("bcrypt");
// export async function findUserByEmail(email: string): Promise<IUser | null> {
//     return await UserModel.findOne({ email });
// }
// export async function comparePasswords(
//     plainPassword: string,
//     hashedPassword: string
// ): Promise<boolean> {
//     return await bcrypt.compare(plainPassword, hashedPassword);
// }
// export const AuthService = {
//     findUserByEmail,
//     comparePasswords
// }
