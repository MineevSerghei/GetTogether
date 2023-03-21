'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Venues';

    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: `Michael's Condo`,
        city: 'Scranton',
        state: 'PA',
        lat: 41.4090,
        lng: 75.6624
      },
      {
        groupId: 2,
        address: `301 East Windsor Road`,
        city: 'New York City',
        state: 'NY',
        lat: 40.7128,
        lng: 74.0060
      },
      {
        groupId: 3,
        address: `1111 S Figueroa St`,
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.0430,
        lng: 118.2673
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options);
  }
};
