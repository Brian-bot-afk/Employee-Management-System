// database.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define Employee model
const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employeePost: {
    type: DataTypes.STRING
  },
  employeeSalary: {
    type: DataTypes.INTEGER
  }
});

// Sync the model with the database
sequelize.sync();

module.exports = { sequelize, Employee };