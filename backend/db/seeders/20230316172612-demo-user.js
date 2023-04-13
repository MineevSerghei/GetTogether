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
        email: 'jane@email.com',
        username: 'jane',
        firstName: 'Jane',
        lastName: 'Capaldi',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'serghei@email.com',
        username: 'serghei',
        firstName: 'Serghei',
        lastName: 'Mineev',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'adam@email.com',
        username: 'adam',
        firstName: 'Adam',
        lastName: 'Some',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'michael@email.com',
        username: 'MichaelScott',
        firstName: 'Michael',
        lastName: 'Scott',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'secret_michael@email.com',
        username: 'MichaelScarn',
        firstName: 'Michael',
        lastName: 'Scarn',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options);
  }
};
