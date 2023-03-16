'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@email.com',
        username: 'Demo-user',
        firstName: 'De',
        lastName: 'Mo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'serghei@email.com',
        username: 'serghei',
        firstName: 'Serghei',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'some-other-user@email.com',
        username: 'some-other-user',
        lastName: 'Some name',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-user', 'serghei', 'some-other-user'] }
    }, {});
  }
};
