'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroundReview', [{
      comment: 'OK풋살클럽 잔디상태 양호라고 알림.',
      score: 5,
      userId: 1,
      groundId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GroundReview', null, {});
  }
};
