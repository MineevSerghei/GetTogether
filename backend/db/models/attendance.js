'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.User, { foreignKey: 'userId' });
      Attendance.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  Attendance.init({
    eventId:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['attending', 'waitlist', 'pending']]
      },
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
