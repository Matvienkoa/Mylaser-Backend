const Sequelize = require('sequelize');
const db = require('../config/config');

const BillingAdresses = db.define('billingAdresses', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    line1: {
        type: Sequelize.STRING
    },
    line2: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.INTEGER
    },
    country: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

module.exports = BillingAdresses;