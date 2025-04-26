const express = require("express");
const adminRoutes = require("./admin.routes");
const categoryRoutes = require("./category.routes");
const supplierRoutes = require("./supplier.routes");
const itemRoutes = require("./item.routes");
const reportRoutes = require("./report.routes");

const router = express.Router();

router.use("/api/admins", adminRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/suppliers", supplierRoutes);
router.use("/api/items", itemRoutes);
router.use("/api/reports", reportRoutes);

module.exports = router;
