const Admin = require("./admin.model");
const Category = require("./category.model");
const Supplier = require("./supplier.model");
const Item = require("./item.model");

Admin.hasMany(Category, { foreignKey: "created_by", as: "categories" });
Admin.hasMany(Supplier, { foreignKey: "created_by", as: "suppliers" });
Admin.hasMany(Item, { foreignKey: "created_by", as: "items" });

Category.belongsTo(Admin, { foreignKey: "created_by", as: "admin" });
Category.hasMany(Item, { foreignKey: "category_id", as: "items" });

Supplier.belongsTo(Admin, { foreignKey: "created_by", as: "admin" });
Supplier.hasMany(Item, { foreignKey: "supplier_id", as: "items" });

Item.belongsTo(Admin, { foreignKey: "created_by", as: "admin" });
Item.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Item.belongsTo(Supplier, { foreignKey: "supplier_id", as: "supplier" });

module.exports = {
  Admin,
  Category,
  Supplier,
  Item,
};
