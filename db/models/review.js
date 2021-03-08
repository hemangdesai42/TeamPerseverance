'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    gameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Games' }
    },
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId'})
    Review.belongsTo(models.Game, { foreignKey: 'gameId'})
  };
  return Review;
};