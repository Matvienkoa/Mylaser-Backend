const models = require('../models/index');

// Create Orderdetails
exports.createOrderdetails = (req, res) => {
    models.Orderdetails.create({
        orderId: req.body.orderId,
        quote: req.body.quote,
        price: req.body.price
    })
    .then((orderdetails) => res.status(201).json(orderdetails))
    .catch(error => res.status(400).json({ error }))
}

// Edit Orderdetails
exports.editOrderdetails = async (req, res) => {
    const orderdetails = await models.Orderdetails.findOne({
        where: { id: req.params.id }
    })
    await orderdetails.update({
        orderId: req.body.orderId,
        quote: req.body.quote
    })
    .then(() => res.status(200).json({ message: 'Détails de la Commande modifiés' }))
    .catch(error => res.status(400).json({ error }));   
}

// Delete Orderdetails
exports.deleteOrderdetails = (req, res) => {
    models.Orderdetails.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Détails de la Commande supprimés' }))
        .catch(error => res.status(400).json({ error }));
}

// Get One Orderdetails
exports.getOneOrderdetails = (req, res) => {
    models.Orderdetails.findOne({ where: { id: req.params.id }})
    .then(orderdetails => res.status(200).json(orderdetails))
    .catch(error => res.status(404).json({ error }));
};

// Get All Orderdetails
exports.getAllOrderdetails = (req, res) => {
    models.Orderdetails.findAll({
        order: [['createdAt', 'ASC']]
    })
        .then((orderdetails) => {res.send(orderdetails)})
        .catch(error => res.status(400).json({ error }));
};

