import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import dotenv from "dotenv";

// Load environment variables from a `.env` file
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(config.dbUrl as string);
        console.log("MongoDB connected successfully! 🥫");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        setTimeout(connectDB, 5000); // Retry after 5 seconds if connection fails
    }
}

async function server() {
    await connectDB();

    const port = process.env.PORT || config.port;

    app.listen(port, () => {
        console.log(`Server running at the port ${port} ✨`);
    });

    // Graceful shutdown handling
    process.on("SIGINT", async () => {
        console.log("Received SIGINT, closing server...");
        await mongoose.disconnect();
        process.exit(0);
    });
}

server().catch((err) => console.log("Server error:", err));

