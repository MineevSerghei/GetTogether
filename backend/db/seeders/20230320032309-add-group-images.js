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
        url: 'codingimage1.com/link1.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'codingimage1.com/link2.jpg',
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: ['1', '2', '3', '4', '5', '6'] }
    }, {});
  }
};
