'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Memberships';

    await queryInterface.bulkInsert(options, [
      {
        userId: 2,
        groupId: 1,
        status: 'co-host'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'pending'
      },
      {
        userId: 1,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 4,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 4,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 1,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 2,
        groupId: 4,
        status: 'member'
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options);

  }
};
