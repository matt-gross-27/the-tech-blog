const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        freezeTableName: true,
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        freezeTableName: true,
        model: 'post',
        key: 'id'
      } 
    }
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'comment'
  });

module.exports = Comment