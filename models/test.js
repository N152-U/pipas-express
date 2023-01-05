'use strict';
const { DataTypes } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize) => {
  class test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  test.init({
    id:{
     type:  DataTypes.INTEGER,
     allowNull: false,
     autoIncrement: true,
      primaryKey: true
    },
    name:{ 
     type: DataTypes.STRING,
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'test',
    tableName: 'tests'
  });
  return test;
};