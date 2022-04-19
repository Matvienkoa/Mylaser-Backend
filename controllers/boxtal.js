const superagent = require('superagent');
const convert = require('xml-js');

// API BOXTAL
exports.getShipments = (req, res) => {
    const poids = req.body.quotes.poids;
    const longueur = req.body.quotes.longueur;
    const largeur = req.body.quotes.largeur;
    const hauteur = req.body.quotes.hauteur;
    // const contenu = req.body.contenu;
    // const valeur = req.body.valeur;
    const destCP = req.body.user.adress.postalCode;
    // const destType = req.body.destType;
    console.log(req.body);
    
    superagent.get('https://test.envoimoinscher.com/api/v1/cotation')
    .query({ 
        'colis_1.poids': poids,
        'colis_1.longueur': longueur,
        'colis_1.largeur': largeur,
        'colis_1.hauteur': hauteur,
        'code_contenu': 10100,
        'colis.valeur': 124,
        'expediteur.pays': 'FR',
        'expediteur.code_postal': 44000,
        'expediteur.type': 'particulier',
        'destinataire.pays': 'FR',
        'destinataire.code_postal': destCP,
        'destinataire.type': 'particulier',
        // 'collecte': '2022-04-23',
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

exports.sendShipment = (req, res) => {
    const poids = req.body.poids;
    const longueur = req.body.longueur;
    const largeur = req.body.largeur;
    const hauteur = req.body.hauteur;
    // const contenu = req.body.contenu;
    // const valeur = req.body.valeur;
    const destCP = req.body.destCP;
    // const destType = req.body.destType;
    const destCity = req.body.destCity;
    const destAdress = req.body.destAdress;
    const destFN = req.body.destFN;
    const destLN = req.body.destLN;
    const destEmail = req.body.destEmail;
    const destTel = req.body.destTel;
    const operator = req.body.operator;
    // const service = req.body.service;
    console.log(req.body);
    
    superagent.post('https://test.envoimoinscher.com/api/v1/order')
    .query({ 
        'colis_1.poids': poids,
        'colis_1.longueur': longueur,
        'colis_1.largeur': largeur,
        'colis_1.hauteur': hauteur,
        'code_contenu': 10100,
        'colis.valeur': 124,
        'expediteur.pays': 'FR',
        'expediteur.code_postal': 61400,
        'expediteur.type': 'particulier',
        'expediteur.ville': 'REVEILLON',
        'expediteur.adresse': 'LE PETIT BLERAIS',
        'expediteur.prenom': 'JEAN',
        'expediteur.nom': 'DELANOE',
        'expediteur.email': 'matvienko.anthonytest@gmail.com',
        'expediteur.tel': '0685978880',
        'destinataire.pays': 'FR',
        'destinataire.code_postal': destCP,
        'destinataire.type': 'particulier',
        'destinataire.ville': destCity,
        'destinataire.adresse': destAdress,
        'destinataire.prenom': destFN,
        'destinataire.nom': destLN,
        'destinataire.email': destEmail,
        'destinataire.tel': destTel,
        'collecte': '2022-04-27',
        'délai': 'aucun',
        'operateur': operator,
        'service': 'CoprRelaisDomicileNat',
        'platform': 'api',
        'platform-version': '',
        'module_version': '',
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