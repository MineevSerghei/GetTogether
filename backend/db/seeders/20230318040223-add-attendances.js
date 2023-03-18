'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendances';

    await queryInterface.bulkInsert(options, [
      {
        eventId: 2,
        userId: 2
      },
      {
        eventId: 3,
        userId: 2
      },
      {
        eventId: 1,
        userId: 2
      },
      {
        eventId: 4,
        userId: 5
      },
      {
        eventId: 1,
        userId: 4
      },
      {
        eventId: 1,
        userId: 1
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: ['1', '2', '3', '4', '5', '6'] }
    }, {});
  }
};
