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
        private: true,
        city: "Scranton",
        state: "PA",
        organizerId: 4,
      },
      {
        name: "3-hour Group Coding Spree",
        about: "Get together with fellow JS programmers and code non-stop for 3 hours.",
        type: "In person",
        private: true,
        city: "New York",
        state: "NY",
        organizerId: 2,
      },
      {
        name: "Stop Goldenface",
        about: "prevent Goldenface from blowing up the NHL All-Star Game and killing hostages",
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
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: ['1', '2', '3'] }
    }, {});

  }
};
