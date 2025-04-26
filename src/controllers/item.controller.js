const { Item, Category, Supplier } = require("../models");
const { Op } = require("sequelize");

exports.createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, category_id, supplier_id } =
      req.body;

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    const supplier = await Supplier.findByPk(supplier_id);
    if (!supplier) {
      return res.status(404).json({
        status: "error",
        message: "Supplier not found",
      });
    }

    const item = await Item.create({
      name,
      description,
      price,
      quantity,
      category_id,
      supplier_id,
      created_by: req.admin.id,
    });

    return res.status(201).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
