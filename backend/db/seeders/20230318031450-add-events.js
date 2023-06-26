'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Events';

    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: 'Friday night improv',
        description: `Come to Michael's place to have fun and improv' your improv skills!`,
        type: 'In person',
        capacity: 15,
        price: 0,
        startDate: new Date("2023-04-07 22:00:00"),
        endDate: new Date('2023-04-08 00:00:00')
      },
      {
        venueId: 2,
        groupId: 2,
        name: '3-Hour Coding Spree!',
        description: `Get together with fellow JS programmers and code 3 hours non-stop. Then have pizza together.`,
        type: 'In person',
        capacity: 20,
        price: 15,
        startDate: new Date('2023-04-01 19:00:00'),
        endDate: new Date('2023-04-02 00:00:00')
      },
      {
        groupId: 2,
        name: 'Pair Programming Sessions',
        description: `Zoom meeting with half hour quick introductions in main room, then randomly break up into groups of two to pair program! Have the Node environment set up, git and GitHub for sharing, and be ready to write JavaScript! (all levels are welcome)`,
        type: 'Online',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-04-05 22:00:00'),
        endDate: new Date('2023-04-06 01:00:00')
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'BBQ Ribs and Pork Chops! ',
        description: `Our regular planned BBQ get together!`,
        type: 'In person',
        capacity: 20,
        price: 50,
        startDate: new Date('2023-03-27 21:00:00'),
        endDate: new Date('2023-03-28 00:00:00')
      },
      {
        groupId: 2,
        name: 'Pair Programming Sessions',
        description: `Zoom meeting with half hour quick introductions in main room, then randomly break up into groups of two to pair program! Have the Node environment set up, git and GitHub for sharing, and be ready to write JavaScript! (all levels are welcome)`,
        type: 'Online',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-03-05 22:00:00'),
        endDate: new Date('2023-03-06 01:00:00')
      },
      {
        groupId: 2,
        name: 'Pair Programming Sessions',
        description: `Zoom meeting with half hour quick introductions in main room, then randomly break up into groups of two to pair program! Have the Node environment set up, git and GitHub for sharing, and be ready to write JavaScript! (all levels are welcome)`,
        type: 'Online',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-05-05 22:00:00'),
        endDate: new Date('2023-05-06 01:00:00')
      },
      {
        groupId: 2,
        name: 'Free Coding Lessons for Kids!',
        description: `Kids can start learning programming concepts at a very young age! We have groups for ages 2-3, 4-6, 7-10, 11-14. We are OFF screen as much as possible!`,
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-04-15 13:00:00'),
        endDate: new Date('2023-04-15 15:00:00')
      },
      {
        groupId: 2,
        name: 'Free Coding Lessons for Kids!',
        description: `Kids can start learning programming concepts at a very young age! We have groups for ages 2-3, 4-6, 7-10, 11-14. We are OFF screen as much as possible!`,
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-04-23 13:00:00'),
        endDate: new Date('2023-04-23 15:00:00')
      },
      {
        groupId: 4,
        name: '6-mile Hike',
        description: `6-mile hike, 2000 ft elevation gain, recommended ages: 12+, dogs allowed. Pack water!`,
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-04-08 12:00:00'),
        endDate: new Date('2023-04-08 16:00:00')
      },
      {
        groupId: 4,
        name: '6-mile Hike',
        description: `6-mile hike, 2000 ft elevation gain, recommended ages: 12+, dogs allowed. Come ready for a great scenery!`,
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2023-05-06 12:00:00'),
        endDate: new Date('2023-05-06 16:00:00')
      },
      {
    groupId: 5,
    name: 'Thursday Game Night: Trivia Kahoot',
    description: 'Trivia kahoots are our favorite! Join for fun, to make friends, and maybe even win a prize! 1st place will get an Amazon gift card for $50!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-06T22:00:00.000Z'),
    endDate: new Date('2023-07-07T01:00:00.000Z')
  },
  {
    groupId: 5,
    name: 'Thursday Game Night: Wordle',
    description: "Let's give it a try everyone!",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-13T22:00:00.000Z'),
    endDate: new Date('2023-07-14T01:00:00.000Z')
  },
  {
    groupId: 5,
    name: 'Thursday Game Night: To Be Determined',
    description: 'The game choice has not been decided yet, contact the organizer with ideas!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-06-29T22:00:00.000Z'),
    endDate: new Date('2023-06-30T01:00:00.000Z')
  },
  {
    groupId: 6,
    name: 'Cryptocurrency for Beginners: crypto-investment 101',
    description: 'We welcome everyone who wants to learn and invest in cryptocurrency. An hour long zoom lecture with q/a at the end. Take advantage!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-05T21:00:00.000Z'),
    endDate: new Date('2023-07-06T00:00:00.000Z')
  },
  {
    groupId: 6,
    name: 'Cryptocurrency in the Near Future',
    description: 'There are predictions by professionals over where the crypto world will go next. Tune in to find out!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-15T21:00:00.000Z'),
    endDate: new Date('2023-07-16T00:00:00.000Z')
  },
  {
    groupId: 6,
    name: 'Bitcoin or Gold',
    description: 'Our lead expert in investment will walk you through traditional vs. crypto pros and cons when you decide to invest. Choose wisely!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-25T21:00:00.000Z'),
    endDate: new Date('2023-07-26T00:00:00.000Z')
  },
  {
    groupId: 7,
    name: 'Bookworms Online Shakespeare Meeting #2',
    description: 'Continue to discuss the writings of William Shakespeare. Make sure to read the specified plays and bring nore friends!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-01T23:00:00.000Z'),
    endDate: new Date('2023-07-02T02:00:00.000Z')
  },
  {
    groupId: 7,
    name: 'Bookworms Online Shakespeare Meeting #3',
    description: 'Continue to discuss the writings of William Shakespeare. Make sure to read the specified plays and bring nore friends!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-16T23:00:00.000Z'),
    endDate: new Date('2023-07-17T02:00:00.000Z')
  },
  {
    groupId: 7,
    name: 'Bookworms Online Shakespeare Meeting #4',
    description: 'Continue to discuss the writings of William Shakespeare. Make sure to read the specified plays and bring nore friends!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-01T23:00:00.000Z'),
    endDate: new Date('2023-08-02T02:00:00.000Z')
  },
  {
    groupId: 8,
    name: 'Cooking Together Marathon day 1!',
    description: 'Cook together and be ready to follow our lead Linda in making her go-to recipe for chicken in the over french-style. The list of ingredients will be posted shortly!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-02T23:00:00.000Z'),
    endDate: new Date('2023-08-03T02:00:00.000Z')
  },
  {
    groupId: 8,
    name: 'Cooking Together Marathon day 2!',
    description: "Cook together and be ready to follow our lead Kevin in making his family's special cinnamon rolls! The list of ingredients will be posted shortly.",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-03T23:00:00.000Z'),
    endDate: new Date('2023-08-04T02:00:00.000Z')
  },
  {
    groupId: 8,
    name: 'Cooking Together Marathon day 3!',
    description: 'Cook together and be ready to follow our lead Jessica in making the most amazing grilled fish with vegetables! The list of ingredients will be posted shortly.',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-04T23:00:00.000Z'),
    endDate: new Date('2023-08-05T02:00:00.000Z')
  },
  {
    groupId: 9,
    name: 'Ballet Follow-Along with Debra',
    description: "Try some ballet with the careful instruction of a lifetime professional! Don't worry, however, you don't need to be anywhere near being a pro at this. The exercises start simple and in no time you'll enjoy it more than you'd ever thought!",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-08T15:00:00.000Z'),
    endDate: new Date('2023-07-08T18:00:00.000Z')
  },
  {
    groupId: 9,
    name: 'Ballet Follow-Along with Debra',
    description: "Try some ballet with the careful instruction of a lifetime professional! Don't worry, however, you don't need to be anywhere near being a pro at this. The exercises start simple and in no time you'll enjoy it more than you'd ever thought!",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-15T15:00:00.000Z'),
    endDate: new Date('2023-07-15T18:00:00.000Z')
  },
  {
    groupId: 9,
    name: 'Ballet Follow-Along with Debra',
    description: "Try some ballet with the careful instruction of a lifetime professional! Don't worry, however, you don't need to be anywhere near being a pro at this. The exercises start simple and in no time you'll enjoy it more than you'd ever thought!",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-22T15:00:00.000Z'),
    endDate: new Date('2023-07-22T18:00:00.000Z')
  },
  {
    groupId: 10,
    name: 'Weekly Painting/Drawing Session',
    description: "Brushes, oil paints and some good paper is all you'll need this week. As usual, the task will be revealed at the start of the meeting!",
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-02T22:00:00.000Z'),
    endDate: new Date('2023-07-03T01:00:00.000Z')
  },
  {
    groupId: 10,
    name: 'Weekly Painting/Drawing Session',
    description: 'Get ready your pencils, eraser, and a sketchbook. As usual, the task will be revealed at the start of the meeting!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-09T22:00:00.000Z'),
    endDate: new Date('2023-07-10T01:00:00.000Z')
  },
  {
    groupId: 10,
    name: 'Weekly Painting/Drawing Session',
    description: 'The project and media are to be determined. Stay tuned!',
    type: 'Online',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-16T22:00:00.000Z'),
    endDate: new Date('2023-07-17T01:00:00.000Z')
  },
  {
    groupId: 11,
    name: 'Silver Comet Trail, Here We Come!',
    description: 'Biking the Silver Comet Trail this week. Come! Bring water, your bike, and that would be all you need!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-15T13:00:00.000Z'),
    endDate: new Date('2023-07-15T16:00:00.000Z')
  },
  {
    groupId: 11,
    name: 'Atlanta BeltLine Trail',
    description: 'Biking the Atlanta BeltLine Trail this week. Come! Bring water, your bike, and that would be all you need!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-22T13:00:00.000Z'),
    endDate: new Date('2023-07-22T16:00:00.000Z')
  },
  {
    groupId: 11,
    name: 'Augusta Canal Trail on Bikes!',
    description: 'Biking the Augusta Canal Trail this week. Come! Bring water, your bike, and that would be all you need!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-29T13:00:00.000Z'),
    endDate: new Date('2023-07-29T16:00:00.000Z')
  },
  {
    groupId: 12,
    name: 'Shooting Range For Friends!',
    description: 'Come meet at the shooting range! We will hang out and shoot some arrows. Shooting range entance is $30, renting a bow starts at $20 an hour. Bring your own if you have it! \n' +
      ' Archery | Bow | Arrow | Sport',
    type: 'In person',
    capacity: 1000,
    price: 30,
    startDate: new Date('2023-07-15T16:00:00.000Z'),
    endDate: new Date('2023-07-15T19:00:00.000Z')
  },
  {
    groupId: 12,
    name: 'The Grand Archery Tournament!',
    description: 'Anyone over 18 years old is absolutely welcome to participate! Bows are provided. The number of archers is limited to 50 (SIGN UP QUICK) and the entry fee is $50 (which will mostly go to the winners!) 1st place: $1000, 2nd: $500, 3rd: $250',
    type: 'In person',
    capacity: 1000,
    price: 50,
    startDate: new Date('2023-07-29T16:00:00.000Z'),
    endDate: new Date('2023-07-29T19:00:00.000Z')
  },
  {
    groupId: 12,
    name: 'Shooting Range For Friends!',
    description: 'Come meet at the shooting range! We will hang out and shoot some arrows. Shooting range entance is $30, renting a bow starts at $20 an hour. Bring your own if you have it!',
    type: 'In person',
    capacity: 1000,
    price: 30,
    startDate: new Date('2023-08-12T16:00:00.000Z'),
    endDate: new Date('2023-08-12T19:00:00.000Z')
  },
  {
    groupId: 13,
    name: 'Fishing Fishing Fishing',
    description: "Early morning fishing while the fish still bite! When the bite is gone we'll chat and have fun! After fishing BBQ fee is $30.",
    type: 'In person',
    capacity: 1000,
    price: 30,
    startDate: new Date('2023-07-08T09:00:00.000Z'),
    endDate: new Date('2023-07-08T12:00:00.000Z')
  },
  {
    groupId: 13,
    name: 'Fishing Fishing Fishing',
    description: "Early morning fishing while the fish still bite! When the bite is gone we'll chat and have fun! After fishing BBQ fee is $30.",
    type: 'In person',
    capacity: 1000,
    price: 30,
    startDate: new Date('2023-07-15T09:00:00.000Z'),
    endDate: new Date('2023-07-15T12:00:00.000Z')
  },
  {
    groupId: 13,
    name: 'Fishing Fishing Fishing',
    description: "Early morning fishing while the fish still bite! When the bite is gone we'll chat and have fun! After fishing BBQ fee is $30.",
    type: 'In person',
    capacity: 1000,
    price: 30,
    startDate: new Date('2023-07-22T09:00:00.000Z'),
    endDate: new Date('2023-07-22T12:00:00.000Z')
  },
  {
    groupId: 14,
    name: 'New Spiderman Movie!',
    description: 'Go out for the new Spiderman movie and make new friends! Join the group!',
    type: 'In person',
    capacity: 1000,
    price: 14.99,
    startDate: new Date('2023-07-20T23:20:00.000Z'),
    endDate: new Date('2023-07-21T02:20:00.000Z')
  },
  {
    groupId: 14,
    name: 'New Guardians of the Galaxy Movie!',
    description: 'Go out for the new Guardians of the Galaxy movie and make new friends! Join the group!',
    type: 'In person',
    capacity: 1000,
    price: 14.99,
    startDate: new Date('2023-07-25T23:20:00.000Z'),
    endDate: new Date('2023-07-26T02:20:00.000Z')
  },
  {
    groupId: 14,
    name: 'New John Wick Movie!',
    description: 'Go out for the new John Wick movie and make new friends! Join the group!',
    type: 'In person',
    capacity: 1000,
    price: 14.99,
    startDate: new Date('2023-07-30T23:20:00.000Z'),
    endDate: new Date('2023-07-31T02:20:00.000Z')
  },
  {
    groupId: 15,
    name: 'Basketball Freestyle',
    description: 'Come for a game of basketball! Depending on the number of people we might shake it up a bit but good time is a must!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-04T21:30:00.000Z'),
    endDate: new Date('2023-07-05T00:30:00.000Z')
  },
  {
    groupId: 15,
    name: 'Basketball Teams',
    description: "Treat these as practice and tryouts to be in one of our group's teams. Whoever digs each others vibe can join up and make a new team!",
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-08T21:30:00.000Z'),
    endDate: new Date('2023-07-09T00:30:00.000Z')
  },
  {
    groupId: 15,
    name: 'Basketball Kids',
    description: 'Bring your kids! Expected ages: 8-12. Our passionate kids trainers will be happy to see you and help you fall in love with the sport!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-12T21:30:00.000Z'),
    endDate: new Date('2023-07-13T00:30:00.000Z')
  },
  {
    groupId: 16,
    name: 'We Workout',
    description: "Get together to get in shape together! Let's help each other stay on track and work out regularly. Work out as a team, no one get left behind!",
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-21T11:30:00.000Z'),
    endDate: new Date('2023-07-21T14:30:00.000Z')
  },
  {
    groupId: 16,
    name: 'We Workout',
    description: "Get together to get in shape together! Let's help each other stay on track and work out regularly. Work out as a team, no one get left behind!",
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-23T11:30:00.000Z'),
    endDate: new Date('2023-07-23T14:30:00.000Z')
  },
  {
    groupId: 16,
    name: 'We Workout',
    description: "Get together to get in shape together! Let's help each other stay on track and work out regularly. Work out as a team, no one get left behind!",
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-25T11:30:00.000Z'),
    endDate: new Date('2023-07-25T14:30:00.000Z')
  },
  {
    groupId: 17,
    name: 'Monthly Book Club Catchup',
    description: 'The book club for the book lovers. Our regular monthly meeting. Bring friends!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-20T22:30:00.000Z'),
    endDate: new Date('2023-07-21T01:30:00.000Z')
  },
  {
    groupId: 17,
    name: 'Monthly Book Club Catchup',
    description: 'The book club for the book lovers. Our regular monthly meeting. Bring friends!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-20T22:30:00.000Z'),
    endDate: new Date('2023-08-21T01:30:00.000Z')
  },
  {
    groupId: 17,
    name: 'Monthly Book Club Catchup',
    description: 'The book club for the book lovers. Our regular monthly meeting. Bring friends!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-09-20T22:30:00.000Z'),
    endDate: new Date('2023-09-21T01:30:00.000Z')
  },
  {
    groupId: 18,
    name: 'Workshop For Kids: Bird Feeder',
    description: 'Come and bring your kids for an exciting project to build! They will be building a bird feeder!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-06-17T13:30:00.000Z'),
    endDate: new Date('2023-06-17T16:30:00.000Z')
  },
  {
    groupId: 18,
    name: 'Workshop For Kids: Golf Mini-Game',
    description: 'Come and bring your kids for an exciting project to build! They will be building a golf mini-game!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-15T13:30:00.000Z'),
    endDate: new Date('2023-07-15T16:30:00.000Z')
  },
  {
    groupId: 18,
    name: 'Workshop For Kids: Flower Planter',
    description: 'Come and bring your kids for an exciting project to build! They will be building a flower planter!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-08-19T13:30:00.000Z'),
    endDate: new Date('2023-08-19T16:30:00.000Z')
  },
  {
    groupId: 19,
    name: 'Bible Study Group Weekly Meeting',
    description: 'We are on Psalms! We study the Bible, pray for each other, and grow in our relationship with Christ together. Join us!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-04T22:00:00.000Z'),
    endDate: new Date('2023-07-05T01:00:00.000Z')
  },
  {
    groupId: 19,
    name: 'Bible Study Group Weekly Meeting',
    description: 'We are on Psalms! We study the Bible, pray for each other, and grow in our relationship with Christ together. Join us!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-11T22:00:00.000Z'),
    endDate: new Date('2023-07-12T01:00:00.000Z')
  },
  {
    groupId: 19,
    name: 'Bible Study Group Weekly Meeting',
    description: 'We are on Psalms! We study the Bible, pray for each other, and grow in our relationship with Christ together. Join us!',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-18T22:00:00.000Z'),
    endDate: new Date('2023-07-19T01:00:00.000Z')
  },
  {
    groupId: 20,
    name: 'Free Swimming Lessons For Kids And Adults!',
    description: 'We will meet at the YMCA on Main St. Deep Pool. Entry requires YMCA membership.',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-10T22:00:00.000Z'),
    endDate: new Date('2023-07-11T01:00:00.000Z')
  },
  {
    groupId: 20,
    name: 'Free Swimming Lessons For Kids And Adults!',
    description: 'We will meet at the YMCA on Main St. Deep Pool. Entry requires YMCA membership.',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-20T22:00:00.000Z'),
    endDate: new Date('2023-07-21T01:00:00.000Z')
  },
  {
    groupId: 20,
    name: 'Free Swimming Lessons For Kids And Adults!',
    description: 'We will meets at the YMCA on Main St. Deep Pool. Entry requires YMCA membership.',
    type: 'In person',
    capacity: 1000,
    price: 0,
    startDate: new Date('2023-07-30T22:00:00.000Z'),
    endDate: new Date('2023-07-31T01:00:00.000Z')
  }
    ]);

  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Events';
    await queryInterface.bulkDelete(options);
  }
};
