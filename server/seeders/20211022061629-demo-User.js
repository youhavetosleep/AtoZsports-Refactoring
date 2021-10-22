'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      email: 'wsad@gmail.com',
      nickName: 'WSAD',
      password: '1234',
      phone: '010-1234-5678',
      homeGround: '서울시 광진구',
      favoriteSports: '축구',
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
