const models = require('../models/index');

// Create Order
exports.createOrder = (req, res) => {
    const number = 'ML' + Date.now()
    models.Orders.create({
        userId: req.body.userId,
        email: req.body.email,
        discount: req.body.discount,
        discountAmount: req.body.discountAmount,
        number: number,
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
    const price = calculPrice();
    function calculPrice() {
        let price;
        if(order.discount === 'yes') {
            price = req.body.price*(1-(order.discountAmount/100))
            return price
        } else {
            price = req.body.price
            return price
        }
    }
    await order.update({
        price: price + req.body.operatorPriceHT,
        priceTTC: Math.ceil((price*1.2) + req.body.operatorPriceTTC),
        shipping: req.body.operatorService,
        shippingType: req.body.shippingType,
        shippingCode: req.body.operatorCode,
        shippingLabel: req.body.operatorLabel,
        relayCode: req.body.relayCode,
        shippingPrice: req.body.operatorPriceHT,
        shippingPriceTTC: req.body.operatorPriceTTC,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight,
        express: req.body.express
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