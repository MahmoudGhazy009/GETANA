const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('access denied, no token provided')
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        //console.log("not match", token, "============", config.get('jwtPrivateKey'))
        next();
    } catch (ex) {
        res.status(400).send('invalid token.');
    }
    //    console.log("logging");
}
module.exports = auth;