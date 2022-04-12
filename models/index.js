const Quotes = require('./Quotes');
const User = require('./User');
const BillingAdresses = require('./BillingAdresses');
const DeliveryAdresses = require('./DeliveryAdresses');
const Orders = require('./Orders');
const Orderdetails = require('./Orderdetails');
const Carts = require('./Carts');

User.hasMany(BillingAdresses);
User.hasMany(DeliveryAdresses);
User.hasMany(Orders);
Orders.hasMany(Orderdetails);
Carts.hasMany(Quotes);
BillingAdresses.belongsTo(User);
DeliveryAdresses.belongsTo(User);
Orders.belongsTo(User);
Orderdetails.belongsTo(Orders);
Quotes.belongsTo(Carts);

module.exports = {
    Quotes,
    User,
    BillingAdresses,
    DeliveryAdresses,
    Orders,
    Orderdetails,
    Carts
};