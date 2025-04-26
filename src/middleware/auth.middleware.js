const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid admin",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid token",
      error: error.message,
    });
  }
};

module.exports = { verifyToken };
