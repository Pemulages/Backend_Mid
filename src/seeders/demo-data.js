const bcrypt = require("bcryptjs");
const { Admin, Category, Supplier, Item } = require("../models");
const { sequelize } = require("../config/sequelize");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database cleared");

    const adminPassword = await bcrypt.hash("admin1234", 10);
    const admin = await Admin.create({
      username: "admin",
      password: adminPassword,
      email: "admin@awokk.com",
    });
    console.log("Admin created");

    const categories = await Category.bulkCreate([
      {
        name: "Elektronik",
        description: "Perangkat elektronik dan aksesorisnya",
        created_by: admin.id,
      },
      {
        name: "Perlengkapan Kantor",
        description: "Perlengkapan untuk keperluan kantor",
        created_by: admin.id,
      },
      {
        name: "Mebel",
        description: "Perabotan kantor dan rumah",
        created_by: admin.id,
      },
    ]);
    console.log("Kategori telah dibuat");

    const suppliers = await Supplier.bulkCreate([
      {
        name: "Teknisi",
        contact_info: "kontak@teknisi.com",
        created_by: admin.id,
      },
      {
        name: "Office Mart",
        contact_info: "info@officemart.com",
        created_by: admin.id,
      },
      {
        name: "Furnitur",
        contact_info: "sales@furnitur.com",
        created_by: admin.id,
      },
    ]);
    console.log("Pemasok telah dibuat");

    await Item.bulkCreate([
      {
        name: "Laptop",
        description: "Laptop bisnis dengan layar 15 inci",
        price: 1200.0,
        quantity: 10,
        category_id: categories[0].id,
        supplier_id: suppliers[0].id,
        created_by: admin.id,
      },
      {
        name: "Smartphone",
        description: "Smartphone model terbaru",
        price: 800.0,
        quantity: 15,
        category_id: categories[0].id,
        supplier_id: suppliers[0].id,
        created_by: admin.id,
      },
      {
        name: "Meja",
        description: "Meja kantor ergonomis",
        price: 350.0,
        quantity: 5,
        category_id: categories[2].id,
        supplier_id: suppliers[2].id,
        created_by: admin.id,
      },
      {
        name: "Kursi",
        description: "Kursi kantor yang nyaman",
        price: 150.0,
        quantity: 12,
        category_id: categories[2].id,
        supplier_id: suppliers[2].id,
        created_by: admin.id,
      },
      {
        name: "Buku Catatan",
        description: "Buku catatan kualitas premium",
        price: 4.5,
        quantity: 100,
        category_id: categories[1].id,
        supplier_id: suppliers[1].id,
        created_by: admin.id,
      },
      {
        name: "Pen Set",
        description: "Set 10 pen premium",
        price: 12.99,
        quantity: 25,
        category_id: categories[1].id,
        supplier_id: suppliers[1].id,
        created_by: admin.id,
      },
      {
        name: "Monitor",
        description: "27-inch 4K monitor 1945Hz",
        price: 350.0,
        quantity: 8,
        category_id: categories[0].id,
        supplier_id: suppliers[0].id,
        created_by: admin.id,
      },
      {
        name: "Keyboard",
        description: "Keyboard Mechanical",
        price: 85.0,
        quantity: 20,
        category_id: categories[0].id,
        supplier_id: suppliers[0].id,
        created_by: admin.id,
      },
      {
        name: "Rak Buku",
        description: "Rak buku kayu dengan 5 rak",
        price: 199.99,
        quantity: 3,
        category_id: categories[2].id,
        supplier_id: suppliers[2].id,
        created_by: admin.id,
      },
      {
        name: "Lemari Arsip",
        description: "Metal filing cabinet with 4 drawers",
        price: 120.0,
        quantity: 7,
        category_id: categories[2].id,
        supplier_id: suppliers[2].id,
        created_by: admin.id,
      },
    ]);
    console.log("Item telah dibuat");

    console.log("Database seeding berhasil diselesaikan");
  } catch (error) {
    console.error("Database seeding gagal:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
