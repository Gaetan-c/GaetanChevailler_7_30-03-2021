const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth = req.headers.authorization

    if (auth) {
        const token = auth.split(' ')[1]

        jwt.verify(token, 'TOKEN_SECRET', (err, user) => {
            if (err) {
                return res.status(403)
            }
            next()
        })
    }else {
        res.status(401).json({error:"accès non authorisé"})
    }
}