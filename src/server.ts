import app from "./app"; // Your Express app
import mongoose from "mongoose";
import config from "./app/config";

// Function to ensure the database is connected
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(config.dbUrl as string);
        console.log("Mongoose connected successfully! 🥫");
    }
}

// Export handler for Vercel
export default async (req: any, res: any) => {
    try {
        await connectDB(); // Connect to the database (only if not already connected)
        app(req, res);    // Pass the request to your Express app
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).send("Internal Server Error");
    }
};
