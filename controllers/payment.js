require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createPayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                currency: 'eur',
                product_data: {
                    name: req.body.number
                },
                unit_amount: req.body.price
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