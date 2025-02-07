import sequelize from "../config/database";
import User from "./user";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
};

export { sequelize, User, syncDatabase };