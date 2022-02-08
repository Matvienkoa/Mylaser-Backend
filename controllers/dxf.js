const models = require('../models/index');
const fs = require('fs');
const vectorExpress = require("../node_modules/@smidyo/vectorexpress-nodejs/index");
const axios = require('axios');

// exports.convertDxf = (req,res) => {
//     const file = fs.readFileSync('uploads/' + req.file.filename, {encoding: 'utf-8'});
//     vectorExpress.convert("dxf", "svg", {
//     file,
//     save: true,
//     path: 'output/' + req.file.filename + '.svg'
//   })
//   .then(() => {
//     const svg = fs.readFileSync('output/' + req.file.filename + '.svg', {encoding: 'utf-8'});
//     res.send(svg)
//   })
// }

exports.convertDxf = async(req,res) => {
    const file = fs.readFileSync('uploads/' + req.file.filename, {encoding: 'utf-8'});
    let image= await axios.post('https://vector.express/api/v2/public/convert/dxf/cad2svg/svg?cad2svg-unit=mm', file)
    let text = await axios.get(image.data.resultUrl, { responseType: "text" })
    res.send(text.data);
}

exports.createQuote = (req, res) => {
    models.Quotes.create({
        length: req.body.length,
        coef: req.body.coef,
        surface: req.body.surface,
        dxf: req.body.dxf
    })
    .then(() => res.status(201).json(req.body))
    .catch(error => res.status(400).json({ error }));
}

exports.getPrice = (req, res) => {
    const totalLength = req.body.longueur;
    const coef = req.body.coefficient;
    const surface = req.body.surface;
    let price = surface*coef + totalLength/10*2
    return res.status(201).json(price)
}
