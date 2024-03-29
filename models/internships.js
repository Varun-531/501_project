'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Internships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static getData(id){

    }
  }
  Internships.init({
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    Location: DataTypes.STRING,
    Start_Date: DataTypes.DATEONLY,
    End_Date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Internships',
  });
  return Internships;
};