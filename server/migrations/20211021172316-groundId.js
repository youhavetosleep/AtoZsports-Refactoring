'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // groundId가 필요한 테이블에 field 추가
    await queryInterface.addColumn('Post', 'groundId', Sequelize.INTEGER)
    await queryInterface.addColumn(
      'GroundReview',
      'groundId',
      Sequelize.INTEGER
    )

    // foreign key 연결
    await queryInterface.addConstraint('Post', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Post_groundId',
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
      name: 'FK_GroundReview_groundId',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Post', 'FK_Post_groundId')
    await queryInterface.removeColumn('Post', 'groundId')
    await queryInterface.removeConstraint(
      'GroundReview',
      'FK_GroundReview_groundId'
    )
    await queryInterface.removeColumn('GroundReview', 'groundId')
  }
}
