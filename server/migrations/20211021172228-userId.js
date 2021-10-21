'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // userId가 필요한 테이블에 field 추가
    await queryInterface.addColumn('Chat', 'userId', Sequelize.INTEGER)
    await queryInterface.addColumn('FavoritePost', 'userId', Sequelize.INTEGER)
    await queryInterface.addColumn('GroundReview', 'userId', Sequelize.INTEGER)
    await queryInterface.addColumn('Post', 'userId', Sequelize.INTEGER)

    // foreign key 연결
    await queryInterface.addConstraint('Chat', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Chat_userId',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('FavoritePost', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_FavoritePost_userId',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('GroundReview', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_GroundReview_userId',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('Post', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Post_userId',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Chat', 'FK_Chat_userId')
    await queryInterface.removeColumn('Chat', 'userId')
    await queryInterface.removeConstraint('FavoritePost', 'FK_FavoritePost_userId')
    await queryInterface.removeColumn('FavoritePost', 'userId')
    await queryInterface.removeConstraint('GroundReview', 'FK_GroundReview_userId')
    await queryInterface.removeColumn('GroundReview', 'userId')
    await queryInterface.removeConstraint('Post', 'FK_Post_userId')
    await queryInterface.removeColumn('Post', 'userId')
  }
}
