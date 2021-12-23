'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCASE'
      })

      Invite.belongsTo(models.Room, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE'
      })
    }
  };
  Invite.init({
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    reactedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invite',
  });
  return Invite;
};