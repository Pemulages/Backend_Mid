const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingAdmin) {
      return res.status(400).json({
        status: "error",
        message: "Username or email already exists",
      });
    }

    const admin = await Admin.create({
      username,
      password,
      email,
    });

    return res.status(201).json({
      status: "success",
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        created_at: admin.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed: Invalid username or password",
      });
    }

    const isPasswordValid = await admin.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed: Invalid username or password",
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    return res.status(200).json({
      status: "success",
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      data: {
        id: req.admin.id,
        username: req.admin.username,
        email: req.admin.email,
        created_at: req.admin.created_at,
        updated_at: req.admin.updated_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
