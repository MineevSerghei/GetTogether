'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        name: "Improv Group",
        about: "Improve your acting, become a better public speaker, meet new people, and have fun",
        type: "In person",
        private: false,
        city: "Scranton",
        state: "PA",
        organizerId: 4,
      },
      {
        name: "JS Coders",
        about: "Get together with fellow JS programmers and code non-stop.",
        type: "In person",
        private: false,
        city: "New York",
        state: "NY",
        organizerId: 2,
      },
      {
        name: "NYC Barbecue!",
        about: "Get together on weekends in NYC Central Park to enjoy some barbecue! We meet every other weekend in spring, summer, and fall.",
        type: "In person",
        private: false,
        city: "NYC",
        state: "NY",
        organizerId: 5,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options);

  }
};
