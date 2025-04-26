const { Item, Category, Supplier } = require("../models");
const { sequelize } = require("../utils/database");
const { QueryTypes } = require("sequelize");

exports.getInventorySummary = async (req, res) => {
  try {
    const summary = await sequelize.query(
      `
      SELECT 
        SUM(quantity) AS total_stock,
        SUM(quantity * price) AS total_stock_value,
        AVG(price) AS average_price
      FROM items
    `,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      status: "success",
      data: summary[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const { threshold = 5 } = req.query;

    const lowStockItems = await Item.findAll({
      where: {
        quantity: { [Op.lt]: threshold },
      },
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
      order: [["quantity", "ASC"]],
    });

    return res.status(200).json({
      status: "success",
      data: lowStockItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    const items = await Item.findAll({
      where: { category_id },
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      data: {
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
        items,
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

exports.getCategorySummary = async (req, res) => {
  try {
    const categorySummary = await sequelize.query(
      `
      SELECT 
        c.id,
        c.name,
        COUNT(i.id) AS item_count,
        SUM(i.quantity) AS total_quantity,
        SUM(i.quantity * i.price) AS total_stock_value,
        AVG(i.price) AS average_price
      FROM categories c
      LEFT JOIN items i ON c.id = i.category_id
      GROUP BY c.id, c.name
      ORDER BY c.name
    `,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      status: "success",
      data: categorySummary,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSupplierSummary = async (req, res) => {
  try {
    const supplierSummary = await sequelize.query(
      `
      SELECT 
        s.id,
        s.name,
        COUNT(i.id) AS item_count,
        SUM(i.quantity) AS total_quantity,
        SUM(i.quantity * i.price) AS total_stock_value
      FROM suppliers s
      LEFT JOIN items i ON s.id = i.supplier_id
      GROUP BY s.id, s.name
      ORDER BY s.name
    `,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      status: "success",
      data: supplierSummary,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSystemSummary = async (req, res) => {
  try {
    const [totalItems, totalCategories, totalSuppliers, inventorySummary] =
      await Promise.all([
        Item.count(),
        Category.count(),
        Supplier.count(),
        sequelize.query(
          `
        SELECT 
          SUM(quantity) AS total_stock,
          SUM(quantity * price) AS total_stock_value,
          AVG(price) AS average_price
        FROM items
      `,
          { type: QueryTypes.SELECT }
        ),
      ]);

    return res.status(200).json({
      status: "success",
      data: {
        total_items: totalItems,
        total_categories: totalCategories,
        total_suppliers: totalSuppliers,
        total_stock: inventorySummary[0].total_stock || 0,
        total_stock_value: inventorySummary[0].total_stock_value || 0,
        average_price: inventorySummary[0].average_price || 0,
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
