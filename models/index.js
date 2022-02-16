const Quotes = require('./Quotes');
const User = require('./User');
const BillingAdresses = require('./BillingAdresses');
const DeliveryAdresses = require('./DeliveryAdresses');

User.hasMany(BillingAdresses);
User.hasMany(DeliveryAdresses);
BillingAdresses.belongsTo(User);
DeliveryAdresses.belongsTo(User);

module.exports = {
    Quotes,
    User,
    BillingAdresses,
    DeliveryAdresses
};