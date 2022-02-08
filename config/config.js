const { Sequelize } = require('sequelize');

module.exports = new Sequelize('mylaser', 'root', 'Rdwxtdb53', {
    host: 'localhost',
    dialect: 'mysql'
});