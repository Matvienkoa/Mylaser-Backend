const rateLimit = require("express-rate-limit");

//Limiting the number of connection attempts
const authLimiter = rateLimit({
    windowMs : 60 * 60 * 1000, 
    max: 1000, 
    message: "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement."
});

module.exports = { authLimiter };