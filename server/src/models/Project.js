const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    'project', 
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalCertificates: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )
}