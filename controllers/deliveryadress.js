const models = require('../models/index');

// Create Deliveryadress
exports.createDeliveryadress = (req, res) => {
    // Empty Inputs
    if (req.body.firstName === "" || req.body.lastName === "" || req.body.line1 === "" || req.body.city === "" || req.body.postalCode === "" || req.body.country === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    if (!Number.isInteger(Number.parseInt(req.body.postalCode))) {
        return res.status(400).json({ message: "Merci de renseigner un bon format de code postal (chiffres)"});
    }
    models.DeliveryAdresses.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        userId: req.body.userId
    })
    .then((deliveryAdress) => res.status(201).json(deliveryAdress))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Deliveryadress
exports.editDeliveryadress = async (req, res) => {   
    // Empty Inputs
    if (req.body.firstName === "" || req.body.lastName === "" || req.body.line1 === "" || req.body.city === "" || req.body.postalCode === "" || req.body.country === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    if (!Number.isInteger(Number.parseInt(req.body.postalCode))) {
        return res.status(400).json({ message: "Merci de renseigner un bon format de code postal (chiffres)"});
    }
    const Deliveryadress = await models.DeliveryAdresses.findOne({
        where: { id: req.params.id }
    })
    await Deliveryadress.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        userId: req.body.userId
    })
    .then(() => res.status(200).json({ message: 'Adresse de facturation modifiée' }))
    .catch(error => res.status(400).json({ error }));       
};

// Delete Deliveryadress
exports.deleteDeliveryadress = (req, res) => {
    models.DeliveryAdresses.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Adresse de facturation supprimée' }))
        .catch(error => res.status(400).json({ error }));
};

// Get One Deliveryadress
exports.getOneDeliveryadress = (req, res) => {
    models.DeliveryAdresses.findOne({
        where: { id: req.params.id }})
    .then(Deliveryadress => res.status(200).json(Deliveryadress))
    .catch(error => res.status(404).json({ error }));
};

// Get All Deliveryadress
exports.getAllDeliveryadress = (req, res) => {
    models.DeliveryAdresses.findAll({
        order: [['createdAt', 'ASC']],
    })
        .then((deliveryadresses) => {res.send(deliveryadresses)})
        .catch(error => res.status(400).json({ error }));
};