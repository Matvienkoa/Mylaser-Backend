const superagent = require('superagent');
const convert = require('xml-js');

// API BOXTAL
exports.getShipments = (req, res) => {
    // const poids = req.body.poids;
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
        'colis_1.poids': 3,
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