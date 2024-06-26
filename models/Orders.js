const Sequelize = require('sequelize');
const db = require('../config/config');

const Orders = db.define('orders', {
    userId: {
        type: Sequelize.INTEGER
    },
    discount: {
        type: Sequelize.STRING
    },
    discountAmount: {
        type: Sequelize.FLOAT
    },
    shippingCode: {
        type: Sequelize.STRING
    },
    relayCode: {
        type: Sequelize.STRING
    },
    shippingType: {
        type: Sequelize.STRING
    },
    shippingLabel: {
        type: Sequelize.STRING
    },
    shipping: {
        type: Sequelize.STRING
    },
    shippingPrice: {
        type: Sequelize.INTEGER
    },
    shippingPriceTTC: {
        type: Sequelize.INTEGER
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
    priceTTC: {
        type: Sequelize.INTEGER
    },
    payment: {
        type: Sequelize.STRING
    },
    length: {
        type: Sequelize.INTEGER
    },
    width: {
        type: Sequelize.INTEGER
    },
    height: {
        type: Sequelize.FLOAT
    },
    weight: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    express: {
        type: Sequelize.STRING
    },
});

module.exports = Orders;