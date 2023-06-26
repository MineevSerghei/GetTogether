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
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        groupId: 1,
        url: 'https://images.unsplash.com/photo-1499720843949-d9e6f318dca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80.jpeg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpeg',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://images.unsplash.com/photo-1558030089-02acba3c214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80.jpeg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://images.unsplash.com/photo-1626323107890-cce0b8c2c641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80.jpeg',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80.jpeg',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://picsum.photos/seed/fZ36Tkc6TY/640/480',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://loremflickr.com/640/480?lock=2838858634887168',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://loremflickr.com/640/480?lock=3500108698091520',
        preview: true
      },
      {
        groupId: 6,
        url: 'https://picsum.photos/seed/4UXWbk7rQx/640/480',
        preview: false
      },
      {
        groupId: 7,
        url: 'https://loremflickr.com/640/480?lock=1297881942196224',
        preview: true
      },
      {
        groupId: 7,
        url: 'https://loremflickr.com/640/480?lock=7438658120450048',
        preview: false
      },
      {
        groupId: 8,
        url: 'https://loremflickr.com/640/480?lock=3535511903797248',
        preview: true
      },
      {
        groupId: 8,
        url: 'https://picsum.photos/seed/Vj9Wv/640/480',
        preview: false
      },
      {
        groupId: 9,
        url: 'https://loremflickr.com/640/480?lock=8466957783269376',
        preview: true
      },
      {
        groupId: 9,
        url: 'https://loremflickr.com/640/480?lock=1599308749078528',
        preview: false
      },
      {
        groupId: 9,
        url: 'https://loremflickr.com/640/480?lock=5707826370445312',
        preview: false
      },
      {
        groupId: 9,
        url: 'https://loremflickr.com/640/480?lock=596871584153600',
        preview: false
      },
      {
        groupId: 10,
        url: 'https://picsum.photos/seed/DI5ZT2/640/480',
        preview: true
      },
      {
        groupId: 10,
        url: 'https://picsum.photos/seed/LdYHK/640/480',
        preview: false
      },
      {
        groupId: 11,
        url: 'https://loremflickr.com/640/480?lock=7008062485299200',
        preview: true
      },
      {
        groupId: 11,
        url: 'https://loremflickr.com/640/480?lock=4960874580148224',
        preview: false
      },
      {
        groupId: 12,
        url: 'https://loremflickr.com/640/480?lock=4189809843109888',
        preview: true
      },
      {
        groupId: 12,
        url: 'https://loremflickr.com/640/480?lock=4946770175983616',
        preview: false
      },
      {
        groupId: 13,
        url: 'https://picsum.photos/seed/6BsD37bqt/640/480',
        preview: true
      },
      {
        groupId: 13,
        url: 'https://picsum.photos/seed/W6m5Iun/640/480',
        preview: false
      },
      {
        groupId: 13,
        url: 'https://picsum.photos/seed/pt9ijs/640/480',
        preview: false
      },
      {
        groupId: 13,
        url: 'https://picsum.photos/seed/0wc7Qf4Ane/640/480',
        preview: false
      },
      {
        groupId: 13,
        url: 'https://loremflickr.com/640/480?lock=8633267194429440',
        preview: false
      },
      {
        groupId: 14,
        url: 'https://loremflickr.com/640/480?lock=2892587537006592',
        preview: true
      },
      {
        groupId: 14,
        url: 'https://picsum.photos/seed/9BHkizr4oz/640/480',
        preview: false
      },
      {
        groupId: 14,
        url: 'https://loremflickr.com/640/480?lock=5280061257154560',
        preview: false
      },
      {
        groupId: 15,
        url: 'https://loremflickr.com/640/480?lock=6652351330910208',
        preview: true
      },
      {
        groupId: 15,
        url: 'https://picsum.photos/seed/oMwDA6K/640/480',
        preview: false
      },
      {
        groupId: 16,
        url: 'https://picsum.photos/seed/tFO7PD4b/640/480',
        preview: true
      },
      {
        groupId: 16,
        url: 'https://picsum.photos/seed/WkEoaLd/640/480',
        preview: false
      },
      {
        groupId: 16,
        url: 'https://loremflickr.com/640/480?lock=163963916517376',
        preview: false
      },
      {
        groupId: 17,
        url: 'https://loremflickr.com/640/480?lock=2332592013574144',
        preview: true
      },
      {
        groupId: 17,
        url: 'https://picsum.photos/seed/anKOFZ/640/480',
        preview: false
      },
      {
        groupId: 17,
        url: 'https://picsum.photos/seed/qmzWeAAkz/640/480',
        preview: false
      },
      {
        groupId: 17,
        url: 'https://loremflickr.com/640/480?lock=1440255366397952',
        preview: false
      },
      {
        groupId: 18,
        url: 'https://loremflickr.com/640/480?lock=6318892425150464',
        preview: true
      },
      {
        groupId: 18,
        url: 'https://picsum.photos/seed/aKFIS0efHf/640/480',
        preview: false
      },
      {
        groupId: 18,
        url: 'https://loremflickr.com/640/480?lock=563008713523200',
        preview: false
      },
      {
        groupId: 18,
        url: 'https://loremflickr.com/640/480?lock=2184062194155520',
        preview: false
      },
      {
        groupId: 18,
        url: 'https://loremflickr.com/640/480?lock=479485864443904',
        preview: false
      },
      {
        groupId: 19,
        url: 'https://loremflickr.com/640/480?lock=6173324438667264',
        preview: true
      },
      {
        groupId: 19,
        url: 'https://picsum.photos/seed/2mcwUI/640/480',
        preview: false
      },
      {
        groupId: 19,
        url: 'https://loremflickr.com/640/480?lock=8712920819040256',
        preview: false
      },
      {
        groupId: 20,
        url: 'https://picsum.photos/seed/EA8F2/640/480',
        preview: true
      },
      {
        groupId: 20,
        url: 'https://loremflickr.com/640/480?lock=641573891080192',
        preview: false
      },
      {
        groupId: 20,
        url: 'https://loremflickr.com/640/480?lock=2493991683620864',
        preview: false
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options);
  }
};
