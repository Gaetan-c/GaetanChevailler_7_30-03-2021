'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    fichierJoint: DataTypes.STRING,
  },
    {})
  Post.associate = function (models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Post
}