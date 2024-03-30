import express from "express";
import { TasksController } from "./tasks.controller";

//router 
const router = express.Router()


//crud end points
router.post("/create", TasksController.createTask);
router.get("/get", TasksController.getAllTasks)
router.get("/:id", TasksController.getSingleTask)
router.delete("/:id", TasksController.deleteTask)
router.patch("/:id", TasksController.updateTask)

export const TaskRoutes = router;