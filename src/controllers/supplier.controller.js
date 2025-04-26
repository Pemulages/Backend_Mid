const { Supplier, Item } = require("../models");
const { Op } = require("sequelize");

exports.createSupplier = async (req, res) => {
  try {
    const { name, contact_info } = req.body;

    const existingSupplier = await Supplier.findOne({
      where: { name: { [Op.iLike]: name } },
    });

    if (existingSupplier) {
      return res.status(400).json({
        status: "error",
        message: "Supplier name already exists",
      });
    }

    const supplier = await Supplier.create({
      name,
      contact_info,
      created_by: req.admin.id,
    });

    return res.status(201).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      attributes: ["id", "name", "contact_info", "created_at", "updated_at"],
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id"],
        },
      ],
    });

    const transformedSuppliers = suppliers.map((supplier) => {
      const { items, ...supplierData } = supplier.toJSON();
      return {
        ...supplierData,
        item_count: items.length,
      };
    });

    return res.status(200).json({
      status: "success",
      data: transformedSuppliers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id, {
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price", "quantity"],
        },
      ],
    });

    if (!supplier) {
      return res.status(404).json({
        status: "error",
        message: "Supplier not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
