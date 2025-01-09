import express from "express";
import cors from "cors";
import { TaskRoutes } from "./app/modules/tasks/tasks.route";
import { UserRoutes } from "./app/modules/user/users.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";

const app = express();

// Parsers
app.use(express.json()); // JSON parse will happen
app.use(
  cors({
    origin: "https://task-buddy-client.vercel.app",
  })
);

// Application routes:
app.use("/api/v1/task", TaskRoutes); //Task
app.use("/api/v2/user", UserRoutes); //Users
app.use("/user", AuthRoutes); //Login

app.get("/", (req, res) => {
  res.send("Task Buddy Server Running Successfully ✔");
});

export default app;
