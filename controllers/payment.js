const models = require('../models/index');

require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createPayment = async (req, res) => {

    const order = await models.Orders.findOne({
        where: { id: req.body.id}
    })

    if (order.priceTTC === 0) {
        return res.status(500).json({ message: "Une erreur est survenue" })
    }

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                currency: 'eur',
                product_data: {
                    name: order.number
                },
                unit_amount: order.priceTTC
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/index.html`,
    });
    res.json({ url: session.url });
}

exports.getPaymentSession = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id, {expand: ['line_items']});
    res.status(201).json(session.line_items.data[0].description)
}