'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Answers', 'answerUserId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'answerUserId'
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Answers', 'answerUserId');
  }
};