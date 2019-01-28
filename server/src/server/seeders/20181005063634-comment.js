'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
      userId: 3,
      photoId: 1,
      text: 'so cool. nice pic',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      photoId: 2,
      text: 'great picture!',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
