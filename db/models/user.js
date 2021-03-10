'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true
    },
    hashPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    bio: {
      type: DataTypes.TEXT
    },
  }, {});

  const gameShelfMapping = {
    through: 'GameShelf', // This is the model name referencing the join table.
    otherKey: 'gameId',
    foreignKey: 'userId'
  }

  const reviewMapping = {
    through: 'Review',
    otherKey: 'gameId',
    foreignKey: 'userId'
  }

  const ratingMapping = {
    through: 'Rating',
    otherKey: 'gameId',
    foreignKey: 'userId'
  }

  User.associate = function(models) {
    // User.hasMany(models.GameShelf, { foreignKey: 'userId' });
    // User.hasMany(models.Review, { foreignKey: 'userId' });
    // User.hasMany(models.Rating, { foreignKey: 'userId' });
    User.belongsToMany(models.Game, gameShelfMapping);
    User.belongsToMany(models.Game, reviewMapping);
    User.belongsToMany(models.Game, ratingMapping);
  };

  return User;
};
