const models = require('../models/index');
const fs = require('fs');
const axios = require('axios');

// API Vector express
exports.convertDxf = async(req,res) => {
    const file = fs.readFileSync('uploads/' + req.file.filename, {encoding: 'utf-8'});
    let image= await axios.post('https://vector.express/api/v2/public/convert/dxf/cad2svg/svg?cad2svg-unit=mm', file)
    let text = await axios.get(image.data.resultUrl, { responseType: "text" })
    res.send([text.data, `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`]);
}

// New Quote in DB
exports.createQuote = (req, res) => {
    const width = req.body.width;
    const height = req.body.height;
    const surface = req.body.surface;
    const length = req.body.length;
    const dxf = req.body.dxf;
    const svg = req.body.svg;
    const steel = req.body.steel;
    const thickness = req.body.thickness;
    const quantity = req.body.quantity;
    const weight = calculWeight();
    function calculWeight() {
        return ((surface/100)*(thickness/10)*req.body.density)*quantity
    }
    const speed = req.body.speed;
    const pricePerKilosQuote = ((130*weight/quantity)/1000)*quantity;
    const speedTimeQuote = ((60*length)/speed)*quantity;
    const priceSpeedTimeQuote = (6500*speedTimeQuote)/3600;
    const timeInit = 542*quantity;
    const price = Math.ceil(pricePerKilosQuote + priceSpeedTimeQuote + timeInit);

    models.Quotes.create({
        length: length,
        surface: surface,
        dxf: dxf,
        svg: svg,
        steel: steel,
        thickness: thickness,
        quantity: quantity,
        width: width,
        height: height,
        price: price,
        weight: weight
    })
    .then((quote) => res.status(201).json(quote))
    .catch(error => res.status(400).json({ error }));
}

// Edit Quote
exports.editQuote = async (req, res) => {
    const quote = await models.Quotes.findOne({
        where: { id: req.params.id}
    })
    const steel = req.body.steel;
    const thickness = req.body.thickness;
    const quantity = req.body.quantity;
    const weight = calculWeight();
    function calculWeight() {
        return ((quote.surface/100)*(thickness/10)*req.body.density)*quantity
    }
    const speed = req.body.speed;
    const pricePerKilosQuote = ((130*weight/quantity)/1000)*quantity;
    const speedTimeQuote = ((60*quote.length)/speed)*quantity;
    const priceSpeedTimeQuote = (6500*speedTimeQuote)/3600;
    const timeInit = 542*quantity;
    const price = Math.ceil(pricePerKilosQuote + priceSpeedTimeQuote + timeInit);
    
    await quote.update({
        steel: steel,
        thickness: thickness,
        quantity: quantity,
        price: price,
        weight: weight
    })
    .then((quote) => res.status(200).json(quote))
    .catch(error => res.status(404).json({ error }));
}

// Link Quote to Cart with FK
exports.linkQuoteToCart = async (req, res) => {
    const quote = await models.Quotes.findOne({
        where: { id: req.params.id}
    })
    const cartId = req.body.cartId
    await quote.update({
        cartId: cartId
    })
    .then((quote) => res.status(200).json(quote))
    .catch(error => res.status(404).json({ error }));
}

// Current Quote
exports.getCurrentQuote = (req, res) => {
    models.Quotes.findOne({ where: { id: req.params.id }})
    .then((currentQuote) => res.status(200).json(currentQuote))
}

// Delete Quote
exports.deleteQuote = (req,res) => {
    models.Quotes.findOne({ where: { id: req.params.id }})
    .then(quote => {
        if(quote) {
            let filename = quote.dxf.split('/uploads/')[1];
            if (filename !== undefined) {
                fs.unlink(`uploads/${filename}`,
                    function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('fichier supprimé');
                        }
                    },
                )
            }
        }
    })
    models.Quotes.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Devis supprimé' }))
    .catch(error => res.status(400).json({ error }));
}

// Delete file in server
exports.deleteFile = (req, res) => {
    const filename = req.body.filename.split('/uploads/')[1];
    if (filename !== undefined) {
        fs.unlink(`uploads/${filename}`,
            function (err) {
                if (err) {
                    console.log('error');
                } else {
                    console.log('fichier supprimé');
                };
            }
        )
        res.status(200).json({ message: 'Dxf supprimé' });
    };
};
