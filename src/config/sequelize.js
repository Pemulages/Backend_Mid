require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "inventory_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "postgres",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test koneksi
sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi ke database berhasil.");
  })
  .catch((err) => {
    console.error("Tidak dapat terhubung ke database:", err);
  });

module.exports = { sequelize };
