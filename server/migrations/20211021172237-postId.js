'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // postId가 필요한 테이블에 field 추가
    await queryInterface.addColumn('Chat', 'roomName', Sequelize.INTEGER)
    await queryInterface.addColumn('FavoritePost', 'postId', Sequelize.INTEGER)

    // foreign key 연결
    await queryInterface.addConstraint('Chat', {
      fields: ['roomName'],
      type: 'foreign key',
      name: 'FK_Chat_roomName',
      references: {
        table: 'Post',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('FavoritePost', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'FK_FavoritePost_postId',
      references: {
        table: 'Post',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Chat', 'FK_Chat_roomName')
    await queryInterface.removeColumn('Chat', 'roomName')
    await queryInterface.removeConstraint('FavoritePost', 'FK_FavoritePost_postId')
    await queryInterface.removeColumn('FavoritePost', 'postId')
  }
};
