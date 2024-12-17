"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_route_1 = require("./app/modules/tasks/tasks.route");
const users_route_1 = require("./app/modules/user/users.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json()); // JSON parse will happen
app.use((0, cors_1.default)());
// Application routes:
app.use('/api/v1/task', tasks_route_1.TaskRoutes); //Task
app.use('/api/v2/user', users_route_1.UserRoutes); //Users
app.use('/user', auth_route_1.AuthRoutes); //Login   
app.get('/', (req, res) => {
    res.send('Task Buddy Server Running Successfully ✔');
});
exports.default = app;
