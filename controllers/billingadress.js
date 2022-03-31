const models = require('../models/index');

// Create Billingadress
exports.createBillingadress = (req, res) => {
    // Empty Inputs
    if (req.body.firstName === "" || req.body.lastName === "" || req.body.line1 === "" || req.body.city === "" || req.body.postalCode === "" || req.body.country === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // PC is not number
    if (!Number.isInteger(Number.parseInt(req.body.postalCode))) {
        return res.status(400).json({ message: "Merci de renseigner un bon format de code postal (chiffres)"});
    }
    models.BillingAdresses.create({
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
    .then((billingAdress) => res.status(201).json(billingAdress))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Billingadress
exports.editBillingadress = async (req, res) => {   
    // Empty Inputs
    if (req.body.firstName === "" || req.body.lastName === "" || req.body.line1 === "" || req.body.city === "" || req.body.postalCode === "" || req.body.country === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // PC is not number
    if (!Number.isInteger(Number.parseInt(req.body.postalCode))) {
        return res.status(400).json({ message: "Merci de renseigner un bon format de code postal (chiffres)"});
    }
    const Billingadress = await models.BillingAdresses.findOne({
        where: { id: req.params.id }
    })
    await Billingadress.update({
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

// Delete Billingadress
exports.deleteBillingadress = (req, res) => {
    models.BillingAdresses.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Adresse de facturation supprimée' }))
        .catch(error => res.status(400).json({ error }));
};

// Get One Bilingadress
exports.getOneBillingadress = (req, res) => {
    models.BillingAdresses.findOne({
        where: { id: req.params.id }})
    .then(billingadress => res.status(200).json(billingadress))
    .catch(error => res.status(404).json({ error }));
};

// Get All Billingadress
exports.getAllBillingadress = (req, res) => {
    models.BillingAdresses.findAll({
        order: [['createdAt', 'ASC']],
    })
        .then((billingadresses) => {res.send(billingadresses)})
        .catch(error => res.status(400).json({ error }));
};