const Sequelize = require('sequelize');
const db = require('../config/config');

const Orderdetails = db.define('orderdetails', {
    orderId: {
        type: Sequelize.INTEGER
    },
    quote: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.FLOAT
    },
});

module.exports = Orderdetails;