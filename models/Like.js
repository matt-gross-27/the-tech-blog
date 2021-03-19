const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
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
    modelName: 'like'
  });

module.exports = Like