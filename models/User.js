const Sequelize = require('sequelize');
const db = require('../config/config');

const User = db.define('users', {
    email: {
        type: Sequelize.STRING,
        unique: 'email'
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    discount: {
        type: Sequelize.STRING
    },
    discountAmount: {
        type: Sequelize.FLOAT
    },
});

module.exports = User;