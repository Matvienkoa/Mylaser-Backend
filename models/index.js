const Quotes = require('./Quotes');
const User = require('./User');
const BillingAdresses = require('./BillingAdresses');
const DeliveryAdresses = require('./DeliveryAdresses');
const Orders = require('./Orders');
const Orderdetails = require('./Orderdetails');

User.hasMany(BillingAdresses);
User.hasMany(DeliveryAdresses);
User.hasMany(Orders);
Orders.hasMany(Orderdetails);
BillingAdresses.belongsTo(User);
DeliveryAdresses.belongsTo(User);
Orders.belongsTo(User);
Orderdetails.belongsTo(Orders);

module.exports = {
    Quotes,
    User,
    BillingAdresses,
    DeliveryAdresses,
    Orders,
    Orderdetails
};