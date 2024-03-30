import express from "express";
import cors from "cors";

const app = express();

// Parsers
app.use(express.json());  // JSON parse will happen
app.use(cors());

// Application routes
// app.use('/api/v1/xyz', xyz);
// app.use('/api/v2/xyz', xyz);

app.get('/', (req, res) => {
    res.send('Task Buddy Server Running Successfully ✔');
});

export default app;
