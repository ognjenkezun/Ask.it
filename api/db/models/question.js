'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', targetKey: 'id' });
      Question.hasMany(models.Answer, { foreignKey: 'answerTo', onDelete: 'CASCADE', sourceKey: 'id' })
    }
  };
  Question.init({
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dislike: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};