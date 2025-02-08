import dotenv from "dotenv";
import Elysia from "elysia";
import { routes } from "./routes";
import { prisma } from "./config/prisma";

dotenv.config();

// Prisma connection
(async ()=> {
    await prisma.$connect();
    console.log("✅ DB connected!")
})

// Initialize Elysia App
const app = new Elysia();

// Register all routes in a loop
routes.forEach((route) => app.use(route));

app.get('/',(req:Request,res:Response)=>(
    "SIN BACKEND"
))

// Start server
app.listen(process.env.PORT || 3000);

console.log(`✅ Server running at http://localhost:${app.server?.port}`);
