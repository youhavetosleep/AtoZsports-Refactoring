'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Post', [{
      title: '골잡이 선수 1명 구합니다!',
      division: 'match',
      content: '골 냄새를 잘 맡는 최전방 공격수 1명을 모집합니다!!!',
      startTime: '2021-11-13 13:00',
      endTime: '2021-11-13 14:00',
      status: '모집중',
      userId: 1,
      groundId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Post', null, {});
  }
};
