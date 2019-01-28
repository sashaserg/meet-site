'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', [{
        userId: 1,
        url: 'http://localhost:3000/public/img/1547747739971-asd.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          userId: 2,
          url: 'http://localhost:3000/public/img/1547747739971-asd.png',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          userId: 3,
          url: 'http://localhost:3000/public/img/1547747739971-asd.png',
          createdAt: new Date(),
          updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
