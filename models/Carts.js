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
    }
});

module.exports = Carts;