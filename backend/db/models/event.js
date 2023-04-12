'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Group, { foreignKey: 'groupId' });
      Event.belongsTo(models.Venue, { foreignKey: 'venueId' });
      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: 'eventId',
        otherKey: 'userId',
        as: 'Attendee'
      });
      Event.hasMany(models.EventImage, { foreignKey: 'eventId' });
      Event.hasMany(models.Attendance, { foreignKey: 'eventId' });
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false,
      validate: {
        isIn: [['Online', 'In person']]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Event;
};
