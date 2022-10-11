const express = require('express');
const path = require('path');
const cors = require('cors');
//Sécurity
const helmet = require('helmet');
const hpp = require("hpp");
const rateLimit = require("./middleware/limiter");

//Database
const db = require('./config/config');
//Test connexion DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.use(cors({
    // origin: "https://dt-mylaser.com"
    origin: "http://localhost:5501"
}));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use("/api/mylaser/auth", rateLimit.authLimiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/mylaser/auth', require('./routes/auth'));
app.use('/api/mylaser/dxf', require('./routes/dxf'));
app.use('/api/mylaser/cart', require('./routes/carts'));
app.use('/api/mylaser/billingadress', require('./routes/billingadresses'));
app.use('/api/mylaser/deliveryadress', require('./routes/deliveryadresses'));
app.use('/api/mylaser/user', require('./routes/users'));
app.use('/api/mylaser/order', require('./routes/orders'));
app.use('/api/mylaser/orderdetails', require('./routes/orderdetails'));
app.use('/api/mylaser/mail', require('./routes/mails'));
app.use('/api/mylaser/payment', require('./routes/payments'));
app.use('/api/mylaser/boxtal', require('./routes/boxtal'));

module.exports = app;