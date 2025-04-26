const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const { sequelize, testConnection } = require("./utils/database");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utk ngetest route
app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test route is working!'
  });
});

// Utk coba welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Selamat Datang di Inventory Management API'
  });
});

// Routes
app.use(routes);
// Routes
app.use(routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Resource not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

// Sinkronisasi database dan memulai server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Uji koneksi database
    await sequelize.sync({ alter: true });
    console.log("Database sync complete");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
