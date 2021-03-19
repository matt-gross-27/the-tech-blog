const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flag extends Model {}

Flag.init(
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

module.exports = Flag