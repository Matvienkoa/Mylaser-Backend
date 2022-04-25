const nodemailer = require("nodemailer");
const emailValidator = require('email-validator');
var Mailgen = require('mailgen');

exports.sendMail = async (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.text === "" || req.body.html === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Mailgen
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'MyLaser',
            link: 'https://mylaser.fr/',
            logo: 'https://i.ibb.co/MkhLZRn/logo-black-resize.png'
        }
    });

    const name = req.body.name;
    const intro = req.body.intro;
    const instructions = req.body.instructions;
    const text = req.body.text;
    const link = req.body.link;
    const outro = req.body.outro;

    const mailgen = {
        body: {
            greeting: 'Bonjour',
            signature: false,
            name: name,
            intro: intro,
            action: {
                instructions: instructions,
                button: {
                    color: '#22BC66',
                    text: text,
                    link: link
                }
            },
            outro: outro
        }
    };

    const emailBody = mailGenerator.generate(mailgen);

    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.fr',
        port: 465,
        secure: true,
        auth: {
            user: 'anthony.matvienko@westcode-dev.fr',
            pass: 'Rdwxtdb53!'
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const email = req.body.email;
    const subject = req.body.subject;

    const msg = {
        from: '"MyLaser" anthony.matvienko@westcode-dev.fr', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: text, 
        html: emailBody, // html body
    }

    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('email sent')
}