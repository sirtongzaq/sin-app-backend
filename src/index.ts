// import { Elysia } from "elysia";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// // create a new user
// await prisma.user.create({
//   data: {
//     name: "John dsdss",
//   },
// });

// count the number of users
const count = await prisma.user.findMany({
    where:{
        id:{
            equals:4
        }
    }
}).then((res) => {
    console.log(res)
}).catch((error) => {
    console.log(error)
});
console.log(`There are ${count} users in the database.`);


// dotenv.config();

// // Sync database before starting server
// syncDatabase();

// // Initialize Elysia App
// const app = new Elysia();

// // Register all routes in a loop
// routes.forEach((route) => app.use(route));

// // Start server
// app.listen(process.env.PORT || 3000);

// console.log(`✅ Server running at http://localhost:${app.server?.port}`);
