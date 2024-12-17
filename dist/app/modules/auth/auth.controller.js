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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
exports.login = login;
const auth_services_1 = require("./auth.services");
// jwt token
const jwt = require("jsonwebtoken");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Find user by email
            const user = yield auth_services_1.AuthService.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ success: false, message: "User does not exist" });
            }
            // Check if the password matches
            if (password !== user.password) {
                return res.status(401).json({ success: false, message: "Incorrect password" });
            }
            // Generate JWT token
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: process.env.EXPIRES_IN,
            });
            return res.json({
                success: true,
                message: "Login successful",
                token,
            });
        }
        catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.AuthController = {
    login,
};
//! OLD CODE
// import { Request, Response } from "express";
// import { AuthService } from "./auth.services";
// //jwt token..
// const jwt = require("jsonwebtoken");
// export async function login(req: Request, res: Response): Promise<Response> {
//     const { email, password } = req.body;
//     try {
//         // Find user by email
//         const user = await AuthService.findUserByEmail(email);
//         if (!user) {
//             return res.status(401).json({ success: false, message: "User does not exist" });
//         }
//         // Compare hashed password
//         const isPasswordValid = await AuthService.comparePasswords(
//             password,
//             user.password
//         );
//         if (!isPasswordValid) {
//             return res.status(401).json({ success: false, message: "Incorrect password" });
//         }
//         // Generate JWT token...⚡
//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//             expiresIn: process.env.EXPIRES_IN,
//         });
//         return res.json({
//             success: true,
//             message: "Login successful",
//             token,
//         });
//     } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }
// export const AuthController = {
//     login,
// }
