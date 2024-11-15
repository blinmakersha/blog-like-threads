const jwt = require('jsonwebtoken')
const {secret} = require("../config/config")

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.cookies.access_token
        if (!token) {
            res.redirect('/auth')
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        res.redirect('/auth')
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};