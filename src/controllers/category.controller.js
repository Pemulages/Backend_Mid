const { Category, Item } = require("../models");
const { sequelize } = require("../utils/database");
const { Op } = require("sequelize");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({
      where: { name: { [Op.iLike]: name } },
    });

    if (existingCategory) {
      return res.status(400).json({
        status: "error",
        message: "Category name already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      created_by: req.admin.id,
    });

    return res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "description", "created_at", "updated_at"],
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id"],
        },
      ],
    });

    const transformedCategories = categories.map((category) => {
      const { items, ...categoryData } = category.toJSON();
      return {
        ...categoryData,
        item_count: items.length,
      };
    });

    return res.status(200).json({
      status: "success",
      data: transformedCategories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price", "quantity"],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
