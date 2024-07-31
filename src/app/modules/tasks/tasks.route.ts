import express from "express";
import { TasksController } from "./tasks.controller";

//router
const router = express.Router();

//crud end points
router.post("/create", TasksController.createTask);
router.get("/get", TasksController.getAllTasks);
router.get("/:id", TasksController.getSingleTask);
router.delete("/:id", TasksController.deleteTask);
router.put("/:id", TasksController.isImportant);
router.put("/status/:id", TasksController.isCompleted);
router.patch("/:id", TasksController.updateTask);
router.delete("/delete-all/:email", TasksController.deleteAllTasksByEmail);
router.get("/email/:email", TasksController.getAllTasksByEmail);
export const TaskRoutes = router;
