'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Answers', 'userId');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Answers', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    });
  }
};