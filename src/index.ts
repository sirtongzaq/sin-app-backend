import { Elysia } from "elysia";
import { routes } from "./routes"; // Import all routes
import { syncDatabase } from "./models";
import dotenv from "dotenv";

dotenv.config();

// Sync database before starting server
syncDatabase();

// Initialize Elysia App
const app = new Elysia();

// Register all routes in a loop
routes.forEach((route) => app.use(route));

// Start server
app.listen(process.env.PORT || 3000);

console.log(`✅ Server running at http://localhost:${app.server?.port}`);
