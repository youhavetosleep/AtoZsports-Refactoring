'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ground', [{
      sports: 'futsal',
      placeName: 'OK풋살클럽',
      addressName: '경기 용인시 기흥구 지곡동 348-6',
      roadAddressName: '경기 용인시 기흥구 지삼로114번길 14',
      phone: '010-2028-6692',
      longitude: '37.2463255045159',
      latitude: '127.129439999296',
      placeUrl: 'http://place.map.kakao.com/2018627764',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ground', null, {});
  }
};
