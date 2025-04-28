const { sequelize } = require("../config/sequelize");

const undoSeed = async () => {
  try {
    console.log("Menghapus data seeding sebelumnya...");

    await sequelize.query("SET session_replication_role = replica");

    await sequelize.query(
      "TRUNCATE TABLE admins, categories, suppliers, items RESTART IDENTITY CASCADE"
    );

    await sequelize.query("SET session_replication_role = DEFAULT");

    console.log("Semua data seeding berhasil dihapus");
  } catch (error) {
    console.error("Error saat menghapus data:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

undoSeed();
