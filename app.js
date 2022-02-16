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

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/mylaser/auth', require('./routes/auth'));
app.use('/api/mylaser/dxf', require('./routes/dxf'));
app.use('/api/mylaser/billingadress', require('./routes/billingadresses'));
app.use('/api/mylaser/deliveryadress', require('./routes/deliveryadresses'));
app.use('/api/mylaser/user', require('./routes/users'));

module.exports = app;