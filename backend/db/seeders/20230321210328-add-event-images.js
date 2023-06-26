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
        url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80.jpeg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://images.unsplash.com/photo-1529262365544-55d1707e64e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://images.unsplash.com/photo-1599666520394-50d845fe09c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80.jpeg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://images.unsplash.com/photo-1599666520394-50d845fe09c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80.jpeg',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://images.unsplash.com/photo-1485809052957-5113b0ff51af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80.jpeg',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://images.unsplash.com/photo-1485809052957-5113b0ff51af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80.jpeg',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://picsum.photos/seed/dQmilzE3EJ/640/480',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://loremflickr.com/640/480?lock=8534419103023104',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://loremflickr.com/640/480?lock=133109620146176',
        preview: true
      },
      {
        eventId: 14,
        url: 'https://loremflickr.com/640/480?lock=1119207676706816',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://loremflickr.com/640/480?lock=7104576140345344',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://picsum.photos/seed/X298jg/640/480',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://picsum.photos/seed/y3b0OO/640/480',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://picsum.photos/seed/6BmY4/640/480',
        preview: true
      },
      {
        eventId: 19,
        url: 'https://picsum.photos/seed/WEIHY4R/640/480',
        preview: true
      },
      {
        eventId: 20,
        url: 'https://loremflickr.com/640/480?lock=5352590055309312',
        preview: true
      },
      {
        eventId: 21,
        url: 'https://loremflickr.com/640/480?lock=4271052047777792',
        preview: true
      },
      {
        eventId: 22,
        url: 'https://loremflickr.com/640/480?lock=9006229850423296',
        preview: true
      },
      {
        eventId: 23,
        url: 'https://loremflickr.com/640/480?lock=5483360654721024',
        preview: true
      },
      {
        eventId: 24,
        url: 'https://loremflickr.com/640/480?lock=5236694164963328',
        preview: true
      },
      {
        eventId: 25,
        url: 'https://picsum.photos/seed/29b2MFzdEQ/640/480',
        preview: true
      },
      {
        eventId: 26,
        url: 'https://picsum.photos/seed/7IHj6KBv0l/640/480',
        preview: true
      },
      {
        eventId: 27,
        url: 'https://picsum.photos/seed/cwyFNkk/640/480',
        preview: true
      },
      {
        eventId: 28,
        url: 'https://picsum.photos/seed/OCQ7Omkh/640/480',
        preview: true
      },
      {
        eventId: 29,
        url: 'https://loremflickr.com/640/480?lock=3787507388907520',
        preview: true
      },
      {
        eventId: 30,
        url: 'https://picsum.photos/seed/UKgm9R8P/640/480',
        preview: true
      },
      {
        eventId: 31,
        url: 'https://loremflickr.com/640/480?lock=749896976039936',
        preview: true
      },
      {
        eventId: 32,
        url: 'https://loremflickr.com/640/480?lock=6083295867568128',
        preview: true
      },
      {
        eventId: 33,
        url: 'https://picsum.photos/seed/BsJjCJd/640/480',
        preview: true
      },
      {
        eventId: 34,
        url: 'https://picsum.photos/seed/wQ1XoCC/640/480',
        preview: true
      },
      {
        eventId: 35,
        url: 'https://picsum.photos/seed/8t5pjl/640/480',
        preview: true
      },
      {
        eventId: 36,
        url: 'https://loremflickr.com/640/480?lock=7550159927902208',
        preview: true
      },
      {
        eventId: 37,
        url: 'https://picsum.photos/seed/mZAzpiSh0t/640/480',
        preview: true
      },
      {
        eventId: 38,
        url: 'https://loremflickr.com/640/480?lock=4484518471794688',
        preview: true
      },
      {
        eventId: 39,
        url: 'https://loremflickr.com/640/480?lock=7852060053602304',
        preview: true
      },
      {
        eventId: 40,
        url: 'https://picsum.photos/seed/0xGSPq/640/480',
        preview: true
      },
      {
        eventId: 41,
        url: 'https://picsum.photos/seed/Dp1celM/640/480',
        preview: true
      },
      {
        eventId: 42,
        url: 'https://picsum.photos/seed/pTp3zDUK/640/480',
        preview: true
      },
      {
        eventId: 43,
        url: 'https://loremflickr.com/640/480?lock=376040597749760',
        preview: true
      },
      {
        eventId: 44,
        url: 'https://picsum.photos/seed/7V7rPADfa0/640/480',
        preview: true
      },
      {
        eventId: 45,
        url: 'https://picsum.photos/seed/cN5efAj0F/640/480',
        preview: true
      },
      {
        eventId: 46,
        url: 'https://picsum.photos/seed/gSGfm/640/480',
        preview: true
      },
      {
        eventId: 47,
        url: 'https://loremflickr.com/640/480?lock=8492319170887680',
        preview: true
      },
      {
        eventId: 48,
        url: 'https://loremflickr.com/640/480?lock=5092059142684672',
        preview: true
      },
      {
        eventId: 49,
        url: 'https://picsum.photos/seed/RDAicsIGMY/640/480',
        preview: true
      },
      {
        eventId: 50,
        url: 'https://picsum.photos/seed/GSI9K/640/480',
        preview: true
      },
      {
        eventId: 51,
        url: 'https://loremflickr.com/640/480?lock=1949655311056896',
        preview: true
      },
      {
        eventId: 52,
        url: 'https://picsum.photos/seed/jeoORE/640/480',
        preview: true
      },
      {
        eventId: 53,
        url: 'https://picsum.photos/seed/bba6RdPO7e/640/480',
        preview: true
      },
      {
        eventId: 54,
        url: 'https://loremflickr.com/640/480?lock=5015984962273280',
        preview: true
      },
      {
        eventId: 55,
        url: 'https://picsum.photos/seed/EabKJ/640/480',
        preview: true
      },
      {
        eventId: 56,
        url: 'https://picsum.photos/seed/cm8MhTbhV4/640/480',
        preview: true
      },
      {
        eventId: 57,
        url: 'https://loremflickr.com/640/480?lock=448086446964736',
        preview: true
      },
      {
        eventId: 58,
        url: 'https://picsum.photos/seed/Xvek1S1Nb/640/480',
        preview: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options);
  }
};
