'use strict';
const { Model } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('project-student-database', 'postgres', 'changeme', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Hash the password before creating the user
User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

// Validate password
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = { User };
