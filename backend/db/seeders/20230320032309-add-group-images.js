'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'GroupImages';

    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'improvimage.com/link1.jpg',
        preview: true
      },
      {
        groupId: 1,
        url: 'improvimage.com/link2.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        preview: false
      },
      {
        groupId: 3,
        url: 'secretimage.com/link1.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'secretimage.com/link2.jpg',
        preview: false
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options);
  }
};
