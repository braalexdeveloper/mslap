const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "certificate",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiration: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("válido", "a vencer", "vencido"),
        defaultValue: "válido",
        allowNull: false,
      },
      observation: {
        type: DataTypes.TEXT,
      },
      isValid:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      timestamps: false,
    }
  );
};
