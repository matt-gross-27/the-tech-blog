const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flag extends Model {}

Flag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      } 
    }
  },
  {
    sequelize,
    modelName: 'flag',
    timestamps: false
  });

module.exports = Flag