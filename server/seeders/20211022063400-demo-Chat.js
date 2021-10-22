'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chat', [{
      roomName: 1,
      userId: 1,
      comment: '풋살 경기는 몇 번 정도 뛰어보셨나요?',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chat', null, {});
  }
};
