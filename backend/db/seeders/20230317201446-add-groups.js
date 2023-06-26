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
        state: "Pennsylvania",
        organizerId: 4,
      },
      {
        name: "JS Coders",
        about: "Get together with fellow JS programmers and code non-stop.",
        type: "In person",
        private: false,
        city: "New York",
        state: "New York",
        organizerId: 2,
      },
      {
        name: "NYC Barbecue!",
        about: "Get together on weekends in NYC Central Park to enjoy some barbecue! We meet every other weekend in spring, summer, and fall.",
        type: "In person",
        private: false,
        city: "NYC",
        state: "New York",
        organizerId: 5,
      },
      {
        name: "Hikers of Suffield",
        about: "Hiking is incredible, especially in Virginia mountains!  We have kid-friendly and animal-friendly hikes as well as adult only. Join us for a hike!",
        type: "In person",
        private: false,
        city: "Suffield",
        state: "Virginia",
        organizerId: 3,
      },
      {
        name: 'Online Game Night',
        about: 'We meet Thursday nights to play some zoom-friendly games! We can split into rooms, sometimes we have a big party game. Generally, you will know the agenda before the event. Trivia kahoots are one of our favorites!',
        type: 'Online',
        private: false,
        city: 'Hoeger-Braunport',
        state: 'North Dakota',
        organizerId: 40
      },
      {
        name: 'Cryptocurrency for Beginners',
        about: 'We welcome everyone who wants to learn and invest in cryptocurrency. Sharing knowledge and ideas in a casual setting. Great for those new to Bitcoin investing and trading.',
        type: 'Online',
        private: true,
        city: 'Destinshire',
        state: 'New Hampshire',
        organizerId: 33
      },
      {
        name: 'Bookworms Online',
        about: "The book club that you don't need to leave you house to go to! Perfect for the busy ones who want to read together and make new friends.",
        type: 'Online',
        private: false,
        city: 'West Jimmyside',
        state: 'Kentucky',
        organizerId: 6
      },
      {
        name: 'Cooking Together!',
        about: "Most of us have recipes that only our family knows. None of us know all the recipes, tips and tricks when it comes to food and cooking. So, share, cook together, and learn from others. Let's make both cooking and food enjoyable!",
        type: 'Online',
        private: false,
        city: 'Kuvalisview',
        state: 'Massachusetts',
        organizerId: 9
      },
      {
        name: 'Ballet Is For Everyone',
        about: "Try some ballet with us! The exercises start simple and in no time you'll enjoy it more than you'd ever thought!",
        type: 'Online',
        private: false,
        city: 'West Waylonhaven',
        state: 'Arkansas',
        organizerId: 13
      },
      {
        name: 'Drawing and Painting with Friends!',
        about: "Get on the call, get you gear out, and let's make some art! We have different topics and media each time so you'll never be bored. Share what you've created only if you are comfortable!",
        type: 'Online',
        private: false,
        city: 'South Ezra',
        state: 'Maryland',
        organizerId: 15
      },
      {
        name: 'Casual Bikers',
        about: "Do you have a bike? Are you in the area? Then why are you still not here!? We bike the best trails in the area and it's super relaxed!",
        type: 'In person',
        private: false,
        city: 'Fort Jadenside',
        state: 'Georgia',
        organizerId: 51
      },
      {
        name: 'All About Archery',
        about: 'This group is all about Archery! We can talk archery, do archery, teach each other tricks and skills, and learn from the best. Sometimes we can have a friendly tournament with prizes!',
        type: 'In person',
        private: false,
        city: 'Ziemannshire',
        state: 'California',
        organizerId: 50
      },
      {
        name: 'Fishing Is Both Sport and Recreation',
        about: "WE LOVE FISHING! If you do too, join us! We'll have plenty to talk about and there is plenty fish to catch all around!",
        type: 'In person',
        private: false,
        city: 'Hettingerworth',
        state: 'Montana',
        organizerId: 7
      },
      {
        name: 'Movies Together!',
        about: 'Go out for a movie and make new friends! Always better than going by yourself, join the group!',
        type: 'In person',
        private: false,
        city: 'Nicoside',
        state: 'Kentucky',
        organizerId: 8
      },
      {
        name: 'Baseball Enjoyers',
        about: 'Get together for a game of baseball! The group meets for both serious matches and completely relaxed events. Check out our events for all age and level groups.',
        type: 'In person',
        private: false,
        city: 'New Ayanaton',
        state: 'Alaska',
        organizerId: 12
      },
      {
        name: 'We Workout',
        about: "Get together to get in shape together! Let's help each other stay on track and work out regularly. Work out as a team, no one get left behind!",
        type: 'In person',
        private: false,
        city: 'Lake Rebeccaborough',
        state: 'Idaho',
        organizerId: 15
      },
      {
        name: 'Your Favorite Book Club',
        about: 'The book club for the book lovers.',
        type: 'In person',
        private: false,
        city: 'Port Bereniceborough',
        state: 'Ohio',
        organizerId: 18
      },
      {
        name: 'Workshops For Kids!',
        about: 'Come and bring your kids for an exciting project to build! You might have to help depending on the project or the age of your child, so, parents, be ready to get involved!',
        type: 'In person',
        private: false,
        city: 'Marcofort',
        state: 'Minnesota',
        organizerId: 21
      },
      {
        name: 'Bible Study Group',
        about: 'We study the Bible, pray for each other, and grow in our relationship with Christ together. Join us!',
        type: 'In person',
        private: false,
        city: 'Champlinton',
        state: 'Texas',
        organizerId: 24
      },
      {
        name: 'Swimmers Of All Water',
        about: 'The group that is passionate about swimming and everything related!',
        type: 'In person',
        private: false,
        city: 'Johnnyworth',
        state: 'Alabama',
        organizerId: 27
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options);

  }
};
