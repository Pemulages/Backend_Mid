const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const testConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      return true;
    } catch (error) {
      console.error(
        `Unable to connect to the database (${retries} retries left):`,
        error
      );
      retries -= 1;
      // Tunggu selama 5 detik sebelum mencoba lagi
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  return false;
};

module.exports = { sequelize, testConnection };
