const models = require('../models/index');

// Create Cart
exports.createCart = (req, res) => {
    models.Carts.create({
        price: req.body.price,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight
    })
    .then((order) => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }))
}

// Edit Cart => Add Quote
exports.editCart = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const price = req.body.price + cart.price
    function length() {
        if(req.body.length > cart.length) {
            return req.body.length
        } else {
            return cart.length
        }
    }
    function width() {
        if(req.body.width > cart.width) {
            return req.body.width
        } else {
            return cart.width
        }
    }
    const height = ((req.body.thickness/10)*req.body.quantity) + cart.height
    const weight = req.body.weight + cart.weight

    await cart.update({
        price: price ,
        length: length(),
        width: width(),
        height: height,
        weight: weight
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => Remove Quote
exports.removeQuoteFromCart = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const length = req.body.length;
    const price = req.body.price;
    const weight = req.body.weight;
    const height = req.body.height;
    const width = req.body.width;

    await cart.update({
        price: price ,
        weight: weight,
        height: height,
        width: width,
        length: length
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => Add Shipping Infos
exports.addShippingInfos = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const operatorCode = req.body.operatorCode;
    const operatorService = req.body.operatorService;
    const operatorLabel = req.body.operatorLabel;
    const shippingType = req.body.shippingType;
    const operatorPriceHT = Math.ceil(parseFloat(req.body.operatorPriceHT)*100);
    const operatorPriceTTC = Math.ceil(parseFloat(req.body.operatorPriceTTC)*100);
    const relayCode = null;

    // if (operatorPriceHT === 0 || operatorPriceTTC === 0) {
    //     return res.status(500).json({ message: "Une erreur est survenue, le montant ne peut pas être égal à 0"});
    // }

    await cart.update({
        operatorCode: operatorCode,
        operatorService: operatorService,
        operatorPriceHT: operatorPriceHT,
        operatorPriceTTC: operatorPriceTTC,
        operatorLabel: operatorLabel,
        shippingType: shippingType,
        relayCode: relayCode
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => Add Relay Infos
exports.addRelayInfos = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const relayCode = req.body.relayCode;

    await cart.update({
        relayCode: relayCode
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => Add Express
exports.addExpress = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const express = req.body.express;

    await cart.update({
        express: express,
        price: cart.price + 1658
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => Remove Express
exports.removeExpress = async (req, res) => {
    const cart = await models.Carts.findOne({
        where: { id: req.params.id}
    })

    const express = req.body.express;

    await cart.update({
        express: express,
        price: cart.price - 1658
    })
    .then((cart) => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
}

// Edit Cart => add discount
// exports.addDiscount = async (req, res) => {
//     const cart = await models.Carts.findOne({
//         where: { id: req.params.id}
//     })
//     const discount = req.body.discountAmount/100;
//     const price = calculPrice();
//     function calculPrice() {
//         let price;
//         if (cart.express === 'yes') {
//             price = ((cart.price-990)*(1-discount))+990;
//             return price;
//         }
//         if (cart.express === 'no') {
//             price = cart.price*(1-discount);
//             return price;
//         }
//     }
//     await cart.update({
//         price: price
//     })
//     .then((cart) => res.status(200).json(cart))
//     .catch(error => res.status(404).json({ error }));
// }

// Delete Cart
exports.deleteCart = (req, res) => {
    models.Carts.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Panier supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Cart
exports.getOneCart = (req, res) => {
    models.Carts.findOne({
        where: { id: req.params.id },
        include: {model: models.Quotes}
    })
    .then(cart => res.status(200).json(cart))
    .catch(error => res.status(404).json({ error }));
};

// Get All Carts
exports.getAllCarts = (req, res) => {
    models.Carts.findAll({
        order: [['createdAt', 'ASC']],
        include: {model: models.Quotes}
    })
        .then((carts) => {res.send(carts)})
        .catch(error => res.status(400).json({ error }));
};