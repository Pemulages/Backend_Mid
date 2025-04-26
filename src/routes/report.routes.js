const express = require("express");
const reportController = require("../controllers/report.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(verifyToken);

router.get("/inventory-summary", reportController.getInventorySummary);
router.get("/low-stock", reportController.getLowStockItems);
router.get("/category/:category_id/items", reportController.getItemsByCategory);
router.get("/category-summary", reportController.getCategorySummary);
router.get("/supplier-summary", reportController.getSupplierSummary);
router.get("/system-summary", reportController.getSystemSummary);

module.exports = router;
