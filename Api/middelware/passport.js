const jwt = require('jsonwebtoken');
const pwdjwt= '3ezi3endo2dh' //simple auth 

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // to take off bearer
        const decoded = jwt.verify(token,pwdjwt);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};