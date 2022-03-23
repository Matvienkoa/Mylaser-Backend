const nodemailer = require("nodemailer");
const emailValidator = require('email-validator');

exports.sendMail = async (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.text === "" || req.body.html === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    const email = req.body.email;
    const subject = req.body.subject;
    const text = req.body.text;
    const html = req.body.html;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'edwardo.feil@ethereal.email',
            pass: 'gDBbJ6W5C2kFYdG9q7'
        }
    });

    const msg = {
        from: '"Mylaser 👻" <mylaser@example.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    }

    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('email sent')
}