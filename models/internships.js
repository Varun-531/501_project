// models/internships.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('project-student-database', 'postgres', 'changeme', {
  host: 'localhost',
  dialect: 'postgres',
});

const Internships = sequelize.define('Internships', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { Internships };
