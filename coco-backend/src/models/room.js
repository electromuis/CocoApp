'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.User, {
        foreignKey: 'ownerId',
        onDelete: 'RESTRICT'
      })

      Room.hasMany(models.Invite, {
        foreignKey: 'roomId'
      })

      Room.hasMany(models.Alert, {
        foreignKey: 'roomId'
      })
    }
  };
  Room.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};