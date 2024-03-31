import express from "express";
import cors from "cors";
import { TaskRoutes } from "./app/modules/tasks/tasks.route";
import { UserRoutes } from "./app/modules/user/users.route";

const app = express();

// Parsers
app.use(express.json());  // JSON parse will happen
app.use(cors());

// Application routes:
app.use('/api/v1/task', TaskRoutes);
app.use('/api/v2/user', UserRoutes);

app.get('/', (req, res) => {
    res.send('Task Buddy Server Running Successfully ✔');
});

export default app;
