const Sequelize = require('sequelize');
const db = require('../config/config');

const Quotes = db.define('quotes', {
    length: {
        type: Sequelize.INTEGER
    },
    surface: {
        type: Sequelize.INTEGER
    },
    dxf: {
        type: Sequelize.STRING
    },
    svg: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    steel: {
        type: Sequelize.STRING
    },
    thickness: {
        type: Sequelize.FLOAT
    },
    width: {
        type: Sequelize.INTEGER
    },
    height: {
        type: Sequelize.INTEGER
    },
    cartId: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    }
});

module.exports = Quotes;