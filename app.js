const express = require('express');

//Database
const db = require('./config/config');
//Test connexion DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

var cors = require('cors')
const path = require('path');

app.use(express.json());
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/mylaser/dxf', require('./routes/dxf'));

module.exports = app;