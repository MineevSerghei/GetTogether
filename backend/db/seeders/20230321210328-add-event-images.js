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
        url: 'codingimage1.com/link1.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'codingimage1.com/link2.jpg',
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
