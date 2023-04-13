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
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      contactEmergency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneEmergency: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeBlood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DOUBLE,
      },
      certificates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      observation: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
};
