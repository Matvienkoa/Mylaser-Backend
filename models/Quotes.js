const Sequelize = require('sequelize');
const db = require('../config/config');

const Quotes = db.define('quotes', {
    length: {
        type: Sequelize.DECIMAL
    },
    coef: {
        type: Sequelize.DECIMAL
    },
    surface: {
        type: Sequelize.DECIMAL
    },
    dxf: {
        type: Sequelize.STRING
    }
});

module.exports = Quotes;