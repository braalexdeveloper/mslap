const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: DataTypes.ENUM("admin", "contratista", "supervisor", "operario"),
        allowNull: false,
      }
    },
    {
      timestamp: false,
    }
  )
}