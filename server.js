const express = require('express')
const app = express()
const port = 3000

var cors = require('cors')
const path = require('path');
var axios = require('axios');
const multer = require('./middleware/multer-config');
var fs = require('fs');
const FormData = require('form-data');
// const upload = multer({ dest: 'uploads/'});
const vectorExpress = require("./node_modules/@smidyo/vectorexpress-nodejs/index");

app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/convert', multer.single('dxf'),(req, res) => {
  const file = fs.readFileSync(__dirname + '/uploads/' + req.file.filename, {encoding: 'utf-8'});
  vectorExpress.convert("dxf", "svg", {
    file,
    save: true,
    path: __dirname + '/output/test2.svg'
  })
  .then(() => {
    const svg = fs.readFileSync(__dirname + '/output/test2.svg', {encoding: 'utf-8'});
    res.send(svg)
  })
})

app.get('/read', (req, res) => {
  const svg = fs.readFileSync(__dirname + '/output/test2.svg', {encoding: 'utf-8'});
  res.send(svg)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})