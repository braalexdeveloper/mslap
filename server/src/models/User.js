const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactEmergency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneEmergency: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      typeBlood: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary: {
        type: DataTypes.DOUBLE,
      },
      observation: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "foto-perfil-default.png"
      }
    },
    {
      timestamps: false,
    }
  );
};
