'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'EventImages';

    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'improvimage.com/link1.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'improvimage.com/link2.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        preview: false
      },
      {
        eventId: 1,
        url: 'secretimage.com/link1.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'secretimage.com/link2.jpg',
        preview: false
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options);
  }
};
