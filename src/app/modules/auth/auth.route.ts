// auth.route.ts
import express from "express";
import { AuthController } from "./auth.controller";


const router = express.Router();

router.post("/login", AuthController.login);

export const AuthRoutes = router;
