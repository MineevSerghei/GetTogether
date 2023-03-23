'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Group, { foreignKey: 'organizerId' });
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: 'userId',
        otherKey: 'groupId'
      });
      User.belongsToMany(models.Event, {
        through: models.Attendance,
        foreignKey: 'userId',
        otherKey: 'eventId'
      });
      User.hasMany(models.Membership, { foreignKey: 'userId' });
      User.hasMany(models.Attendance, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        //isEmail: false
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'updatedAt', 'createdAt']
      }
    }
  });
  return User;
};
