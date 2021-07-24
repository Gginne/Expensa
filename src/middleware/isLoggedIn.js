require("dotenv").config()
const User = require("../models/User")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.redirect(301, "/")

    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded
        next()

    } catch(e){
        res.redirect(301, "/")
    }

    
}