// models/studentinternships.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StudentInternships = sequelize.define('StudentInternships', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    StudentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    InternshipId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Internships',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return StudentInternships;
};
