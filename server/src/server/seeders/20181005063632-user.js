'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Justin',
        lastName: 'Bieber',
        email: 'justin@gmail.com',
        gender: 'man',
        purpose: 'friendship',
        birthDate: new Date(1997,  0, 1),
        profilePicture: 'http://localhost:3000/public/img/face_man1.jpg',
        password: bcrypt.hashSync('1qaz2w3e4r', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
          firstName: 'Alex',
          lastName: 'Sergeev',
          email: 'Alex@gmail.com',
          gender: 'man',
          purpose: 'friendship',
          profilePicture: 'http://localhost:3000/public/img/face_man2.jpeg',
          birthDate: new Date(1997,  11, 16),
          password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(8)),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Lili',
          lastName: 'Johnson',
          email: 'Lili@gmail.com',
          gender: 'woman',
          purpose: 'relationship',
          birthDate: new Date(1995,  5, 21),
          password: bcrypt.hashSync('12345s6789', bcrypt.genSaltSync(8)),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
