const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  },
  {
    hooks: {
      // hash password before create and update
      async beforeCreate(userData) {
        userData.password = await bcrypt.hash(userData.password, 11);
      },
      async beforeUpdate(userData) {
        userData.password = await bcrypt.hash(userData.password, 11);
      }
    },
    sequelize,
    modelName: 'user'
  }
)

module.exports = User