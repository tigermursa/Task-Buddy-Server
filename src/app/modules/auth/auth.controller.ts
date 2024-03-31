import { Request, Response } from "express";
import { AuthService } from "./auth.services";

const jwt = require("jsonwebtoken");

export async function login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await AuthService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare hashed password
        const isPasswordValid = await AuthService.comparePasswords(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
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
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const AuthController ={
login,
}