const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const bcrypt = require("bcryptjs");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          admin.password = await bcrypt.hash(admin.password, 10);
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.changed("password")) {
          admin.password = await bcrypt.hash(admin.password, 10);
        }
        admin.updated_at = new Date();
      },
    },
  }
);

Admin.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Admin;
