"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a `.env` file
dotenv_1.default.config();
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.dbUrl);
            console.log("MongoDB connected successfully! 🥫");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            setTimeout(connectDB, 5000); // Retry after 5 seconds if connection fails
        }
    });
}
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        const port = process.env.PORT || config_1.default.port;
        app_1.default.listen(port, () => {
            console.log(`Server running at the port ${port} ✨`);
        });
        // Graceful shutdown handling
        process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Received SIGINT, closing server...");
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }));
    });
}
server().catch((err) => console.log("Server error:", err));
