const Sequelize = require('sequelize');
const db = require('../config/config');

const Carts = db.define('carts', {
    price: {
        type: Sequelize.INTEGER
    },
    length: {
        type: Sequelize.FLOAT
    },
    width: {
        type: Sequelize.FLOAT
    },
    height: {
        type: Sequelize.FLOAT
    },
    weight: {
        type: Sequelize.FLOAT
    },
    operatorCode: {
        type: Sequelize.STRING
    },
    operatorService: {
        type: Sequelize.STRING
    },
    operatorPriceHT: {
        type: Sequelize.INTEGER
    },
    operatorPriceTTC: {
        type: Sequelize.INTEGER
    },
});

module.exports = Carts;