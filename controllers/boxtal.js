const superagent = require('superagent');
const convert = require('xml-js');
const moment = require('moment');

// GET CONTENTS
exports.getContents = (req, res) => {
    superagent.get('https://test.envoimoinscher.com/api/v1/contents')
    .set('access_key', process.env.ACCESS_KEY)
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
    .then((response) => {
        const contentsXML = response.body
        const contentsJSON = convert.xml2json(contentsXML, {compact: true})
        res.send(contentsJSON)
    })
}

// GET TOKEN MAP
exports.getToken = (req, res) => {
    superagent.post('https://maps.boxtal.com/api/v2/maps-token')
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH_V2)
    .then((response) => {
        res.send(response.body)
    })
}

// API BOXTAL GET COTATIONS
exports.getShipments = (req, res) => {
    const poids = req.body.quotes.poids;
    const longueur = req.body.quotes.longueur;
    const largeur = req.body.quotes.largeur;
    const hauteur = req.body.quotes.hauteur;
    const valeur = req.body.valeur;
    const destCP = req.body.user.adress.postalCode;
    const date = moment().add(1, 'days').format('YYYY-MM-DD');
    
    superagent.get('https://test.envoimoinscher.com/api/v1/cotation')
    .query({ 
        'colis_1.poids': poids,
        'colis_1.longueur': longueur,
        'colis_1.largeur': largeur,
        'colis_1.hauteur': hauteur,
        'code_contenu': 100,
        'colis.valeur': valeur,
        'expediteur.pays': 'FR',
        'expediteur.code_postal': 44980,
        'expediteur.type': 'entreprise',
        'destinataire.pays': 'FR',
        'destinataire.code_postal': destCP,
        'destinataire.type': 'particulier',
        'collecte': date,
        'délai': 'aucun'
    })
    .set('access_key', process.env.ACCESS_KEY)
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
    .then((response) => {
        const shipmentsXML = response.body
        const shipmentsJSON = convert.xml2json(shipmentsXML, {compact: true})
        res.send(shipmentsJSON)
    })
}

// API BOXTAL POST ORDER SHIPMENT
// IF HOME DELIVERY
exports.sendShipmentHome = (req, res) => {
    const poids = req.body.poids;
    const longueur = req.body.longueur;
    const largeur = req.body.largeur;
    const hauteur = req.body.hauteur;
    const valeur = req.body.valeur;
    const destCP = req.body.destCP;
    const destCity = req.body.destCity;
    const destAdress = req.body.destAdress;
    const destFN = req.body.destFN;
    const destLN = req.body.destLN;
    const destEmail = req.body.destEmail;
    const destTel = req.body.destTel;
    const operator = req.body.operator;
    const service = req.body.service;
    const date = moment().add(1, 'days').format('YYYY-MM-DD');
    
    superagent.post('https://test.envoimoinscher.com/api/v1/order')
    .query({ 
        'colis_1.poids': poids,
        'colis_1.longueur': longueur,
        'colis_1.largeur': largeur,
        'colis_1.hauteur': hauteur,
        'code_contenu': 100,
        'colis.valeur': valeur,
        'expediteur.pays': 'FR',
        'expediteur.code_postal': 44980,
        'expediteur.type': 'entreprise',
        'expediteur.societe' : 'DT_SYSTEMES',
        'expediteur.ville': 'SAINTE LUCE SUR LOIRE',
        'expediteur.adresse': "12 RUE LOUIS LUMIERE, PARC D'ACTIVITES DE LA MADELEINE",
        'expediteur.prenom': 'DT',
        'expediteur.nom': 'SYSTEMES',
        'expediteur.email': 'dtsystemes@gmail.com',
        'expediteur.tel': '0228232324',
        'destinataire.pays': 'FR',
        'destinataire.code_postal': destCP,
        'destinataire.type': 'particulier',
        'destinataire.ville': destCity,
        'destinataire.adresse': destAdress,
        'destinataire.prenom': destFN,
        'destinataire.nom': destLN,
        'destinataire.email': destEmail,
        'destinataire.tel': destTel,
        'collecte': date,
        'délai': 'aucun',
        'operateur': operator,
        'service': service,
        'colis.description': 'pièces métalliques usinées'
    })
    .set('access_key', process.env.ACCESS_KEY)
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
    .then((response) => {
        const shipmentsXML = response.body
        const shipmentsJSON = convert.xml2json(shipmentsXML, {compact: true})
        res.send(shipmentsJSON)
    })
}

// IF PICKUP POINT DELIVERY
exports.sendShipmentPickUpPoint = (req, res) => {
    const poids = req.body.poids;
    const longueur = req.body.longueur;
    const largeur = req.body.largeur;
    const hauteur = req.body.hauteur;
    const valeur = req.body.valeur;
    const destCP = req.body.destCP;
    const destCity = req.body.destCity;
    const destAdress = req.body.destAdress;
    const destFN = req.body.destFN;
    const destLN = req.body.destLN;
    const destEmail = req.body.destEmail;
    const destTel = req.body.destTel;
    const operator = req.body.operator;
    const service = req.body.service;
    const relayCode = req.body.relayCode;
    const date = moment().add(1, 'days').format('YYYY-MM-DD');
    
    superagent.post('https://test.envoimoinscher.com/api/v1/order')
    .query({ 
        'colis_1.poids': poids,
        'colis_1.longueur': longueur,
        'colis_1.largeur': largeur,
        'colis_1.hauteur': hauteur,
        'code_contenu': 100,
        'colis.valeur': valeur,
        'expediteur.pays': 'FR',
        'expediteur.code_postal': 44980,
        'expediteur.type': 'entreprise',
        'expediteur.societe' : 'DT_SYSTEMES',
        'expediteur.ville': 'SAINTE LUCE SUR LOIRE',
        'expediteur.adresse': "12 RUE LOUIS LUMIERE, PARC D'ACTIVITES DE LA MADELEINE",
        'expediteur.prenom': 'DT',
        'expediteur.nom': 'SYSTEMES',
        'expediteur.email': 'dtsystemes@gmail.com',
        'expediteur.tel': '0228232324',
        'destinataire.pays': 'FR',
        'destinataire.code_postal': destCP,
        'destinataire.type': 'particulier',
        'destinataire.ville': destCity,
        'destinataire.adresse': destAdress,
        'destinataire.prenom': destFN,
        'destinataire.nom': destLN,
        'destinataire.email': destEmail,
        'destinataire.tel': destTel,
        'collecte': date,
        'délai': 'aucun',
        'operateur': operator,
        'service': service,
        'retrait.pointrelais': relayCode,
        'colis.description': 'pièces métalliques usinées'
    })
    .set('access_key', process.env.ACCESS_KEY)
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
    .then((response) => {
        const shipmentsXML = response.body
        const shipmentsJSON = convert.xml2json(shipmentsXML, {compact: true})
        res.send(shipmentsJSON)
    })
}

// GET LIST OF RELAYS
exports.getRelays = (req, res) => {
    const operator = req.body.cart;
    const city = req.body.user.city;
    const CP = req.body.user.postalCode;
    const adress = req.body.user.adress;

    superagent.get(`https://test.envoimoinscher.com/api/v1/${operator}/listpoints`)
    .query({ 
        'pays': 'FR',
        'ville': city,
        'cp': CP,
        'adresse': adress
    })
    .set('access_key', process.env.ACCESS_KEY)
    .set('Authorization', 'Basic ' + process.env.BASIC_AUTH)
    .then((response) => {
        const relaysXML = response.body
        const relaysJSON = convert.xml2json(relaysXML, {compact: true})
        res.send(relaysJSON)
    })
}