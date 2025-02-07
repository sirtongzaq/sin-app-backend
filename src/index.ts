import { Elysia } from "elysia";
import { userRoutes } from "./routes/userRoutes";
import { syncDatabase } from "./models";
import dotenv from "dotenv";

dotenv.config();

// Sync database before starting server
syncDatabase();

// Initialize Elysia App
const app = new Elysia()
  .get(userRoutes.get.path, userRoutes.get.handler)
  .post(userRoutes.post.path, userRoutes.post.handler)
  .listen(process.env.PORT || 3000);

console.log(`✅ Server running at http://localhost:${app.server?.port}`);