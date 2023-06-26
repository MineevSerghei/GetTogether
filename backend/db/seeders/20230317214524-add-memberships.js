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
      },
      { userId: 28, groupId: 1, status: 'member' },
      { userId: 105, groupId: 1, status: 'member' },
      { userId: 16, groupId: 1, status: 'member' },
      { userId: 73, groupId: 1, status: 'member' },
      { userId: 30, groupId: 1, status: 'member' },
      { userId: 7, groupId: 1, status: 'member' },
      { userId: 56, groupId: 1, status: 'member' },
      { userId: 60, groupId: 1, status: 'pending' },
      { userId: 46, groupId: 1, status: 'pending' },
      { userId: 87, groupId: 1, status: 'pending' },
      { userId: 77, groupId: 1, status: 'co-host' },
      { userId: 94, groupId: 1, status: 'co-host' },
      { userId: 76, groupId: 1, status: 'co-host' },
      { userId: 43, groupId: 2, status: 'member' },
      { userId: 99, groupId: 2, status: 'member' },
      { userId: 47, groupId: 2, status: 'member' },
      { userId: 83, groupId: 2, status: 'member' },
      { userId: 60, groupId: 2, status: 'member' },
      { userId: 15, groupId: 2, status: 'member' },
      { userId: 14, groupId: 2, status: 'pending' },
      { userId: 96, groupId: 2, status: 'pending' },
      { userId: 33, groupId: 2, status: 'co-host' },
      { userId: 79, groupId: 2, status: 'co-host' },
      { userId: 41, groupId: 3, status: 'member' },
      { userId: 9, groupId: 3, status: 'member' },
      { userId: 93, groupId: 3, status: 'member' },
      { userId: 70, groupId: 3, status: 'member' },
      { userId: 24, groupId: 3, status: 'member' },
      { userId: 102, groupId: 3, status: 'member' },
      { userId: 100, groupId: 3, status: 'member' },
      { userId: 48, groupId: 3, status: 'pending' },
      { userId: 17, groupId: 3, status: 'pending' },
      { userId: 30, groupId: 3, status: 'co-host' },
      { userId: 43, groupId: 3, status: 'co-host' },
      { userId: 86, groupId: 4, status: 'member' },
      { userId: 62, groupId: 4, status: 'member' },
      { userId: 19, groupId: 4, status: 'member' },
      { userId: 66, groupId: 4, status: 'member' },
      { userId: 36, groupId: 4, status: 'member' },
      { userId: 32, groupId: 4, status: 'member' },
      { userId: 20, groupId: 4, status: 'member' },
      { userId: 101, groupId: 4, status: 'member' },
      { userId: 43, groupId: 4, status: 'pending' },
      { userId: 88, groupId: 4, status: 'pending' },
      { userId: 45, groupId: 4, status: 'co-host' },
      { userId: 13, groupId: 5, status: 'member' },
      { userId: 41, groupId: 5, status: 'member' },
      { userId: 78, groupId: 5, status: 'member' },
      { userId: 59, groupId: 5, status: 'member' },
      { userId: 50, groupId: 5, status: 'member' },
      { userId: 23, groupId: 5, status: 'member' },
      { userId: 21, groupId: 5, status: 'pending' },
      { userId: 51, groupId: 5, status: 'pending' },
      { userId: 14, groupId: 5, status: 'co-host' },
      { userId: 29, groupId: 6, status: 'member' },
      { userId: 63, groupId: 6, status: 'member' },
      { userId: 82, groupId: 6, status: 'member' },
      { userId: 58, groupId: 6, status: 'member' },
      { userId: 10, groupId: 6, status: 'member' },
      { userId: 75, groupId: 6, status: 'member' },
      { userId: 101, groupId: 6, status: 'member' },
      { userId: 25, groupId: 6, status: 'member' },
      { userId: 18, groupId: 6, status: 'member' },
      { userId: 52, groupId: 6, status: 'member' },
      { userId: 16, groupId: 6, status: 'pending' },
      { userId: 53, groupId: 6, status: 'pending' },
      { userId: 43, groupId: 6, status: 'pending' },
      { userId: 40, groupId: 6, status: 'pending' },
      { userId: 59, groupId: 6, status: 'co-host' },
      { userId: 74, groupId: 7, status: 'member' },
      { userId: 22, groupId: 7, status: 'member' },
      { userId: 20, groupId: 7, status: 'member' },
      { userId: 54, groupId: 7, status: 'member' },
      { userId: 66, groupId: 7, status: 'member' },
      { userId: 73, groupId: 7, status: 'member' },
      { userId: 84, groupId: 7, status: 'member' },
      { userId: 68, groupId: 7, status: 'member' },
      { userId: 89, groupId: 7, status: 'member' },
      { userId: 43, groupId: 7, status: 'member' },
      { userId: 31, groupId: 7, status: 'member' },
      { userId: 44, groupId: 7, status: 'member' },
      { userId: 27, groupId: 7, status: 'pending' },
      { userId: 9, groupId: 7, status: 'pending' },
      { userId: 61, groupId: 7, status: 'co-host' },
      { userId: 70, groupId: 7, status: 'co-host' },
      { userId: 33, groupId: 8, status: 'member' },
      { userId: 89, groupId: 8, status: 'member' },
      { userId: 56, groupId: 8, status: 'member' },
      { userId: 98, groupId: 8, status: 'member' },
      { userId: 101, groupId: 8, status: 'member' },
      { userId: 8, groupId: 8, status: 'member' },
      { userId: 40, groupId: 8, status: 'member' },
      { userId: 24, groupId: 8, status: 'pending' },
      { userId: 65, groupId: 8, status: 'pending' },
      { userId: 90, groupId: 8, status: 'pending' },
      { userId: 28, groupId: 8, status: 'co-host' },
      { userId: 24, groupId: 9, status: 'member' },
      { userId: 18, groupId: 9, status: 'member' },
      { userId: 49, groupId: 9, status: 'member' },
      { userId: 91, groupId: 9, status: 'member' },
      { userId: 90, groupId: 9, status: 'pending' },
      { userId: 6, groupId: 9, status: 'pending' },
      { userId: 66, groupId: 9, status: 'co-host' },
      { userId: 99, groupId: 10, status: 'member' },
      { userId: 26, groupId: 10, status: 'member' },
      { userId: 93, groupId: 10, status: 'member' },
      { userId: 72, groupId: 10, status: 'member' },
      { userId: 40, groupId: 10, status: 'pending' },
      { userId: 13, groupId: 10, status: 'co-host' },
      { userId: 72, groupId: 11, status: 'member' },
      { userId: 54, groupId: 11, status: 'member' },
      { userId: 27, groupId: 11, status: 'member' },
      { userId: 25, groupId: 11, status: 'member' },
      { userId: 20, groupId: 11, status: 'member' },
      { userId: 38, groupId: 11, status: 'member' },
      { userId: 23, groupId: 11, status: 'member' },
      { userId: 41, groupId: 11, status: 'member' },
      { userId: 22, groupId: 11, status: 'member' },
      { userId: 36, groupId: 11, status: 'pending' },
      { userId: 39, groupId: 11, status: 'pending' },
      { userId: 81, groupId: 11, status: 'co-host' },
      { userId: 37, groupId: 11, status: 'co-host' },
      { userId: 42, groupId: 11, status: 'co-host' },
      { userId: 101, groupId: 12, status: 'member' },
      { userId: 32, groupId: 12, status: 'member' },
      { userId: 19, groupId: 12, status: 'member' },
      { userId: 43, groupId: 12, status: 'member' },
      { userId: 75, groupId: 12, status: 'member' },
      { userId: 46, groupId: 12, status: 'member' },
      { userId: 25, groupId: 12, status: 'member' },
      { userId: 20, groupId: 12, status: 'member' },
      { userId: 36, groupId: 12, status: 'member' },
      { userId: 63, groupId: 12, status: 'pending' },
      { userId: 47, groupId: 12, status: 'pending' },
      { userId: 103, groupId: 12, status: 'pending' },
      { userId: 49, groupId: 12, status: 'pending' },
      { userId: 87, groupId: 12, status: 'co-host' },
      { userId: 76, groupId: 12, status: 'co-host' },
      { userId: 39, groupId: 13, status: 'member' },
      { userId: 52, groupId: 13, status: 'member' },
      { userId: 32, groupId: 13, status: 'member' },
      { userId: 35, groupId: 13, status: 'member' },
      { userId: 77, groupId: 13, status: 'member' },
      { userId: 62, groupId: 13, status: 'member' },
      { userId: 90, groupId: 13, status: 'pending' },
      { userId: 96, groupId: 13, status: 'co-host' },
      { userId: 11, groupId: 13, status: 'co-host' },
      { userId: 26, groupId: 14, status: 'member' },
      { userId: 71, groupId: 14, status: 'member' },
      { userId: 39, groupId: 14, status: 'member' },
      { userId: 38, groupId: 14, status: 'member' },
      { userId: 82, groupId: 14, status: 'member' },
      { userId: 87, groupId: 14, status: 'member' },
      { userId: 59, groupId: 14, status: 'member' },
      { userId: 21, groupId: 14, status: 'member' },
      { userId: 73, groupId: 14, status: 'pending' },
      { userId: 36, groupId: 14, status: 'pending' },
      { userId: 104, groupId: 14, status: 'pending' },
      { userId: 44, groupId: 14, status: 'co-host' },
      { userId: 69, groupId: 14, status: 'co-host' },
      { userId: 67, groupId: 15, status: 'member' },
      { userId: 99, groupId: 15, status: 'member' },
      { userId: 52, groupId: 15, status: 'member' },
      { userId: 43, groupId: 15, status: 'member' },
      { userId: 45, groupId: 15, status: 'member' },
      { userId: 17, groupId: 15, status: 'member' },
      { userId: 54, groupId: 15, status: 'pending' },
      { userId: 36, groupId: 15, status: 'co-host' },
      { userId: 35, groupId: 15, status: 'co-host' },
      { userId: 12, groupId: 16, status: 'member' },
      { userId: 29, groupId: 16, status: 'member' },
      { userId: 94, groupId: 16, status: 'member' },
      { userId: 75, groupId: 16, status: 'member' },
      { userId: 99, groupId: 16, status: 'member' },
      { userId: 87, groupId: 16, status: 'member' },
      { userId: 18, groupId: 16, status: 'member' },
      { userId: 83, groupId: 16, status: 'member' },
      { userId: 57, groupId: 16, status: 'member' },
      { userId: 70, groupId: 16, status: 'member' },
      { userId: 30, groupId: 16, status: 'member' },
      { userId: 6, groupId: 16, status: 'member' },
      { userId: 103, groupId: 16, status: 'member' },
      { userId: 98, groupId: 16, status: 'member' },
      { userId: 69, groupId: 16, status: 'pending' },
      { userId: 31, groupId: 16, status: 'pending' },
      { userId: 64, groupId: 16, status: 'pending' },
      { userId: 72, groupId: 16, status: 'co-host' },
      { userId: 40, groupId: 16, status: 'co-host' },
      { userId: 17, groupId: 17, status: 'member' },
      { userId: 103, groupId: 17, status: 'member' },
      { userId: 35, groupId: 17, status: 'member' },
      { userId: 19, groupId: 17, status: 'member' },
      { userId: 28, groupId: 17, status: 'member' },
      { userId: 66, groupId: 17, status: 'member' },
      { userId: 71, groupId: 17, status: 'member' },
      { userId: 39, groupId: 17, status: 'member' },
      { userId: 30, groupId: 17, status: 'member' },
      { userId: 31, groupId: 17, status: 'pending' },
      { userId: 54, groupId: 17, status: 'pending' },
      { userId: 16, groupId: 17, status: 'pending' },
      { userId: 50, groupId: 17, status: 'co-host' },
      { userId: 21, groupId: 17, status: 'co-host' },
      { userId: 51, groupId: 18, status: 'member' },
      { userId: 52, groupId: 18, status: 'member' },
      { userId: 75, groupId: 18, status: 'member' },
      { userId: 40, groupId: 18, status: 'member' },
      { userId: 94, groupId: 18, status: 'member' },
      { userId: 62, groupId: 18, status: 'member' },
      { userId: 29, groupId: 18, status: 'member' },
      { userId: 19, groupId: 18, status: 'pending' },
      { userId: 14, groupId: 18, status: 'pending' },
      { userId: 24, groupId: 18, status: 'pending' },
      { userId: 91, groupId: 18, status: 'pending' },
      { userId: 53, groupId: 18, status: 'co-host' },
      { userId: 47, groupId: 18, status: 'co-host' },
      { userId: 75, groupId: 19, status: 'member' },
      { userId: 69, groupId: 19, status: 'member' },
      { userId: 54, groupId: 19, status: 'member' },
      { userId: 72, groupId: 19, status: 'member' },
      { userId: 68, groupId: 19, status: 'member' },
      { userId: 91, groupId: 19, status: 'member' },
      { userId: 89, groupId: 19, status: 'member' },
      { userId: 40, groupId: 19, status: 'member' },
      { userId: 15, groupId: 19, status: 'member' },
      { userId: 10, groupId: 19, status: 'member' },
      { userId: 45, groupId: 19, status: 'member' },
      { userId: 78, groupId: 19, status: 'pending' },
      { userId: 105, groupId: 19, status: 'pending' },
      { userId: 95, groupId: 19, status: 'pending' },
      { userId: 52, groupId: 19, status: 'co-host' },
      { userId: 48, groupId: 20, status: 'member' },
      { userId: 90, groupId: 20, status: 'member' },
      { userId: 72, groupId: 20, status: 'member' },
      { userId: 19, groupId: 20, status: 'member' },
      { userId: 16, groupId: 20, status: 'pending' },
      { userId: 32, groupId: 20, status: 'pending' },
      { userId: 58, groupId: 20, status: 'co-host' }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options);

  }
};
