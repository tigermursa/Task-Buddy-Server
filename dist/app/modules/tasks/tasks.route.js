"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("./tasks.controller");
//router
const router = express_1.default.Router();
//crud end points
router.post("/create", tasks_controller_1.TasksController.createTask);
router.get("/get", tasks_controller_1.TasksController.getAllTasks);
router.get("/:id", tasks_controller_1.TasksController.getSingleTask);
router.delete("/:id", tasks_controller_1.TasksController.deleteTask);
router.put("/:id", tasks_controller_1.TasksController.isImportant);
router.put("/status/:id", tasks_controller_1.TasksController.isCompleted);
router.patch("/:id", tasks_controller_1.TasksController.updateTask);
router.delete("/delete-all/:email", tasks_controller_1.TasksController.deleteAllTasksByEmail);
router.get("/email/:email", tasks_controller_1.TasksController.getAllTasksByEmail);
exports.TaskRoutes = router;
