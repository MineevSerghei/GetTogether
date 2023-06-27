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
        url: 'https://images.unsplash.com/photo-1665247238133-6235ac1d745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1259&q=80',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://images.unsplash.com/photo-1648704059987-4dc119236cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://images.unsplash.com/photo-1586980368323-8ce5db4c85ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
        preview: true
      },
      {
        eventId: 14,
        url: 'https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://images.unsplash.com/photo-1622020457014-aed1cc44f25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://images.unsplash.com/photo-1656942320074-354fcb6c5876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://images.unsplash.com/photo-1656942320074-354fcb6c5876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
        preview: true
      },
      {
        eventId: 19,
        url: 'https://images.unsplash.com/photo-1656942320074-354fcb6c5876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
        preview: true
      },
      {
        eventId: 20,
        url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 21,
        url: 'https://images.unsplash.com/photo-1576097449802-2aa05e59b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 22,
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 23,
        url: 'https://images.unsplash.com/photo-1502124781964-575d259e5433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 24,
        url: 'https://images.unsplash.com/photo-1502124781964-575d259e5433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 25,
        url: 'https://images.unsplash.com/photo-1502124781964-575d259e5433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 26,
        url: 'https://images.unsplash.com/photo-1573421706309-8e71afba54a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        preview: true
      },
      {
        eventId: 27,
        url: 'https://images.unsplash.com/photo-1505569127510-bde1536937bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
        preview: true
      },
      {
        eventId: 28,
        url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
        preview: true
      },
      {
        eventId: 29,
        url: 'https://images.unsplash.com/photo-1520323376666-640158c146df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80',
        preview: true
      },
      {
        eventId: 30,
        url: 'https://images.unsplash.com/photo-1453169753818-2feab4b4246d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        preview: true
      },
      {
        eventId: 31,
        url: 'https://images.unsplash.com/photo-1494375364506-901512970ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 32,
        url: 'https://images.unsplash.com/photo-1500679215756-b09636d3786e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 33,
        url: 'https://images.unsplash.com/photo-1538432091670-e6b79bd9bffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
        preview: true
      },
      {
        eventId: 34,
        url: 'https://images.unsplash.com/photo-1609528533272-913d0384a633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1529&q=80',
        preview: true
      },
      {
        eventId: 35,
        url: 'https://images.unsplash.com/photo-1545450660-3378a7f3a364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 36,
        url: 'https://images.unsplash.com/photo-1505850557988-b858c0aec076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        preview: true
      },
      {
        eventId: 37,
        url: 'https://images.unsplash.com/photo-1485452499676-62ab02c20e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 38,
        url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80',
        preview: true
      },
      {
        eventId: 39,
        url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80',
        preview: true
      },
      {
        eventId: 40,
        url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80',
        preview: true
      },
      {
        eventId: 41,
        url: 'https://images.unsplash.com/photo-1598785981370-6190e9bb79b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 42,
        url: 'https://images.unsplash.com/photo-1573800495261-93132cc8d578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80',
        preview: true
      },
      {
        eventId: 43,
        url: 'https://images.unsplash.com/photo-1566308356054-9a2d0164508f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 44,
        url: 'https://images.unsplash.com/photo-1607962776833-7ec9ef952784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 45,
        url: 'https://images.unsplash.com/photo-1607962776833-7ec9ef952784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 46,
        url: 'https://images.unsplash.com/photo-1607962776833-7ec9ef952784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 47,
        url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 48,
        url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 49,
        url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 50,
        url: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1427&q=80',
        preview: true
      },
      {
        eventId: 51,
        url: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1427&q=80',
        preview: true
      },
      {
        eventId: 52,
        url: 'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1427&q=80',
        preview: true
      },
      {
        eventId: 53,
        url: 'https://images.unsplash.com/photo-1508969566224-cd88a850b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 54,
        url: 'https://images.unsplash.com/photo-1508969566224-cd88a850b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 55,
        url: 'https://images.unsplash.com/photo-1508969566224-cd88a850b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 56,
        url: 'https://images.unsplash.com/photo-1621176280827-ec238e17285e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        preview: true
      },
      {
        eventId: 57,
        url: 'https://images.unsplash.com/photo-1620576797402-e697da8142bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        eventId: 58,
        url: 'https://images.unsplash.com/photo-1594802838222-9beeca126656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1837&q=80',
        preview: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options);
  }
};
