// const uuid = require('uuid');
const models = require('../models/index');

// Create Order
exports.createOrder = (req, res) => {
    const number = 'ML' + Date.now()
    function shippingPrice(shipping) {
        switch(shipping) {
            case 'chronopost' :
                return 6.90
            break;
            case 'colissimo' :
                return 4.90
            break;
            case 'ups' :
                return 8.90
            break;
        }
    }
    models.Orders.create({
        userId: req.body.userId,
        number: number,
        shipping: req.body.shipping,
        shippingPrice: shippingPrice(req.body.shipping),
        daFN: req.body.daFN,
        daLN: req.body.daLN,
        daPhone: req.body.daPhone,
        daLine1: req.body.daLine1,
        daLine2: req.body.daLine2,
        daCity: req.body.daCity,
        daPC: req.body.daPC,
        daCountry: req.body.daCountry,
        baFN: req.body.baFN,
        baLN: req.body.baLN,
        baPhone: req.body.baPhone,
        baLine1: req.body.baLine1,
        baLine2: req.body.baLine2,
        baCity: req.body.baCity,
        baPC: req.body.baPC,
        baCountry: req.body.baCountry
    })
    .then((order) => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }))
}

// Add Price
exports.addPriceToOrder = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { id: req.params.id }
    })
    await order.update({
        price: req.body.price
    })
    .then(() => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }));   
}

// Edit Payment
exports.editPayment = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { number: req.params.number }
    })
    await order.update({
        payment: req.body.payment
    })
    .then(() => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }));   
}

// Edit Order
exports.editOrder = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { number: req.params.number }
    })
    await order.update({
        status: req.body.status
    })
    .then(() => res.status(200).json({ message: 'Commande modifiée' }))
    .catch(error => res.status(400).json({ error }));   
}

// Delete Order
exports.deleteOrder = (req, res) => {
    models.Orders.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commande supprimée' }))
        .catch(error => res.status(400).json({ error }));
}

// Get One Order
exports.getOneOrder = (req, res) => {
    models.Orders.findOne({ where: { id: req.params.id }, include: [{model: models.Orderdetails}]})
    .then(order => res.status(200).json(order))
    .catch(error => res.status(404).json({ error }));
};

// Get One Order by Number
exports.getOneOrderByNumber = (req, res) => {
    models.Orders.findOne({ where: { number: req.params.number }, include: [{model: models.Orderdetails}]})
    .then(order => res.status(200).json(order))
    .catch(error => res.status(404).json({ error }));
};

// Get All Orders
exports.getAllOrders = (req, res) => {
    models.Orders.findAll({
        order: [['createdAt', 'DESC']],
        include: [{model: models.Orderdetails}]
    })
        .then((orders) => {res.send(orders)})
        .catch(error => res.status(400).json({ error }));
};