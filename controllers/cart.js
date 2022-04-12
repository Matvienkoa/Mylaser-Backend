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

// Edit Cart
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