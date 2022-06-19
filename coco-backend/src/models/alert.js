'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alert.belongsTo(models.User, {
        foreignKey: 'creatorId',
        onDelete: 'CASCADE'
      })

      Alert.belongsTo(models.Room, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE'
      })

      Alert.hasMany(models.Response, {
        foreignKey: 'alertId'
      })
    }
  };
  Alert.init({
    creatorId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alert',
  });
  return Alert;
};