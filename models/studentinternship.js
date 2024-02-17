'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentInternship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getId(studentId){
      
    }

  }
  StudentInternship.init({
    StudentId: DataTypes.INTEGER,
    InternshipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentInternship',
  });
  return StudentInternship;
};