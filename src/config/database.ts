import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

// Define the database file location
const databasePath = path.resolve(__dirname, "../../database.sqlite");
const databaseDir = path.dirname(databasePath);

// Ensure the database directory exists
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath, // ✅ Corrected path
  logging: false, // Optional: Disable logging
});

export default sequelize;
