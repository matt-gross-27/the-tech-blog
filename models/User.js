const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPW) {
    bcrypt.compare(loginPW, this.password)
      .then(result => result)
      .catch((err) =>  { throw err });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
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
    underscored: true,
    freezeTableName: true,
    modelName: 'user'
  }
)

module.exports = User