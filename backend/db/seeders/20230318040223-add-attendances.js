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
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 2,
        status: 'waitlist'
      },
      {
        eventId: 1,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 1,
        status: 'attending'
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.bulkDelete(options);
  }
};
