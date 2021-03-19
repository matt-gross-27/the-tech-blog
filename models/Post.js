const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  // Add Like and Flag functions
  // static like(body, models){}
  // static flag(body, models){}
}

Post.init(
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
    blog_text: {
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
    }
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'post'
  });

module.exports = Post