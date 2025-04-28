const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const { testConnection } = require("./utils/database");
const { sequelize } = require("../config/sequelize");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test route is working!'
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Selamat Datang di Inventory Management API'
  });
});

app.use(routes);
app.use(routes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Resource not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();

    await sequelize.sync({ alter: true });
    console.log("Database sync complete");

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
