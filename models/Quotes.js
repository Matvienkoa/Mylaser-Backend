const Sequelize = require('sequelize');
const db = require('../config/config');

const Quotes = db.define('quotes', {
    length: {
        type: Sequelize.FLOAT
    },
    coef: {
        type: Sequelize.FLOAT
    },
    surface: {
        type: Sequelize.FLOAT
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
        type: Sequelize.STRING
    },
    width: {
        type: Sequelize.FLOAT
    },
    height: {
        type: Sequelize.FLOAT
    }
});

module.exports = Quotes;