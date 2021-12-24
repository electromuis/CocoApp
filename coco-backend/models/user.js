'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Room, {
        foreignKey: 'ownerId'
      })

      User.hasMany(models.Alert, {
        foreignKey: 'creatorId'
      })

      User.hasMany(models.Invite, {
        foreignKey: 'userId'
      })

      User.hasMany(models.Response, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};