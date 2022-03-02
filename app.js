const express = require('express');
const path = require('path');
const cors = require('cors');

//Database
const db = require('./config/config');
//Test connexion DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/mylaser/auth', require('./routes/auth'));
app.use('/api/mylaser/dxf', require('./routes/dxf'));
app.use('/api/mylaser/billingadress', require('./routes/billingadresses'));
app.use('/api/mylaser/deliveryadress', require('./routes/deliveryadresses'));
app.use('/api/mylaser/user', require('./routes/users'));
app.use('/api/mylaser/order', require('./routes/orders'));
app.use('/api/mylaser/orderdetails', require('./routes/orderdetails'));

module.exports = app;