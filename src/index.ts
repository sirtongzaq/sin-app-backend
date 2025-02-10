import dotenv from "dotenv";
import Elysia from "elysia";
import { routes } from "./routes";
import { prisma } from "./config/prisma";

dotenv.config();

// Initialize Elysia App
const app = new Elysia();

// Immediately Connect Prisma Before Starting Server
(async () => {
  try {
    await prisma.$connect();
    console.log("✅ DB connected!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Register all routes
routes.forEach((route) => app.use(route));

app.get("/", () => "SIN BACKEND");

// Start server
app.listen(process.env.PORT || 3000);

console.log(`✅ Server running at http://localhost:${app.server?.port}`);
