'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Response.belongsTo(models.Alert, {
        foreignKey: 'alertId',
        onDelete: 'CASCADE'
      })

      Response.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  Response.init({
    userId: DataTypes.INTEGER,
    alertId: DataTypes.INTEGER,
    response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};