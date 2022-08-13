//const Sequelize = require("sequelize").Sequelize;
//const Sequelize = require("sequelize/index");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('node-complete','root','MaxNode09',{
    dialect: 'mysql', 
    host: 'localhost'
});


module.exports = sequelize;