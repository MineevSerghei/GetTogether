'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Events';

    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: 'Friday night improv',
        description: `Come to Michael's place to have fun and improv' your improv skills!`,
        type: 'In person',
        capacity: 15,
        price: 0,
        startDate: new Date("2023-04-07 06:00:00"),
        endDate: new Date('2023-04-07 08:00:00')
      },
      {
        venueId: 2,
        groupId: 2,
        name: '3-Hour Coding Spree!',
        description: `Get together with fellow JS programmers and code 3 hours non-stop. Then have pizza together.`,
        type: 'In person',
        capacity: 20,
        price: 15,
        startDate: new Date('2023-04-01 03:00:00'),
        endDate: new Date('2023-04-01 08:00:00')
      },
      {
        groupId: 2,
        name: 'Pair Programming Sessions',
        description: `Zoom meeting with half hour quick introductions in main room, then randomly break up into groups of two to pair program! Have the Node environment set up, git and GitHub for sharing, and be ready to write JavaScript! (all levels are welcome)`,
        type: 'Online',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-04-05 06:00:00'),
        endDate: new Date('2023-04-05 09:00:00')
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'BBQ Ribs and Pork Chops! ',
        description: `Our regular planned BBQ get together!`,
        type: 'In person',
        capacity: 20,
        price: 50,
        startDate: new Date('2023-03-27 05:00:00'),
        endDate: new Date('2023-04-27 06:00:00')
      },
      {
        groupId: 2,
        name: 'Pair Programming Sessions',
        description: `Zoom meeting with half hour quick introductions in main room, then randomly break up into groups of two to pair program! Have the Node environment set up, git and GitHub for sharing, and be ready to write JavaScript! (all levels are welcome)`,
        type: 'Online',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-03-05 06:00:00'),
        endDate: new Date('2023-03-05 09:00:00')
      }
    ]);

  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Events';
    await queryInterface.bulkDelete(options);
  }
};
