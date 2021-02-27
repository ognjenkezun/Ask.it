'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, { foreignKey: 'answerTo', onDelete: 'CASCADE', targetKey: 'id' });
      Answer.belongsTo(models.User, { foreignKey: 'answerUserId', onDelete: 'CASCADE', targetKey: 'id' });
    }
  };
  Answer.init({
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dislike: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};