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
        name: "Stop Goldenface",
        about: "Stop Goldenface\'s schemes and prevent all his villany! Put him in jail if possible.",
        type: "In person",
        private: true,
        city: "Threat Level Midnight",
        state: "PA",
        organizerId: 5,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options);

  }
};
