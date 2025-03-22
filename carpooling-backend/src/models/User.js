const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID, // OR DataTypes.INTEGER for auto-increment
    defaultValue: DataTypes.UUIDV4, // Or auto-increment if using INTEGER
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING
  },
  profilePhoto: {
    type: DataTypes.STRING
  }
});


module.exports = User;
