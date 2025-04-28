const express = require("express");
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", adminController.register);
router.post("/login", adminController.login);

router.get("/profile", verifyToken, adminController.getProfile);

module.exports = router;
