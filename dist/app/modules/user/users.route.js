"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
//router 
const router = express_1.default.Router();
//crud end points
router.post("/create", user_controller_1.UsersController.createUser);
router.get("/get", user_controller_1.UsersController.getAllUsers);
router.get("/:id", user_controller_1.UsersController.getSingleUser);
router.delete("/:id", user_controller_1.UsersController.deleteUser);
router.patch("/:id", user_controller_1.UsersController.updateUser);
exports.UserRoutes = router;
