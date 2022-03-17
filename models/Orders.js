const Sequelize = require('sequelize');
const db = require('../config/config');

const Orders = db.define('orders', {
    userId: {
        type: Sequelize.INTEGER
    },
    shipping: {
        type: Sequelize.STRING
    },
    shippingPrice: {
        type: Sequelize.FLOAT
    },
    number: {
        type: Sequelize.STRING
    },
    daFN: {
        type: Sequelize.STRING
    },
    daLN: {
        type: Sequelize.STRING
    },
    daPhone: {
        type: Sequelize.STRING
    },
    daLine1: {
        type: Sequelize.STRING
    },
    daLine2: {
        type: Sequelize.STRING
    },
    daCity: {
        type: Sequelize.STRING
    },
    daPC: {
        type: Sequelize.INTEGER
    },
    daCountry: {
        type: Sequelize.STRING
    },
    baFN: {
        type: Sequelize.STRING
    },
    baLN: {
        type: Sequelize.STRING
    },
    baPhone: {
        type: Sequelize.STRING
    },
    baLine1: {
        type: Sequelize.STRING
    },
    baLine2: {
        type: Sequelize.STRING
    },
    baCity: {
        type: Sequelize.STRING
    },
    baPC: {
        type: Sequelize.INTEGER
    },
    baCountry: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    payment: {
        type: Sequelize.STRING
    }
});

module.exports = Orders;